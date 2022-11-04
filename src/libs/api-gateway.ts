interface FormatJSONResponseProps {
	statusCode?: number;
	data?: any;
	headers?: Record<string, string>;
}

export const formatJSONResponse = ({
	statusCode = 200,
	data,
	headers,
}: FormatJSONResponseProps) => {
	return {
		statusCode,
		body: JSON.stringify(data),
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': true,
			...headers,
		},
	};
};
