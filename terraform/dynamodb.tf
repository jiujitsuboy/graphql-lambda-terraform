resource "aws_dynamodb_table" "users" {
  hash_key = "id"
  name = "users"
  billing_mode   = "PROVISIONED"
  read_capacity  = 3
  write_capacity = 3
  attribute {
    name = "id"
    type = "S"
  }
}

