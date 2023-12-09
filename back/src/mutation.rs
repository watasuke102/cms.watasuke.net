use juniper::{graphql_object, graphql_value};

use crate::{cms, Context};

#[derive(Clone, Debug, Default)]
pub struct Mutation;
#[graphql_object(context = crate::Context)]
impl Mutation {
  fn update_article(
    slug: String,
    title: String,
    tags: Vec<String>,
    is_favorite: bool,
    body: String,
    context: &Context,
  ) -> juniper::FieldResult<String> {
    let articles = {
      let tags = cms::tags::read_tags(&context.config.contents_path);
      cms::articles::read_articles(&context.config.contents_path, &tags)
    };
    let Ok(articles) = articles else {
      return Err(juniper::FieldError::new(
        "read_articles() failed",
        graphql_value!({"internal_error": "Internal Server Error"}),
      ));
    };
    let Some(article) = articles.get(&slug) else {
      return Err(juniper::FieldError::new(
        "Article with such a slug not found",
        graphql_value!({"internal_error": "Not Found"}),
      ));
    };

    match article.update(title, tags, is_favorite, body) {
      Ok(_) => Ok(slug),
      Err(_) => Err(juniper::FieldError::new(
        "article.update() failed",
        graphql_value!({"internal_error": "Internal Server Error"}),
      )),
    }
  }
}
