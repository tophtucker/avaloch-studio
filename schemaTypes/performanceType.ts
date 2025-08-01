import {defineField, defineType} from 'sanity'

export const performanceType = defineType({
  name: 'performance',
  type: 'document',
  title: 'Performance',
  fields: [
    defineField({
      name: 'startTime',
      type: 'datetime',
      title: 'Date and time',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endTime',
      type: 'datetime',
      title: 'End date and time',
    }),
    defineField({
      name: 'noTime',
      type: 'boolean',
      title: 'Don’t show time',
      description: 'Check for all-day events or events with unknown start time',
    }),
    defineField({
      name: 'act',
      type: 'reference',
      to: [{type: 'act'}],
    }),
    defineField({
      name: 'note',
      type: 'string',
      title: 'Note',
    }),
  ],
  orderings: [
    {
      title: 'Time, newest',
      name: 'startTimeDesc',
      by: [{field: 'startTime', direction: 'desc'}],
    },
    {
      title: 'Time, oldest',
      name: 'startTimeAsc',
      by: [{field: 'startTime', direction: 'asc'}],
    },
    {
      title: 'Note, A-Z',
      name: 'note',
      by: [{field: 'note', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      date: 'startTime',
      actName: 'act.name',
    },
    prepare({date, actName}) {
      const d = new Date(date)
      const dateStr = d.toLocaleDateString('en-US', {month: 'short', day: 'numeric'})
      const timeStr = d.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit'})
      return {
        title: `${actName || 'Untitled'} — ${dateStr} @ ${timeStr}`,
      }
    },
  },
})
