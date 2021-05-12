import AWS from "aws-sdk";
import { DataMapper } from "@aws/dynamodb-data-mapper";

let config: any = {};
if (process.env.NODE_ENV === "development") {
  config.region = "us-central-1";
  config.endpoint = "http://localhost:8000";
  config.accessKeyId = "key";
  config.secretAccessKey = "key";
} else {
  config.region = "us-east-1";
  config.accessKeyId = "AKIAV6SYZCC5T7U2HSXN";
  config.secretAccessKey = "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";
}

const client : AWS.DynamoDB = new AWS.DynamoDB(config)
const mapper: DataMapper = new DataMapper({client})

export default mapper