import type { AWS } from '@serverless/typescript';

import dynamoDBResources from '@resources/dynamodb';
import functions from '@resources/functions';

const serverlessConfiguration: AWS = {
	service: 'sls-urlshortner',
	frameworkVersion: '3',
	plugins: [
		'serverless-esbuild',
		'serverless-offline',
		'serverless-dynamodb-local',
	],
	provider: {
		name: 'aws',
		runtime: 'nodejs14.x',
		profile: 'default',
		region: 'ap-southeast-1',
		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: true,
		},
		iam: {
			role: {
				statements: [
					{
						Effect: 'Allow',
						Action: [
							'dynamodb:DescribeTable',
							'dynamodb:Query',
							'dynamodb:Scan',
							'dynamodb:GetItem',
							'dynamodb:PutItem',
							'dynamodb:UpdateItem',
							'dynamodb:DeleteItem',
						],
						Resource:
							'arn:aws:dynamodb:${self:provider.region}:${aws:accountId}:table/${self:custom.urlTableName}',
					},
				],
			},
		},
		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
			NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',

			TABLE_NAME: '${self:custom.urlTableName}',
			BASE_URL: {
				'Fn::Join': [
					'',
					[
						'https://',
						{ Ref: 'HttpApi' },
						'.execute-api.${self.provider.region}.amazonaws.com',
					],
				],
			},
		},
	},
	// import the function via paths
	functions,
	resources: {
		Resources: {
			...dynamoDBResources,
		},
	},
	package: { individually: true },
	custom: {
		// local development
		dynamodb: {
			stages: 'dev',
			start: {
				port: '3306',
				inMemory: true,
				migrate: true,
			},
			migration: {
				dir: 'resources/offline/migration',
			},
		},

		urlTableName: '${sls:stage}-url-Table',
		esbuild: {
			bundle: true,
			minify: false,
			sourcemap: true,
			exclude: ['aws-sdk'],
			target: 'node14',
			define: { 'require.resolve': undefined },
			platform: 'node',
			concurrency: 10,
		},
	},
};

module.exports = serverlessConfiguration;
