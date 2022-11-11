import {
	GetCommand,
	GetCommandInput,
	PutCommand,
	PutCommandInput,
} from '@aws-sdk/lib-dynamodb';
import { formatJSONResponse } from '@libs/api-gateway';

import ddbclient from 'src/model';

export const ddb = {
	write: async (data: Record<string, any>, tableName: string) => {
		const params: PutCommandInput = {
			TableName: tableName,
			Item: data,
		};

		const command = new PutCommand(params);
		await ddbclient.send(command);

		return formatJSONResponse({
			data: {
				message: 'Successfully',
				data,
			},
		});
	},

	get: async (id: string, tableName: string) => {
		const params: GetCommandInput = {
			TableName: tableName,
			Key: { id },
		};

		const command = new GetCommand(params);

		const resp = await ddbclient.send(command);

		return resp.Item;
	},
};
