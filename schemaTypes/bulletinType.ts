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
      name: 'urgent',
      type: 'boolean',
      title: 'Urgent',
      description: 'Show bulletin prominently at top of every page',
    }),
    defineField({
      name: 'details',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  orderings: [
    {
      title: 'Start time, newest',
      name: 'startTimeDesc',
      by: [{field: 'startTime', direction: 'desc'}],
    },
    {
      title: 'Start time, oldest',
      name: 'startTimeAsc',
      by: [{field: 'startTime', direction: 'asc'}],
    },
    {
      title: 'Text, A-Z',
      name: 'textAsc',
      by: [{field: 'text', direction: 'asc'}],
    },
  ],
})
