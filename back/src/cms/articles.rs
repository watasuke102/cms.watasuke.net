use anyhow::anyhow;
use juniper::graphql_object;
use regex::Regex;
use serde::Deserialize;
use std::collections::HashMap;
use std::path::Path;
use yaml_front_matter::{Document, YamlFrontMatter};

use super::tags;

#[derive(Clone, Debug, Deserialize)]
struct Frontmatter {
  title:        String,
  tags:         Vec<String>,
  is_favorite:  bool,
  published_at: String,
  updated_at:   String,
}

#[derive(Clone, Debug)]
pub struct Article {
  article_path: String,
  slug:         String,
  body:         String,
  year:         i32,
  tags:         Vec<tags::Tag>,
  frontmatter:  Frontmatter,
}
impl Article {
  pub fn article_path(&self) -> &str {
    &self.article_path
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
  fn year(&self) -> i32 {
    self.year
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
}
pub type Articles = HashMap<String, Article>;

pub fn read_articles(contents_path: &String, tags: &tags::Tags) -> anyhow::Result<Articles> {
  let re = Regex::new(r"^[0-9]{2}_([0-9a-z\-]+)")?;
  let mut articles: Articles = HashMap::new();

  let article_years = std::fs::read_dir(Path::new(&contents_path).join("articles"))?;
  for year in article_years {
    let year = year?;
    if !year.metadata()?.is_dir() {
      return Err(anyhow!(
        "items under article folder must be a directory (named a year)"
      ));
    }
    let year_num = String::from(year.file_name().to_str().unwrap()).parse()?;

    let article_dirs = std::fs::read_dir(year.path())?;
    for article_dir in article_dirs {
      let article = article_dir?;
      if !article.metadata()?.is_dir() {
        return Err(anyhow!(
          "items under article/<year> folder must be a directory"
        ));
      }

      let slug = {
        let dirname = article.file_name();
        let Some(slug) = re.captures(dirname.to_str().unwrap_or("")) else {
          // The article has not published yet (or invalid name)
          continue;
        };
        String::from(slug.get(1).unwrap().as_str())
      };
      if articles.get(&slug).is_some() {
        return Err(anyhow!("duplicated slug"));
      }

      let Ok(article_md) = std::fs::read_to_string(article.path().join("article.md")) else {
        println!("{:?} doesn't have `article.md`; ignored", article.path());
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
          article_path: String::from(article.path().to_str().unwrap()),
          slug,
          year: year_num,
          body: md.content,
          tags: tags::convert_slug_vec(tags, &md.metadata.tags),
          frontmatter: md.metadata,
        },
      );
    }
  }
  Ok(articles)
}
