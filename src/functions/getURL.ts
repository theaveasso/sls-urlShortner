import { formatJSONResponse } from '@libs/api-gateway';
// import { APIGatewayProxyEvent } from 'aws-lambda';

export const handler = async () => {
	try {
		return formatJSONResponse({
			data: JSON.stringify('Successfully'),
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
