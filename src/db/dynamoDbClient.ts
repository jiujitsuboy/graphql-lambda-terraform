import AWS from "aws-sdk";
import { DataMapper } from "@aws/dynamodb-data-mapper";

let config: any = {};
const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY

if (process.env.NODE_ENV === "development") {
  config.region = "us-east-1";
  config.endpoint = "http://localhost:8000";
  config.accessKeyId = "key";
  config.secretAccessKey = "key";
} else {
  config.region = "us-east-1";
  config.accessKeyId = ACCESS_KEY_ID
  config.secretAccessKey = SECRET_ACCESS_KEY
}

const client : AWS.DynamoDB = new AWS.DynamoDB(config)
const mapper: DataMapper = new DataMapper({client})

export default mapper