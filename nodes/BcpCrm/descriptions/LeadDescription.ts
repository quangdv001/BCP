import type { INodeProperties } from 'n8n-workflow';

export const leadOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['data_lead'],
			},
		},
		options: [
			{
				name: 'Apply Filter',
				value: 'filter',
				description: 'Apply leads to filters',
				action: 'Apply leads to filters',
			},
			{
				name: 'Assign Lead to Sales Rep',
				value: 'assign',
				action: 'Assign lead to sales rep',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new lead',
				action: 'Create a lead',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a lead',
				action: 'Delete a lead',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a lead',
				action: 'Get a lead',
			},
			{
				name: 'Get By Filter',
				value: 'getList',
				description: 'Get leads by list',
				action: 'Get leads by list',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update lead properties',
				action: 'Update a lead',
			},
		],
		default: 'create',
	},
];

export const leadFields: INodeProperties[] = [

	/* -------------------------------------------------------------------------- */
	/*                                  lead:get                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Lead ID',
		name: 'rowId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['data_lead'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'Unique identifier for a particular lead',
	},

	/* -------------------------------------------------------------------------- */
	/*                                  lead:filter                            */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Filter Name or ID',
		name: 'filter_ids',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['data_lead'],
				operation: ['filter'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getFilters',
			loadOptionsDependsOn: ['resource'],
		},
		default: '', // Initially selected options
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
	},
	{
		displayName: 'Lead IDs',
		name: 'rowIds',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['data_lead'],
				operation: ['filter'],
			},
		},
		default: '',
		description: 'Unique identifier for a particular lead',
	},

	/* -------------------------------------------------------------------------- */
	/*                                  lead:getList                              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Filter Name or ID',
		name: 'filter_id',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['data_lead'],
				operation: ['getList'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getFilters',
			loadOptionsDependsOn: ['resource'],
		},
		default: '', // Initially selected options
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
	},

	/* -------------------------------------------------------------------------- */
	/*                                  lead:assign                            */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Lead IDs',
		name: 'rowIds',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['data_lead'],
				operation: ['assign'],
			},
		},
		default: '',
		description: 'Unique identifier for a particular lead',
	},
	{
		displayName: 'Type Assign Name or ID',
		name: 'assign_type',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['data_lead'],
				operation: ['assign'],
			},
		},
		options: [
			{name: 'Equal', value: 'equal'},
			{name: 'Random', value: 'random'},
		],
		default: 'equal', // Initially selected options
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
	},
	{
		displayName: 'Sale Names or IDs',
		name: 'sales_list',
		type: 'multiOptions',
		required: true,
		displayOptions: {
			show: {
				resource: ['data_lead'],
				operation: ['assign'],
				assign_type: ['equal'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getSales',
			loadOptionsDependsOn: ['resource'],
		},
		default: [], // Initially selected options
		description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
	},
	{
		displayName: 'Lead Assignment Weight',
		name: 'sales',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['data_lead'],
				operation: ['assign'],
				assign_type: ['random'],
			},
		},
		default: {},
		options: [
			{
				name: 'sale',
				displayName: 'Sale',
				values: [
					{
						displayName: 'Sale Name or ID',
						name: 'key',
						type: 'options',
						description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
						typeOptions: {
							loadOptionsMethod: 'getSales',
						},
						default: '',
					},
					{
						displayName: 'Sale Rep Weight',
						name: 'value',
						type: 'number',
						default: 0,
					},
				],
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                lead:create                               */
	/* -------------------------------------------------------------------------- */

	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['data_lead'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
				description: 'Lead address',
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
				description: 'Lead email',
			},
			{
				displayName: 'First Name',
				name: 'surname',
				type: 'string',
				default: '',
				description: 'Lead first name',
			},
			{
				displayName: 'Last Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Lead last name',
			},
			{
				displayName: 'Phone',
				name: 'phones',
				type: 'string',
				default: '',
				description: 'Lead phone',
			},

		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                  lead:delete                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Lead ID',
		name: 'rowId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['data_lead'],
				operation: ['delete'],
			},
		},
		default: '',
		description: 'ID of lead to delete',
	},

	/* -------------------------------------------------------------------------- */
	/*                                lead:update                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Lead ID',
		name: 'rowId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['data_lead'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'Unique identifier for a particular lead',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['data_lead'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
				description: 'Lead address',
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
				description: 'Lead email',
			},
			{
				displayName: 'First Name',
				name: 'surname',
				type: 'string',
				default: '',
				description: 'Lead first name',
			},
			{
				displayName: 'Last Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Lead last name',
			},
			{
				displayName: 'Phone',
				name: 'phones',
				type: 'string',
				default: '',
				description: 'Lead phone',
			},

		],
	},
];
