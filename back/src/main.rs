use std::{io::Write, path::Path};

use articles::Article;
use juniper::{graphql_object, EmptyMutation, EmptySubscription, RootNode};
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
  fn all_articles(context: &Context) -> Vec<&Article> {
    context.articles.iter().map(|e| e.1).collect()
  }
  fn article(slug: String, context: &Context) -> Option<&Article> {
    context.articles.get(&slug)
  }
  fn all_tags(context: &Context) -> Vec<&tags::Tag> {
    context.tags.iter().map(|e| e.1).collect()
  }
  fn sitedata(context: &Context) -> &sitedata::Sitedata {
    &context.sitedata
  }
}

#[derive(Clone, Debug)]
pub struct Context {
  articles: articles::Articles,
  tags:     tags::Tags,
  sitedata: sitedata::Sitedata,
}
impl juniper::Context for Context {}
impl Context {
  fn new() -> anyhow::Result<Self> {
    let config = config::Config::get();
    let tags = tags::read_tags(&config.contents_path);
    Ok(Context {
      articles: articles::read_articles(&config.contents_path, &tags)?,
      tags:     tags,
      sitedata: sitedata::read_sitedata(&config.contents_path)?,
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
  let Some(article) = context.articles.get(slug) else {
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
