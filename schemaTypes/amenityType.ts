import {defineField, defineType} from 'sanity'

export const amenityType = defineType({
  name: 'amenity',
  title: 'Amenity',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      description: 'Show asterisk and short gray notice next to name, e.g. “Summer only”',
    }),
    defineField({
      name: 'description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'disabled',
      type: 'boolean',
      title: 'Disabled',
    }),
  ],
})
