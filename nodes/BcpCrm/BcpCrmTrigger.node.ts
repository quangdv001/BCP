import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IPollFunctions,
	NodeConnectionType,
} from 'n8n-workflow';

export class BcpCrmTrigger implements INodeType {
	// @ts-ignore
	description: INodeTypeDescription = {
		displayName: 'BCP CRM Trigger',
		name: 'bcpCrmTrigger',
		subtitle: '={{($parameter["event"])}}',
		icon: 'file:bcpcrm.svg', // Optional: Add a custom icon in the nodes/ directory
		group: ['trigger'],
		version: 1,
		description: 'Starts the workflow when BCP CRM events occur',
		defaults: {name: 'BCP CRM Trigger'},
		inputs: [],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'bcpApi',
				required: true,
			},
		],
		polling: true,
		properties: [
			{
				displayName: 'Resource',
				name: 'table',
				type: 'options',
				noDataExpression: true,
				options: [
					{name: 'Company', value: 'data_account'},
					{name: 'Contact', value: 'data_contact'},
					{name: 'Deal', value: 'data_deal'},
					{name: 'Lead', value: 'data_lead'},
				],
				default: 'data_account',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'options',
				description:
					"Limit rows returned by the trigger. Max is 200.",
				options: [
					{
						name: '50',
						value: '50',
					},
					{
						name: '100',
						value: '100',
					},
					{
						name: '200',
						value: '200',
					},
				],
				default: '50',
				required: true,
			},
			{
				displayName: 'Trigger On',
				name: 'event',
				type: 'options',
				description:
					"Event trigger",
				options: [
					{
						name: 'Row Added',
						value: 'rowAdded',
					},
					{
						name: 'Row Updated',
						value: 'rowUpdate',
					},
				],
				default: 'rowAdded',
				required: true,
			},
		],
	};

	async poll(this: IPollFunctions): Promise<INodeExecutionData[][] | null> {
		const workflowStaticData = this.getWorkflowStaticData('node');
		const table = this.getNodeParameter('table', 0) as string;
		const event = this.getNodeParameter('event', 0) as string;
		const limit = this.getNodeParameter('limit', 0) as string;
		const returnData: INodeExecutionData[] = [];

		// Get credentials for API request
		const credentials = await this.getCredentials('bcpApi');

		try {
			// Fetch last timestamp for comparison (if available)
			const lastTimestamp = (workflowStaticData.lastTimestamp as number) || 0;
			const currentTimestamp = new Date().getTime();

			// Make API request to get records from the selected table
			const method = 'GET';
			const path = `/api/bizfly/crm/base-table/polling`;

			const response = await this.helpers.httpRequest({
				method: method,
				url: `${credentials.baseUrl}${path}`,
				headers: {
					'X-BCP-API-KEY': `${credentials.apiKey}`,
				},
				qs: {
					table: table,
					event: event,
					limit: limit,
					action_time: lastTimestamp,
				},
				json: true,
			});

			// // Process response data
			if (response.success) {
				// Update the last timestamp
				workflowStaticData.lastTimestamp = currentTimestamp;
			}
			returnData.push({json: response});

			// If no data was found, return null (no trigger)
			if (returnData.length === 0) {
				return null;
			}

			return [returnData];
		} catch (error) {
			// Handle any errors
			// Return null instead of error to prevent constant error notifications
			return null;
		}
	}
}
