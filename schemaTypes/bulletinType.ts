import {defineField, defineType} from 'sanity'

export const bulletinType = defineType({
  name: 'bulletin',
  title: 'Bulletin',
  type: 'document',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'startTime',
      type: 'datetime',
      title: 'Show from',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endTime',
      type: 'datetime',
      title: 'Show until',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'details',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
