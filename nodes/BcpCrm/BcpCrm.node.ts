import {
	IDataObject,
	IExecuteFunctions,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodeOperationError,
} from 'n8n-workflow';
import { contactFields, contactOperations } from './descriptions/ContactDescription';
import { companyFields, companyOperations } from './descriptions/CompanyDescription';
import { dealFields, dealOperations } from './descriptions/DealDescription';
import { leadFields, leadOperations } from './descriptions/LeadDescription';
import { ticketFields, ticketOperations } from './descriptions/TicketDescription';

export class BcpCrm implements INodeType {
	// @ts-ignore
	description: INodeTypeDescription = {
		displayName: 'BCP CRM',
		name: 'bcpCrm',
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		icon: 'file:bcpcrm.svg', // Optional: Add a custom icon in the nodes/ directory
		group: ['transform'],
		version: 1,
		description: 'Interact with BCP CRM API',
		defaults: {name: 'BCP CRM'},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'bcpApi',
				required: true,
			},
		],
		properties: [
			// Resource selection
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{name: 'Company', value: 'data_account'},
					{name: 'Contact', value: 'data_contact'},
					{name: 'Deal', value: 'data_deal'},
					{name: 'Lead', value: 'data_lead'},
					{name: 'Ticket', value: 'ticket'},
				],
				default: 'data_account',
			},
			// COMPANY
			...companyOperations,
			...companyFields,
			// CONTACT
			...contactOperations,
			...contactFields,
			// DEAL
			...dealOperations,
			...dealFields,
			// LEAD
			...leadOperations,
			...leadFields,
			// TICKET
			...ticketOperations,
			...ticketFields,
		],
	};

	methods = {
		loadOptions: {
			async getCompanies(this: ILoadOptionsFunctions) {
				const returnData: INodePropertyOptions[] = [];
				const credentials = await this.getCredentials('bcpApi');
				// Get the current resource

				const method = 'GET'
				let path = '/api/bizfly/crm/base-table/list?table=data_account';

				const response = await this.helpers.httpRequest({
					method: method,
					url: `${credentials.baseUrl}${path}`,
					headers: {
						'X-BCP-API-KEY': `${credentials.apiKey}`,
					},
					json: true,
				});

				if (response.status === 200) {
					const data = response.data
					for (const dt of data) {
						returnData.push({
							name: dt.text,
							value: dt.id,
						});
					}
				}
				return returnData
			},
			async getPipelines(this: ILoadOptionsFunctions) {
				const returnData: INodePropertyOptions[] = [];
				const credentials = await this.getCredentials('bcpApi');
				const target = 'pipeline';

				const method = 'GET';
				const path = `/api/bizfly/crm/base-table/options?table=data_deal&target=${target}`;

				const response = await this.helpers.httpRequest({
					method: method,
					url: `${credentials.baseUrl}${path}`,
					headers: {
						'X-BCP-API-KEY': `${credentials.apiKey}`,
					},
					json: true,
				});

				if (response.status === 200) {
					const data = response.data;
					for (const dt of data) {
						returnData.push({
							name: dt.text,
							value: dt._id,
						});
					}
				}
				return returnData;
			},

			async getPriorityLevels(this: ILoadOptionsFunctions) {
				const returnData: INodePropertyOptions[] = [];
				const credentials = await this.getCredentials('bcpApi');
				const target = 'priority_level';

				const method = 'GET';
				const path = `/api/bizfly/crm/base-table/options?table=data_deal&target=${target}`;

				const response = await this.helpers.httpRequest({
					method: method,
					url: `${credentials.baseUrl}${path}`,
					headers: {
						'X-BCP-API-KEY': `${credentials.apiKey}`,
					},
					json: true,
				});

				if (response.status === 200) {
					const data = response.data;
					for (const dt of data) {
						returnData.push({
							name: dt.text,
							value: dt._id,
						});
					}
				}
				return returnData;
			},

			async getTypeDeals(this: ILoadOptionsFunctions) {
				const returnData: INodePropertyOptions[] = [];
				const credentials = await this.getCredentials('bcpApi');
				const target = 'type_deal';

				const method = 'GET';
				const path = `/api/bizfly/crm/base-table/options?table=data_deal&target=${target}`;

				const response = await this.helpers.httpRequest({
					method: method,
					url: `${credentials.baseUrl}${path}`,
					headers: {
						'X-BCP-API-KEY': `${credentials.apiKey}`,
					},
					json: true,
				});

				if (response.status === 200) {
					const data = response.data;
					for (const dt of data) {
						returnData.push({
							name: dt.text,
							value: dt._id,
						});
					}
				}
				return returnData;
			},
			async getTicketTypes(this: ILoadOptionsFunctions) {
				const returnData: INodePropertyOptions[] = [];
				const credentials = await this.getCredentials('bcpApi');

				const method = 'GET';
				const path = `/api/bizfly/ticket/types`;

				const response = await this.helpers.httpRequest({
					method: method,
					url: `${credentials.baseUrl}${path}`,
					headers: {
						'X-BCP-API-KEY': `${credentials.apiKey}`,
					},
					json: true,
				});

				for (const dt of response) {
					returnData.push({
						name: dt.name,
						value: dt._id,
					});
				}

				return returnData;
			},
			async getUsers(this: ILoadOptionsFunctions) {
				const returnData: INodePropertyOptions[] = [];
				const credentials = await this.getCredentials('bcpApi');

				const method = 'GET';
				const path = `/api/bizfly/bcp/users`;

				const response = await this.helpers.httpRequest({
					method: method,
					url: `${credentials.baseUrl}${path}`,
					headers: {
						'X-BCP-API-KEY': `${credentials.apiKey}`,
					},
					json: true,
				});

				if (response.success) {
					const data = response.data;
					for (const dt of data) {
						returnData.push({
							name: `${dt.name} (${dt.email})`,
							value: dt.id,
						});
					}
				}
				return returnData;

			},

		}
	};


	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData()
		const returnData: INodeExecutionData[] = []
		const resource = this.getNodeParameter('resource', 0) as string
		const operation = this.getNodeParameter('operation', 0) as string
		const credentials = await this.getCredentials('bcpApi')
		for (let i = 0; i < items.length; i++) {
			try {
				let responseData;
				const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
				const rowId = this.getNodeParameter('rowId', i, '') as string;
				const typeId = this.getNodeParameter('type_id', i, '') as string;
				const linkedResource = this.getNodeParameter('linked_resource', i, '') as string;
				const linkedId = this.getNodeParameter('linked_id', i, '') as string;

				const headers = {
					'X-BCP-API-KEY': `${credentials.apiKey}`,
				}

				if (operation === 'create') {
					const method = 'POST'
					let path = '/api/bizfly/crm/base-table'
					let body = {
						table: resource,
						data: additionalFields,
					}
					if (resource === 'data_contact' || resource === 'data_lead') {
						if (!additionalFields.name) {
							throw new NodeOperationError(this.getNode(), 'The "Last Name" field is required for creating');
						}
					}
					if (resource === 'ticket') {
						if (!additionalFields.name) {
							throw new NodeOperationError(this.getNode(), 'The "Name" field is required for creating');
						}

						path = '/api/bizfly/ticket';
						let data = additionalFields;
						data.type_id = typeId;
						data.data_crm = {
							table: linkedResource,
							id: linkedId,
						}
						body = {
							table: resource,
							data: data,
						}
					}

					// Replace with actual API call (e.g., axios.post)
					responseData = await this.helpers.httpRequest({
						method: method,
						url: `${credentials.baseUrl}${path}`,
						headers: headers,
						body: body,
						json: true,
					});
				}

				if (operation === 'update') {
					const method = 'PUT'
					let path = `/api/bizfly/crm/base-table/${rowId}`
					let body = {
						table: resource,
						data: additionalFields,
					}

					if (resource === 'ticket') {
						path = `/api/bizfly/ticket/${rowId}`;
						let data = additionalFields;
						data.type_id = typeId;
						data.data_crm = {
							table: linkedResource,
							id: linkedId,
						}
						body = {
							table: resource,
							data: data,
						}
					}
					// Replace with actual API call (e.g., axios.post)
					responseData = await this.helpers.httpRequest({
						method: method,
						url: `${credentials.baseUrl}${path}`,
						headers: headers,
						body: body,
						json: true,
					});
				}

				if (operation === 'delete') {
					const method = 'DELETE'
					let path = `/api/bizfly/crm/base-table/${rowId}`
					if (resource === 'ticket') {
						path = `/api/bizfly/ticket/${rowId}`;
					}
					const body = {
						table: resource
					}
					// Replace with actual API call (e.g., axios.post)
					responseData = await this.helpers.httpRequest({
						method: method,
						url: `${credentials.baseUrl}${path}`,
						headers: headers,
						body: body,
						json: true,
					});
				}

				if (operation === 'get') {
					const method = 'GET'
					let path = `/api/bizfly/crm/base-table/detail/${rowId}?table=${resource}`;
					if (resource === 'ticket') {
						path = `/api/bizfly/ticket/show/${rowId}`;
					}
					// Replace with actual API call (e.g., axios.post)
					responseData = await this.helpers.httpRequest({
						method: method,
						url: `${credentials.baseUrl}${path}`,
						headers: headers,
						json: true,
					});
				}

				// @ts-ignore
				returnData.push({json: responseData});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({json: {error: error.message}, error});
				} else {
					throw error;
				}
			}
		}

		return [returnData];
	}
}
