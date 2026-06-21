import {defineField, defineType} from 'sanity'

export const placeType = defineType({
  name: 'place',
  title: 'Place',
  type: 'document',
  fieldsets: [
    {
      name: 'autoPopulated',
      title: 'Automatically populated',
      description:
        'These fields are updated weekly from the Google Maps link. Manual edits will be overwritten.',
      options: {collapsible: true, collapsed: false},
    },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gmaps',
      title: 'Google Maps link',
      type: 'url',
      description: 'Used to automatically populate the fields below.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 1,
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),

    // Automatically populated fields
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
      fieldset: 'autoPopulated',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fieldset: 'autoPopulated',
      fields: [
        defineField({
          name: 'street',
          title: 'Street address',
          type: 'string',
        }),
        defineField({
          name: 'city',
          title: 'City',
          type: 'string',
        }),
        defineField({
          name: 'state',
          title: 'State',
          type: 'string',
          initialValue: 'MA',
        }),
        defineField({
          name: 'zip',
          title: 'ZIP code',
          type: 'string',
        }),
      ],
      options: {columns: 2},
    }),
    defineField({
      name: 'coordinates',
      title: 'Coordinates',
      type: 'object',
      fieldset: 'autoPopulated',
      fields: [
        defineField({
          name: 'latitude',
          title: 'Latitude',
          type: 'number',
          validation: (rule) => rule.min(-90).max(90),
        }),
        defineField({
          name: 'longitude',
          title: 'Longitude',
          type: 'number',
          validation: (rule) => rule.min(-180).max(180),
        }),
      ],
      options: {columns: 2},
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'address.city',
    },
  },
})
