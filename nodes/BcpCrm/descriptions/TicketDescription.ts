import type { INodeProperties } from 'n8n-workflow';

export const ticketOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['ticket'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new ticket',
				action: 'Create a ticket',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a ticket',
				action: 'Delete a ticket',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a ticket',
				action: 'Get a ticket',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update ticket properties',
				action: 'Update a ticket',
			},
		],
		default: 'create',
	},
];

export const ticketFields: INodeProperties[] = [

	/* -------------------------------------------------------------------------- */
	/*                                  ticket:get                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Ticket ID',
		name: 'rowId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['ticket'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'Unique identifier for a particular ticket',
	},

	/* -------------------------------------------------------------------------- */
	/*                                ticket:create                               */
	/* -------------------------------------------------------------------------- */
	{
				displayName: 'Type Name or ID',
				name: 'type_id',
				type: 'options',
				required: true,
				description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
				noDataExpression: true,
				typeOptions: {
					loadOptionsMethod: 'getTicketTypes',
				},
				displayOptions: {
					show: {
						resource: ['ticket'],
						operation: ['create'],
					},
				},
				default: '',
	},
	{
				displayName: 'Linked Resource',
				name: 'linked_resource',
				type: 'options',
				noDataExpression: true,
				required: true,
				options: [
					{name: 'Company', value: 'data_account'},
					{name: 'Contact', value: 'data_contact'},
					{name: 'Deal', value: 'data_deal'},
					{name: 'Lead', value: 'data_lead'},
				],
				default: 'data_account',
				displayOptions: {
					show: {
						resource: ['ticket'],
						operation: ['create'],
					},
				},
	},
	{
		displayName: 'Linked ID',
		name: 'linked_id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['ticket'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Unique identifier of linked resource (company, contact, deal, or lead)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['ticket'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
			},
			{
				displayName: 'Expires At',
				name: 'expire_time',
				type: 'dateTime',
				default: '',
			},
			{
				displayName: 'Handler Names or IDs',
				name: 'handler_ids',
				type: 'multiOptions',
				description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
				typeOptions: {
					loadOptionsMethod: 'getUsers',
				},
				default: [],
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'options',
				options: [
					{name: 'Low', value: 1},
					{name: 'Medium', value: 2},
					{name: 'High', value: 3},
				],
				default: 1,
			},
			{
				displayName: 'Relate Names or IDs',
				name: 'related_ids',
				type: 'multiOptions',
				description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
				typeOptions: {
					loadOptionsMethod: 'getUsers',
				},
				default: [],
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                  ticket:delete                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Ticket ID',
		name: 'rowId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['ticket'],
				operation: ['delete'],
			},
		},
		default: '',
		description: 'ID of ticket to delete',
	},

	/* -------------------------------------------------------------------------- */
	/*                                ticket:update                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Ticket ID',
		name: 'rowId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['ticket'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'Unique identifier for a particular ticket',
	},
	{
				displayName: 'Type Name or ID',
				name: 'type_id',
				type: 'options',
				required: true,
				description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
				noDataExpression: true,
				typeOptions: {
					loadOptionsMethod: 'getTicketTypes',
				},
				displayOptions: {
					show: {
						resource: ['ticket'],
						operation: ['update'],
					},
				},
				default: '',
	},
	{
				displayName: 'Linked Resource',
				name: 'linked_resource',
				type: 'options',
				noDataExpression: true,
				required: true,
				options: [
					{name: 'Company', value: 'data_account'},
					{name: 'Contact', value: 'data_contact'},
					{name: 'Deal', value: 'data_deal'},
					{name: 'Lead', value: 'data_lead'},
				],
				default: 'data_account',
				displayOptions: {
					show: {
						resource: ['ticket'],
						operation: ['update'],
					},
				},
	},
	{
		displayName: 'Linked ID',
		name: 'linked_id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['ticket'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'Unique identifier of linked resource (company, contact, deal, or lead)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['ticket'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
			},
			{
				displayName: 'Expires At',
				name: 'expire_time',
				type: 'dateTime',
				default: '',
			},
			{
				displayName: 'Handler Names or IDs',
				name: 'handler_ids',
				type: 'multiOptions',
				description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
				typeOptions: {
					loadOptionsMethod: 'getUsers',
				},
				default: [],
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'options',
				options: [
					{name: 'Low', value: 1},
					{name: 'Medium', value: 2},
					{name: 'High', value: 3},
				],
				default: 1,
			},
			{
				displayName: 'Relate Names or IDs',
				name: 'related_ids',
				type: 'multiOptions',
				description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
				typeOptions: {
					loadOptionsMethod: 'getUsers',
				},
				default: [],
			},
		],
	},
];
