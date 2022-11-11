import { formatJSONResponse } from '@libs/api-gateway';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { ddb } from 'src/service';

export const handler = async (event: APIGatewayProxyEvent) => {
	try {
		const TABLE_NAME = process.env.TABLE_NAME;
		const { code } = event.pathParameters || {};

		if (!code) {
			return formatJSONResponse({
				statusCode: 400,
				data: {
					message: 'Missing code in path',
				},
			});
		}

		const record = await ddb.get(code, TABLE_NAME);

		const originUrl = record.originUrl;
		return formatJSONResponse({
			statusCode: 301,
			headers: {
				Location: originUrl,
			},
		});
	} catch (error) {
		return formatJSONResponse({
			statusCode: 500,
			data: {
				message: error.message,
			},
		});
	}
};
