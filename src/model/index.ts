import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

let options = {};
if (process.env.IS_OFFLINE) {
	options = {
		region: 'localhost',
		endpoint: 'http://localhost:3306',
	};
}

const ddbclient = new DynamoDBClient({ ...options });

export default ddbclient;
