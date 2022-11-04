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
};

export default functions;
