/*data "archive_file" "graphql-function" {
  type = "zip"
  output_path = "lambda.zip"
  source_dir = "../../graphql-api"
}*/
resource "aws_lambda_function" "graphql-function" {
  #filename = "Archive.zip"
  s3_bucket = "project-bucket-lambda"
  s3_key = "Archive.zip"
  function_name = "graphql-users"
  handler = "index.handler"
  role = aws_iam_role.graphql-function.arn
  runtime = "nodejs14.x"
  timeout = 180
  source_code_hash = filebase64sha256("Archive.zip")

  depends_on = [aws_cloudwatch_log_group.graphql-function]

  environment {
    variables = {
      NODE_ENV = "production"
    }
  }
}

resource "aws_cloudwatch_log_group" "graphql-function" {
  name = "/aws/lambda/graphql-function"
  retention_in_days = 14
}