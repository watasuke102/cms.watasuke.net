use std::{io::Write, path::Path};

use articles::Article;
use juniper::{graphql_object, graphql_value, EmptyMutation, EmptySubscription, RootNode};
use rocket::{response::content, State};
type Schema = RootNode<'static, Query, EmptyMutation<Context>, EmptySubscription<Context>>;

mod articles;
mod config;
mod sitedata;
mod tags;

#[derive(Clone, Copy, Debug)]
struct Query;
#[graphql_object(context = crate::Context)]
impl Query {
  fn all_articles(context: &Context) -> juniper::FieldResult<Vec<Article>> {
    let tags = tags::read_tags(&context.config.contents_path);
    match articles::read_articles(&context.config.contents_path, &tags) {
      Ok(articles) => Ok(articles.into_iter().map(|e| e.1).collect()),
      Err(_) => Err(juniper::FieldError::new(
        "read_articles() failed",
        graphql_value!({"internal_error": "Internal Server Error"}),
      )),
    }
  }
  fn article(slug: String, context: &Context) -> juniper::FieldResult<Option<Article>> {
    let tags = tags::read_tags(&context.config.contents_path);
    let Ok(articles) = articles::read_articles(&context.config.contents_path, &tags) else {
      return Err(juniper::FieldError::new(
        "read_articles() failed",
        graphql_value!({"internal_error": "Internal Server Error"}),
      ));
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
      Err(_) => Err(juniper::FieldError::new(
        "read_sitedata() failed",
        graphql_value!({"internal_error": "Internal Server Error"}),
      )),
    }
  }
}

#[derive(Clone, Debug)]
pub struct Context {
  config: config::Config,
}
impl juniper::Context for Context {}
impl Context {
  fn new() -> anyhow::Result<Self> {
    Ok(Context {
      config: config::Config::get(),
    })
  }
}

#[rocket::get("/")]
fn graphiql() -> content::RawHtml<String> {
  juniper_rocket::graphiql_source("/graphql", None)
}

#[rocket::get("/graphql?<request>")]
fn get_graphql_handler(
  context: &State<Context>,
  request: juniper_rocket::GraphQLRequest,
  schema: &State<Schema>,
) -> juniper_rocket::GraphQLResponse {
  request.execute_sync(schema, context)
}

#[rocket::post("/graphql", data = "<request>")]
fn post_graphql_handler(
  context: &State<Context>,
  request: juniper_rocket::GraphQLRequest,
  schema: &State<Schema>,
) -> juniper_rocket::GraphQLResponse {
  request.execute_sync(schema, context)
}

#[rocket::get("/img/<slug>/<img_name>")]
async fn handle_img(
  slug: &str,
  img_name: &str,
  context: &State<Context>,
) -> Option<rocket::fs::NamedFile> {
  let tags = tags::read_tags(&context.config.contents_path);
  let Ok(articles) = articles::read_articles(&context.config.contents_path, &tags) else {
    return None;
  };
  let Some(article) = articles.get(slug) else {
    return None;
  };
  let path = Path::new(article.article_path()).join(img_name);
  rocket::fs::NamedFile::open(path).await.ok()
}

#[rocket::main]
async fn main() -> anyhow::Result<()> {
  let schema = Schema::new(
    Query,
    EmptyMutation::<Context>::new(),
    EmptySubscription::<Context>::new(),
  );

  for path in ["../watasuke.net/graphql", "../graphql"] {
    let graphql_dir = std::env::current_dir()?.join(path);
    std::fs::create_dir_all(&graphql_dir)?;
    let mut schema_file = std::fs::File::create(graphql_dir.join("schema.graphql"))?;
    schema_file.write_all(schema.as_schema_language().as_bytes())?;
  }

  rocket::build()
    .manage(Context::new()?)
    .manage(schema)
    .attach(rocket_cors::CorsOptions::default().to_cors().unwrap())
    .mount(
      "/",
      rocket::routes![
        graphiql,
        get_graphql_handler,
        post_graphql_handler,
        handle_img
      ],
    )
    .launch()
    .await?;
  Ok(())
}
