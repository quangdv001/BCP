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
		const table = this.getNodeParameter('table', 0) as string
		const event = this.getNodeParameter('event', 0) as string;
		const returnData: INodeExecutionData[] = []

		returnData.push({
			json: {
				table,
				event,
				workflowStaticData,
			}
		})
		return [returnData];
	}
}
