use juniper::graphql_object;
use serde::Deserialize;
use std::path::Path;

#[derive(Clone, Deserialize, Debug)]
struct Tags {
  tags: Vec<Tag>,
}
#[derive(Clone, Deserialize, Debug)]
pub struct Tag {
  slug: String,
  name: String,
}
#[graphql_object(context = crate::Context)]
impl Tag {
  fn slug(&self) -> &str {
    &self.slug
  }
  fn name(&self) -> &str {
    &self.name
  }
}

pub fn read_tags(contents_path: &String) -> Vec<Tag> {
  let tags: Tags =
    toml::from_str(&std::fs::read_to_string(Path::new(&contents_path).join("tags.toml")).unwrap())
      .unwrap();
  tags.tags
}
