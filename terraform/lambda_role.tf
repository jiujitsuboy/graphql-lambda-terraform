resource "aws_iam_role" "graphql-function" {
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

data "aws_iam_policy_document" "graphql-function" {

  statement {
    actions = [
      "*"
    ]
    effect = "Allow"
    resources = [
      aws_dynamodb_table.users.arn,
      "arn:aws:logs:*"
    ]
    sid = "lambdadynamodb"
  }
}

resource "aws_iam_role_policy" "graphql-function" {
  name = "graphql-role-policy"
  policy = data.aws_iam_policy_document.graphql-function.json
  role = aws_iam_role.graphql-function.id
}