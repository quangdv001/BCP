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
				name: 'Delete',
				value: 'delete',
				description: 'Delete a deal',
				action: 'Delete a deal',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a deal',
				action: 'Get a deal',
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
	/*                                  deal:get                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Deal ID',
		name: 'rowId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['data_deal'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'Unique identifier for a particular deal',
	},

	/* -------------------------------------------------------------------------- */
	/*                                deal:create                               */
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
	/*                                  deal:delete                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Deal ID',
		name: 'rowId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['data_deal'],
				operation: ['delete'],
			},
		},
		default: '',
		description: 'ID of deal to delete',
	},

	/* -------------------------------------------------------------------------- */
	/*                                deal:update                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Deal ID',
		name: 'rowId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['data_deal'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'Unique identifier for a particular deal',
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
];
