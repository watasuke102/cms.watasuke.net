use anyhow::anyhow;
use juniper::graphql_object;
use regex::Regex;
use serde::Deserialize;
use std::path::Path;
use yaml_front_matter::{Document, YamlFrontMatter};

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
  slug:        String,
  body:        String,
  year:        i32,
  frontmatter: Frontmatter,
}
#[graphql_object(context = crate::Context)]
impl Article {
  fn slug(&self) -> &str {
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
  fn tags(&self) -> &[String] {
    &self.frontmatter.tags
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

pub fn read_articles(contents_path: &String) -> anyhow::Result<Vec<Article>> {
  let re = Regex::new(r"^[0-9]{2}_([0-9a-z\-]+)")?;
  let mut article_mds: Vec<Article> = Vec::new();

  let article_years = std::fs::read_dir(Path::new(&contents_path).join("article"))?;
  for year in article_years {
    let year = year?;
    if !year.metadata()?.is_dir() {
      return Err(anyhow!(
        "items under article folder must be a directory (named a year)"
      ));
    }
    let year_num = String::from(year.file_name().to_str().unwrap()).parse()?;

    let articles = std::fs::read_dir(year.path())?;
    for article in articles {
      let article = article?;
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
      article_mds.push(Article {
        slug,
        year: year_num,
        body: md.content,
        frontmatter: md.metadata,
      });
    }
  }
  Ok(article_mds)
}
