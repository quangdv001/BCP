import type { INodeProperties } from 'n8n-workflow';

export const companyOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['data_account'],
			},
		},
		options: [
			{
				name: 'Apply Filter',
				value: 'filter',
				description: 'Apply companies to filters',
				action: 'Apply companies to filters',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new company',
				action: 'Create a company',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a company',
				action: 'Delete a company',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a company',
				action: 'Get a company',
			},
			{
				name: 'Get By Filter',
				value: 'getList',
				description: 'Get companies by filter',
				action: 'Get companies by filter',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update company properties',
				action: 'Update a company',
			},
		],
		default: 'create',
	},
];

export const companyFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                  company:get                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Company ID',
		name: 'rowId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['data_account'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'Unique identifier for a particular company',
	},

	/* -------------------------------------------------------------------------- */
	/*                                  company:filter                            */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Filter Name or ID',
		name: 'filter_ids',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['data_account'],
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
		displayName: 'Company IDs',
		name: 'rowIds',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['data_account'],
				operation: ['filter'],
			},
		},
		default: '',
		description: 'Unique identifier for a particular company',
	},

	/* -------------------------------------------------------------------------- */
	/*                                  company:getList                           */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Filter Name or ID',
		name: 'filter_id',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['data_account'],
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
	/*                                company:create                              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['data_account'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
				description: 'Company address',
			},
			{
				displayName: 'Country',
				name: 'code_country',
				type: 'string',
				default: '',
				description: 'Company country',
			},
			{
				displayName: 'Domain',
				name: 'domain',
				type: 'string',
				default: '',
				description: 'Company domain',
			},
			{
				displayName: 'Email',
				name: 'emails',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'Company email',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Company name',
			},
			{
				displayName: 'Phone',
				name: 'phones',
				type: 'string',
				default: '',
				description: 'Company phone',
			},
			{
				displayName: 'Tax Code',
				name: 'tax_code',
				type: 'string',
				default: '',
				description: 'Company tax code',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                  company:delete                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Company ID',
		name: 'rowId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['data_account'],
				operation: ['delete'],
			},
		},
		default: '',
		description: 'ID of company to delete',
	},

	/* -------------------------------------------------------------------------- */
	/*                                company:update                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Company ID',
		name: 'rowId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['data_account'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'Unique identifier for a particular company',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['data_account'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
				description: 'Company address',
			},
			{
				displayName: 'Country',
				name: 'code_country',
				type: 'string',
				default: '',
				description: 'Company country',
			},
			{
				displayName: 'Domain',
				name: 'domain',
				type: 'string',
				default: '',
				description: 'Company domain',
			},
			{
				displayName: 'Email',
				name: 'emails',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'Company email',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Company name',
			},
			{
				displayName: 'Phone',
				name: 'phones',
				type: 'string',
				default: '',
				description: 'Company phone',
			},
			{
				displayName: 'Tax Code',
				name: 'tax_code',
				type: 'string',
				default: '',
				description: 'Company tax code',
			},
		],
	},
];
