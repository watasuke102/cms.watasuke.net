use anyhow::anyhow;
use regex::Regex;
use serde::Deserialize;
use yaml_front_matter::{Document, YamlFrontMatter};

#[derive(Debug, Deserialize)]
struct Config {
  articles_path: String,
}

#[derive(Debug, Deserialize)]
struct Frontmatter {
  title:        String,
  tags:         Vec<String>,
  favorite:     bool,
  published_at: String,
  updated_at:   String,
}
#[derive(Debug)]
struct Article {
  slug:        String,
  body:        String,
  year:        u16,
  frontmatter: Frontmatter,
}

fn main() -> anyhow::Result<()> {
  let config: Config = toml::from_str(&std::fs::read_to_string("config.toml")?)?;
  // <article_path>/<year>/<index>_<title>/article.md
  let articles = read_articles(config.articles_path)?;
  for article in articles {
    println!("{:#?}", article);
  }
  Ok(())
}

fn read_articles(article_path: String) -> anyhow::Result<Vec<Article>> {
  let re = Regex::new(r"^[0-9]{2}_([0-9a-z\-]+)")?;
  let mut article_mds: Vec<Article> = Vec::new();

  let article_years = std::fs::read_dir(article_path)?;
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
