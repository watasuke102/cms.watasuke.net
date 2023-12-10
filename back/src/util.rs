use chrono::{DateTime, FixedOffset, Utc};
pub fn now() -> DateTime<FixedOffset> {
  Utc::now().with_timezone(&FixedOffset::east_opt(9 * 3600).unwrap())
}
