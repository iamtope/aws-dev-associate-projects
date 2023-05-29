import {DynamoDBClient} from "@aws-sdk/client-dynamodb";

const REGION = "us-east-1";
const ddbClient = new DynamoDBClient({ region: REGION });

export default ddbClient;

