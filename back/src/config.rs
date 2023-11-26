use serde::Deserialize;

#[derive(Clone, Deserialize, Debug)]
pub struct Config {
  pub contents_path: String,
}

impl Config {
  pub fn get() -> Self {
    toml::from_str(&std::fs::read_to_string("config.toml").unwrap()).unwrap()
  }
}
