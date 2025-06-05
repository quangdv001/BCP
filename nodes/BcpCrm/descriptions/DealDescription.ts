import type { INodeProperties } from 'n8n-workflow';

export const dealOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['data_deal'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new deal',
				action: 'Create a deal',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update deal properties',
				action: 'Update a deal',
			},
		],
		default: 'create',
	},
];

export const dealFields: INodeProperties[] = [

	/* -------------------------------------------------------------------------- */
	/*                                contact:create                               */
	/* -------------------------------------------------------------------------- */

	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['data_deal'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Company Names or ID',
				name: 'account',
				type: 'multiOptions',
				typeOptions: {
					loadOptionsMethod: 'getCompanies',
					loadOptionsDependsOn: ['resource'],
				},
				default: [], // Initially selected options
				description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
			},
			{
				displayName: 'Expected Value',
				name: 'amount',
				type: 'number',
				default: 0,
				description: 'Deal expected value',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Deal name',
			},
			{
				displayName: 'Pipeline Name or ID',
				name: 'pipeline',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getPipelines',
					loadOptionsDependsOn: ['resource'],
				},
				default: '', // The initially selected option
				description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
			},
			{
				displayName: 'Priority Level Name or ID',
				name: 'priority_level',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getPriorityLevels',
					loadOptionsDependsOn: ['resource'],
				},
				default: '', // The initially selected option
				description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
			},
			{
				displayName: 'Signing Date',
				name: 'signing_date',
				type: 'dateTime',
				default: '',
				description: 'Deal signing date',
			},
			{
				displayName: 'Type Name or ID',
				name: 'type_deal',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getTypeDeals',
					loadOptionsDependsOn: ['resource'],
				},
				default: '', // The initially selected option
				description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
			},


		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                contact:update                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Contact ID',
		name: 'contactId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['data_deal'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'Unique identifier for a particular contact',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['data_deal'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
				description: 'Contact address',
			},
			{
				displayName: 'Company Names or ID',
				name: 'account',
				type: 'multiOptions',
				typeOptions: {
					loadOptionsMethod: 'getCompanies',
					loadOptionsDependsOn: ['resource'],
				},
				default: [], // Initially selected options
				description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
			},
			{
				displayName: 'Email',
				name: 'emails',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'Contact email',
			},
			{
				displayName: 'First Name',
				name: 'surname',
				type: 'string',
				default: '',
				description: 'Contact first name',
			},
			{
				displayName: 'Last Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Contact last name',
			},
			{
				displayName: 'Phone',
				name: 'phones',
				type: 'string',
				default: '',
				description: 'Contact phone',
			},

		],
	},
];
