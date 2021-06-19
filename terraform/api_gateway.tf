resource "aws_api_gateway_rest_api" "graphql-api" {
  name = var.api_gateway_name
  description = "Expose CRUD operations for Users"
}