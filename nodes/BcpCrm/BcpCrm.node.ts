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

				const headers = {
					'X-BCP-API-KEY': `${credentials.apiKey}`,
				}

				if (operation === 'create') {
					if (resource === 'data_contact' || resource === 'data_lead') {
						if (!additionalFields.name) {
							throw new NodeOperationError(this.getNode(), 'The "Last Name" field is required for creating');
						}
					}
					const method = 'POST'
					const path = '/api/bizfly/crm/base-table'
					const body = {
						table: resource,
						data: additionalFields,
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
					const path = `/api/bizfly/crm/base-table/${rowId}`
					const body = {
						table: resource,
						data: additionalFields,
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
					const path = `/api/bizfly/crm/base-table/${rowId}`
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
					const path = `/api/bizfly/crm/base-table/detail/${rowId}?table=${resource}`;
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
