use juniper::graphql_object;
use serde::Deserialize;
use std::collections::HashMap;
use std::path::Path;

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
pub type Tags = HashMap<String, Tag>;

pub fn convert_slug_vec(tags: &Tags, slugs: &Vec<String>) -> Vec<Tag> {
  slugs
    .iter()
    .filter(|slug| !slug.is_empty())
    .map(|slug| tags.get(slug).unwrap().clone())
    .collect()
}

pub fn read_tags(contents_path: &String) -> Tags {
  #[derive(Clone, Deserialize, Debug)]
  struct TagsToml {
    tags: Vec<Tag>,
  }
  let tags_vec: TagsToml =
    toml::from_str(&std::fs::read_to_string(Path::new(&contents_path).join("tags.toml")).unwrap())
      .unwrap();
  tags_vec
    .tags
    .into_iter()
    .map(|e| (e.slug.clone(), e))
    .collect()
}
