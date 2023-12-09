use juniper::{graphql_object, graphql_value};

use crate::{
  cms::{articles, sitedata, tags},
  Context,
};

#[derive(Clone, Copy, Debug)]
pub struct Query;
#[graphql_object(context = crate::Context)]
impl Query {
  fn all_articles(context: &Context) -> juniper::FieldResult<Vec<articles::Article>> {
    let tags = tags::read_tags(&context.config.contents_path);
    match articles::read_articles(&context.config.contents_path, &tags) {
      Ok(articles) => Ok(articles.into_iter().map(|e| e.1).collect()),
      Err(err) => Err(juniper::FieldError::new(
        "read_articles() failed",
        graphql_value!(err.to_string()),
      )),
    }
  }
  fn article(slug: String, context: &Context) -> juniper::FieldResult<Option<articles::Article>> {
    let tags = tags::read_tags(&context.config.contents_path);
    let articles = match articles::read_articles(&context.config.contents_path, &tags) {
      Ok(articles) => articles,
      Err(err) => {
        return Err(juniper::FieldError::new(
          "read_articles() failed",
          graphql_value!(err.to_string()),
        ));
      }
    };
    match articles.get(&slug) {
      Some(article) => Ok(Some(article.clone())),
      None => Ok(None),
    }
  }
  fn all_tags(context: &Context) -> Vec<tags::Tag> {
    tags::read_tags(&context.config.contents_path)
      .into_iter()
      .map(|e| e.1)
      .collect()
  }
  fn sitedata(context: &Context) -> juniper::FieldResult<sitedata::Sitedata> {
    match sitedata::read_sitedata(&context.config.contents_path) {
      Ok(sitedata) => Ok(sitedata),
      Err(err) => Err(juniper::FieldError::new(
        "read_sitedata() failed",
        graphql_value!(err.to_string()),
      )),
    }
  }
}
