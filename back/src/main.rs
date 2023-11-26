use articles::Article;
use juniper::{graphql_object, EmptyMutation, EmptySubscription, RootNode};
use rocket::{response::content, State};
type Schema = RootNode<'static, Query, EmptyMutation<Context>, EmptySubscription<Context>>;

mod articles;
mod config;
mod tags;

#[derive(Clone, Copy, Debug)]
struct Query;
#[graphql_object(context = crate::Context)]
impl Query {
  fn articles(context: &Context) -> &Vec<Article> {
    &context.articles
  }
  fn tags(context: &Context) -> &Vec<tags::Tag> {
    &context.tags
  }
}

#[derive(Clone, Debug)]
pub struct Context {
  articles: Vec<Article>,
  tags:     Vec<tags::Tag>,
}
impl juniper::Context for Context {}
impl Context {
  fn new() -> anyhow::Result<Self> {
    let config = config::Config::get();
    let articles = articles::read_articles(&config.contents_path)?;
    let tags = tags::read_tags(&config.contents_path);
    Ok(Context { articles, tags })
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

#[rocket::main]
async fn main() {
  rocket::build()
    .manage(Context::new().unwrap())
    .manage(Schema::new(
      Query,
      EmptyMutation::<Context>::new(),
      EmptySubscription::<Context>::new(),
    ))
    .mount(
      "/",
      rocket::routes![graphiql, get_graphql_handler, post_graphql_handler],
    )
    .launch()
    .await
    .unwrap();
}
