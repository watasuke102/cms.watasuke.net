use juniper::{graphql_object, graphql_value};

use crate::{
  cms::{self, articles, tags},
  Context,
};

#[derive(Clone, Debug, Default)]
pub struct Mutation;
#[graphql_object(context = crate::Context)]
impl Mutation {
  fn new_tag(slug: String, title: String, context: &Context) -> juniper::FieldResult<String> {
    if !context.config.allow_private_access {
      return Err(juniper::FieldError::new(
        "Private access is forbidded",
        graphql_value!(""),
      ));
    }
    match tags::new_tag(&context.config.contents_path, &slug, &title) {
      Ok(_) => Ok(slug),
      Err(err) => Err(juniper::FieldError::new(
        "new_tag() failed",
        graphql_value!(err.to_string()),
      )),
    }
  }
  fn new_article(slug: String, title: String, context: &Context) -> juniper::FieldResult<String> {
    if !context.config.allow_private_access {
      return Err(juniper::FieldError::new(
        "Private access is forbidded",
        graphql_value!(""),
      ));
    }
    match articles::create_article(&context.config.contents_path, &slug, &title) {
      Ok(_) => Ok(slug),
      Err(err) => Err(juniper::FieldError::new(
        "create_article() failed",
        graphql_value!(err.to_string()),
      )),
    }
  }
  fn update_article(
    slug: String,
    title: String,
    tags: Vec<String>,
    is_favorite: bool,
    body: String,
    context: &Context,
  ) -> juniper::FieldResult<String> {
    if !context.config.allow_private_access {
      return Err(juniper::FieldError::new(
        "Private access is forbidded",
        graphql_value!(""),
      ));
    }
    let articles = {
      let tags = cms::tags::read_tags(&context.config.contents_path);
      match cms::articles::read_articles(&context.config.contents_path, &tags) {
        Ok(articles) => articles,
        Err(err) => {
          return Err(juniper::FieldError::new(
            "read_articles() failed",
            graphql_value!(err.to_string()),
          ));
        }
      }
    };

    let Some(article) = articles.get(&slug) else {
      return Err(juniper::FieldError::new(
        "Article with such a slug not found",
        graphql_value!("Not Found"),
      ));
    };

    match article.update(title, tags, is_favorite, body) {
      Ok(_) => Ok(slug),
      Err(err) => Err(juniper::FieldError::new(
        "article.update() failed",
        graphql_value!(err.to_string()),
      )),
    }
  }
  fn publish_article(slug: String, context: &Context) -> juniper::FieldResult<String> {
    if !context.config.allow_private_access {
      return Err(juniper::FieldError::new(
        "Private access is forbidded",
        graphql_value!(""),
      ));
    }
    match articles::publish_article(&context.config.contents_path, &slug) {
      Ok(_) => Ok(slug),
      Err(err) => Err(juniper::FieldError::new(
        "publish_article() failed",
        graphql_value!(err.to_string()),
      )),
    }
  }
}
