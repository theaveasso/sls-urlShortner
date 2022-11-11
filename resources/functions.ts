import type { AWS } from '@serverless/typescript';

const functions: AWS['functions'] = {
	setURL: {
		handler: 'src/functions/setURL.handler',
		events: [
			{
				httpApi: {
					path: '/',
					method: 'post',
				},
			},
		],
	},
	getURL: {
		handler: 'src/functions/getURL.handler',
		events: [
			{
				httpApi: {
					path: '/{code}',
					method: 'get',
				},
			},
		],
	},
};

export default functions;
