import type { INodeProperties } from 'n8n-workflow';

export const contactOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['data_contact'],
			},
		},
		options: [
			{
				name: 'Apply Filter',
				value: 'filter',
				description: 'Apply contacts to filters',
				action: 'Apply contacts to filters',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new contact',
				action: 'Create a contact',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a contact',
				action: 'Delete a contact',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a contact',
				action: 'Get a contact',
			},
			{
				name: 'Get By Filter',
				value: 'getList',
				description: 'Get contacts by list',
				action: 'Get contacts by list',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update contact properties',
				action: 'Update a contact',
			},
		],
		default: 'create',
	},
];

export const contactFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                  contact:get                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Contact ID',
		name: 'rowId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['data_contact'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'Unique identifier for a particular contact',
	},

	/* -------------------------------------------------------------------------- */
	/*                                  contact:filter                            */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Filter Name or ID',
		name: 'filter_ids',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['data_contact'],
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
		displayName: 'Contact IDs',
		name: 'rowIds',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['data_contact'],
				operation: ['filter'],
			},
		},
		default: '',
		description: 'Unique identifier for a particular contact',
	},

	/* -------------------------------------------------------------------------- */
	/*                                  contact:getList                              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Filter Name or ID',
		name: 'filter_id',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['data_contact'],
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
				resource: ['data_contact'],
				operation: ['create'],
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

	/* -------------------------------------------------------------------------- */
	/*                                  contact:delete                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Contact ID',
		name: 'rowId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['data_contact'],
				operation: ['delete'],
			},
		},
		default: '',
		description: 'ID of contact to delete',
	},

	/* -------------------------------------------------------------------------- */
	/*                                contact:update                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Contact ID',
		name: 'rowId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['data_contact'],
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
				resource: ['data_contact'],
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
