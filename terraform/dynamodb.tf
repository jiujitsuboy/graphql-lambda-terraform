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
  attribute {
    name = "name"
    type = "S"
  }

  global_secondary_index {
    name = "name_index"
    hash_key = "name"
    read_capacity  = 3
    write_capacity = 3
    projection_type = "ALL"
  }
}

