aws s3api create-bucket --bucket=project-bucket.lambda --region=us-east-1
aws s3 cp Archive.zip s3://project-bucket.lambda/Archive.zip