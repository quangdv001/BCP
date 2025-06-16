import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class BcpApi implements ICredentialType {
	name = 'bcpApi';
	displayName = 'BCP API';
	// Uses the link to this tutorial as an example
	// Replace with your own docs links when building your own nodes
	documentationUrl = 'https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/';
	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'options',
			required: true,
			options: [
				{
					name: 'Production',
					value: 'https://api.bcp.bizfly.vn',
				},
				{
					name: 'Development',
					value: 'https://api.onestop.bizdev.vn',
				},
			],
			default: 'https://api.bcp.bizfly.vn', // The initially selected option
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-BCP-API-KEY': '={{$credentials.apiKey}}',
			},
		},
	};
	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.baseUrl}}',
			url: '/api/bizfly/bcp/test',
			headers: {
				'X-BCP-API-KEY': '={{$credentials.apiKey}}',
			},
		},
	};
}
