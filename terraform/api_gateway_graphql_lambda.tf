resource "aws_api_gateway_resource" "graphql-users-resource" {
  parent_id = aws_api_gateway_rest_api.graphql-api.root_resource_id
  path_part = aws_lambda_function.graphql-function.function_name
  rest_api_id = aws_api_gateway_rest_api.graphql-api.id
}

resource "aws_api_gateway_method" "graphql-users-resource" {
  authorization = "NONE"
  http_method = "POST"
  resource_id = aws_api_gateway_resource.graphql-users-resource.id
  rest_api_id = aws_api_gateway_rest_api.graphql-api.id
}

resource "aws_api_gateway_integration" "graphql-users-resource" {
  http_method = aws_api_gateway_method.graphql-users-resource.http_method
  resource_id = aws_api_gateway_resource.graphql-users-resource.id
  rest_api_id = aws_api_gateway_rest_api.graphql-api.id
  integration_http_method = "POST"
  type = "AWS_PROXY"
  uri = aws_lambda_function.graphql-function.invoke_arn
}

resource "aws_api_gateway_method" "graphql-users-resource-root" {
  authorization = "NONE"
  http_method = "ANY"
  resource_id = aws_api_gateway_resource.graphql-users-resource.id
  rest_api_id = aws_api_gateway_rest_api.graphql-api.id
}

resource "aws_api_gateway_integration" "graphql-users-resource-root" {
  http_method = aws_api_gateway_method.graphql-users-resource-root.http_method
  resource_id = aws_api_gateway_resource.graphql-users-resource.id
  rest_api_id = aws_api_gateway_rest_api.graphql-api.id
  integration_http_method = "POST"
  type = "AWS_PROXY"
  uri = aws_lambda_function.graphql-function.invoke_arn
}

resource "aws_lambda_permission" "graphql-users-resource" {
  statement_id = "AllowAPIGatewayInvoke"
  action = "lambda:InvokeFunction"
  function_name = aws_lambda_function.graphql-function.function_name
  principal = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_rest_api.graphql-api.execution_arn}/*/*/*"
}


resource "aws_api_gateway_deployment" "graphql-users-resource" {
  rest_api_id = aws_api_gateway_rest_api.graphql-api.id
  stage_name = "production"
  depends_on = [aws_api_gateway_integration.graphql-users-resource,
    aws_api_gateway_integration.graphql-users-resource-root]
}

output "base_url" {
  value = aws_api_gateway_deployment.graphql-users-resource.invoke_url
}