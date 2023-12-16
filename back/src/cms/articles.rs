use anyhow::{bail, ensure, Context};
use juniper::graphql_object;
use regex::Regex;
use serde::Deserialize;
use std::path::Path;
use std::{collections::HashMap, io::ErrorKind};
use yaml_front_matter::{Document, YamlFrontMatter};

use crate::util;

use super::tags;

#[derive(Clone, Debug, Deserialize)]
struct Frontmatter {
  title:        String,
  tags:         Vec<String>,
  is_favorite:  bool,
  published_at: String,
  updated_at:   String,
}
impl std::fmt::Display for Frontmatter {
  fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
    let tags = self
      .tags
      .iter()
      .map(|tag| format!("'{}'", tag))
      .collect::<Vec<String>>()
      .join(", ");
    write!(
      f,
      r"---
title:        '{}'
tags:         [{}]
is_favorite:  {}
published_at: '{}'
updated_at:   '{}'
---",
      self.title, tags, self.is_favorite, self.published_at, self.updated_at
    )
  }
}

#[derive(Clone, Debug)]
pub struct Article {
  article_path: String,
  slug:         String,
  body:         String,
  year:         i32,
  index:        Option<i32>,
  tags:         Vec<tags::Tag>,
  frontmatter:  Frontmatter,
}
impl Article {
  pub fn article_path(&self) -> &str {
    &self.article_path
  }

  pub fn update(
    &self,
    title: String,
    tags: Vec<String>,
    is_favorite: bool,
    body: String,
  ) -> anyhow::Result<()> {
    let frontmatter = Frontmatter {
      title,
      tags,
      is_favorite,
      published_at: self.frontmatter.published_at.clone(),
      updated_at: util::now().format("%Y-%m-%dT%H:%M:%S").to_string(),
    };

    std::fs::write(
      Path::new(&self.article_path).join("article.md"),
      format!("{}\n\n{}", frontmatter, body),
    )?;

    Ok(())
  }
  fn set_published_at(&self) -> anyhow::Result<()> {
    let datetime = util::now().format("%Y-%m-%dT%H:%M:%S").to_string();
    let frontmatter = Frontmatter {
      published_at: datetime.clone(),
      updated_at: datetime,
      ..self.frontmatter.clone()
    };

    std::fs::write(
      Path::new(&self.article_path).join("article.md"),
      format!("{}\n\n{}", frontmatter, self.body),
    )?;

    Ok(())
  }
  pub fn get_public_or_none(self) -> Option<Self> {
    if self.is_published() {
      Some(self)
    } else {
      None
    }
  }
}
#[graphql_object(context = crate::Context)]
impl Article {
  pub fn slug(&self) -> &str {
    &self.slug
  }
  fn body(&self) -> &str {
    &self.body
  }
  fn title(&self) -> &str {
    &self.frontmatter.title
  }
  fn tags(&self) -> &[tags::Tag] {
    &self.tags
  }
  fn is_favorite(&self) -> bool {
    self.frontmatter.is_favorite
  }
  fn published_at(&self) -> &str {
    &self.frontmatter.published_at
  }
  fn updated_at(&self) -> &str {
    &self.frontmatter.updated_at
  }
  fn is_published(&self) -> bool {
    self.index.is_some()
  }
}
pub type Articles = HashMap<String, Article>;

pub fn read_articles(contents_path: &String, tags: &tags::Tags) -> anyhow::Result<Articles> {
  let re = Regex::new(r"^(?<index>[0-9]{2})?_(?<slug>[0-9a-z\-]+)")?;
  let mut articles: Articles = HashMap::new();

  let year_dirs = std::fs::read_dir(Path::new(&contents_path).join("articles"))?;
  for year_dir in year_dirs {
    let year_dir = year_dir?;
    ensure!(
      year_dir.metadata()?.is_dir(),
      "{} is not directory; items under article folder must be a directory (named a year)",
      year_dir.path().to_str().unwrap_or("")
    );
    let year_num = {
      let year_str = String::from(year_dir.file_name().to_str().unwrap_or(""));
      year_str.parse().with_context(|| {
        format!("Failed to parse a folder name into number (name: '{year_str}')")
      })?
    };

    let article_dirs = std::fs::read_dir(year_dir.path())?;
    for article_dir in article_dirs {
      let article_dir = article_dir?;
      ensure!(
        article_dir.metadata()?.is_dir(),
        "{} is not directory; items under article/<year> folder must be a directory",
        article_dir.path().to_str().unwrap_or("")
      );

      let (index, slug) = {
        let dirname = article_dir.file_name();
        let Some(slug) = re.captures(dirname.to_str().unwrap_or("")) else {
          // The article has not published yet (or invalid name)
          continue;
        };
        let index = match slug.name("index") {
          Some(index) => index.as_str().parse::<i32>().ok(),
          None => None,
        };
        (index, String::from(slug.name("slug").unwrap().as_str()))
      };
      ensure!(
        articles.get(&slug).is_none(),
        "duplicated slug: {}",
        article_dir.path().to_str().unwrap_or("")
      );

      let Ok(article_md) = std::fs::read_to_string(article_dir.path().join("article.md")) else {
        println!(
          "{:?} doesn't have `article.md`; ignored",
          article_dir.path()
        );
        continue;
      };
      let mut md: Document<Frontmatter> =
        YamlFrontMatter::parse(article_md.as_str()).expect("Failed to parse article.md");
      loop {
        if !md.content.starts_with('\n') {
          break;
        }
        md.content.remove(0);
      }
      articles.insert(
        slug.clone(),
        Article {
          article_path: String::from(article_dir.path().to_str().unwrap()),
          slug,
          year: year_num,
          index,
          body: md.content,
          tags: tags::convert_slug_vec(tags, &md.metadata.tags),
          frontmatter: md.metadata,
        },
      );
    }
  }
  Ok(articles)
}

pub fn create_article(contents_path: &String, slug: &String, title: &String) -> anyhow::Result<()> {
  {
    let tags = tags::read_tags(contents_path);
    let articles = read_articles(contents_path, &tags)?;
    ensure!(articles.get(slug).is_none(), "already exists");
  }

  let now = util::now();
  let path = Path::new(contents_path)
    .join("articles")
    .join(now.format("%Y").to_string())
    .join(format!("_{slug}"));
  std::fs::create_dir_all(&path)?;

  let frontmatter = Frontmatter {
    title:        title.clone(),
    tags:         Vec::new(),
    is_favorite:  false,
    published_at: "".to_string(),
    updated_at:   now.format("%Y-%m-%dT%H:%M:%S").to_string(),
  };

  let path = path.join("article.md");
  match std::fs::read(&path) {
    Ok(_) => bail!("Already exists"),
    Err(err) => {
      if err.kind() != ErrorKind::NotFound {
        bail!(
          "An errror occurred while checking for existance of such a slug: {}",
          err.to_string()
        )
      }
    }
  }
  std::fs::write(path, format!("{}\n\n", frontmatter))?;

  Ok(())
}

pub fn publish_article(contents_path: &String, slug: &String) -> anyhow::Result<()> {
  let tags = tags::read_tags(&contents_path);
  let articles = read_articles(contents_path, &tags)?;
  let Some(article) = articles.get(slug) else {
    bail!("Not found");
  };
  ensure!(
    !article.is_published(),
    "Article has already been published"
  );

  article.set_published_at()?;

  let max_index = articles
    .iter()
    .filter_map(|e| {
      if e.1.year == article.year {
        e.1.index
      } else {
        None
      }
    })
    .max()
    .context("cannot find maximum index")?;

  let path = Path::new(&article.article_path);
  std::fs::rename(
    &path,
    path
      .parent()
      .context("parent does not exist")?
      .join(format!("{:02}_{}", max_index + 1, slug)),
  )?;

  Ok(())
}
