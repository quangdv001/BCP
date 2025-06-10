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
		description: 'Unique identifier for a particular company',
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
