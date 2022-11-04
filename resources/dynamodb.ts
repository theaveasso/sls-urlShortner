import type { AWS } from '@serverless/typescript';

const dynamoDBResources: AWS['resources']['Resources'] = {
	urlTable: {
		Type: 'AWS::DynamoDB::Table',
		Properties: {
			TableName: '${self:custom.urlTableName}',
			BillingMode: 'PAY_PER_REQUEST',
			AttributeDefinitions: [
				{
					AttributeName: 'id',
					AttributeType: 'S',
				},
			],
			KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
		},
	},
};

export default dynamoDBResources;
