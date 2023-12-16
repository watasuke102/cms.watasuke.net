mod cms;
mod config;
mod mutation;
mod query;
mod util;

use std::{io::Write, path::Path};

use juniper::{EmptySubscription, RootNode};
use rocket::{response::content, State};
type Schema = RootNode<'static, query::Query, mutation::Mutation, EmptySubscription<Context>>;

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
async fn handle_get_img(
  slug: &str,
  img_name: &str,
  context: &State<Context>,
) -> Option<rocket::fs::NamedFile> {
  let tags = cms::tags::read_tags(&context.config.contents_path);
  let Ok(articles) = cms::articles::read_articles(&context.config.contents_path, &tags) else {
    return None;
  };
  let Some(article) = articles.get(slug) else {
    return None;
  };
  let path = Path::new(article.article_path()).join(img_name);
  rocket::fs::NamedFile::open(path).await.ok()
}

async fn save_img(
  slug: &str,
  img_name: &str,
  context: &State<Context>,
  mut file: rocket::fs::TempFile<'_>,
) -> rocket::http::Status {
  if !context.config.allow_private_access {
    return rocket::http::Status::Forbidden;
  }
  let tags = cms::tags::read_tags(&context.config.contents_path);
  let Ok(articles) = cms::articles::read_articles(&context.config.contents_path, &tags) else {
    return rocket::http::Status::InternalServerError;
  };
  let Some(article) = articles.get(slug) else {
    return rocket::http::Status::NotFound;
  };

  match file
    .persist_to(Path::new(article.article_path()).join(img_name))
    .await
  {
    Ok(_) => rocket::http::Status::Ok,
    Err(_) => rocket::http::Status::InternalServerError,
  }
}
#[rocket::post("/img/<slug>/<img_name>", format = "image/png", data = "<file>")]
async fn handle_post_png(
  slug: &str,
  img_name: &str,
  context: &State<Context>,
  file: rocket::fs::TempFile<'_>,
) -> rocket::http::Status {
  save_img(slug, img_name, context, file).await
}
#[rocket::post("/img/<slug>/<img_name>", format = "image/jpeg", data = "<file>")]
async fn handle_post_jpeg(
  slug: &str,
  img_name: &str,
  context: &State<Context>,
  file: rocket::fs::TempFile<'_>,
) -> rocket::http::Status {
  save_img(slug, img_name, context, file).await
}

#[rocket::main]
async fn main() -> anyhow::Result<()> {
  let schema = Schema::new(
    query::Query,
    mutation::Mutation::default(),
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
        handle_get_img,
        handle_post_png,
        handle_post_jpeg,
      ],
    )
    .launch()
    .await?;
  Ok(())
}
