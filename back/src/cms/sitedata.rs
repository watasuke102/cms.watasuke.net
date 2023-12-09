use juniper::graphql_object;
use serde::Deserialize;
use std::path::Path;

#[derive(Clone, Deserialize, Debug)]
pub struct Sitedata {
  profile:       String,
  short_profile: String,
}
#[graphql_object(context = crate::Context)]
impl Sitedata {
  fn profile(&self) -> &str {
    &self.profile
  }
  fn short_profile(&self) -> &str {
    &self.short_profile
  }
}

pub fn read_sitedata(contents_path: &String) -> anyhow::Result<Sitedata> {
  let path = Path::new(&contents_path).join("sitedata");
  Ok(Sitedata {
    profile:       std::fs::read_to_string(path.join("profile.md"))?,
    short_profile: std::fs::read_to_string(path.join("short-profile.md"))?,
  })
}
