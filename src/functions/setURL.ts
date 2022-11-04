import { formatJSONResponse } from '@libs/api-gateway';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { v4 as uuid } from 'uuid';

import { ddb } from 'src/service';

export const handler = async (events: APIGatewayProxyEvent) => {
	try {
		// get environment variables
		const TABLE_NAME = process.env.TABLE_NAME;
		const BASE_URL = process.env.BASE_URL;

		// get data from client
		const body = JSON.parse(events.body);

		// validate if user input correct data
		if (!body) {
			return formatJSONResponse({
				statusCode: 401,
				data: {
					message: 'Required Url',
				},
			});
		}

		const originUrl = body.url;

		const code = uuid().slice(0, 8);
		const shortUrl = `${BASE_URL}/${code}`;

		// write data to dynamodb
		const data = {
			id: code,
			shortUrl,
			originUrl,
		};

		await ddb.write(data, TABLE_NAME);

		return formatJSONResponse({ data: { shortUrl, originUrl } });
	} catch (error) {
		return formatJSONResponse({
			statusCode: 500,
			data: error.message,
		});
	}
};
