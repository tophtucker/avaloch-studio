import {defineField, defineType} from 'sanity'

export const performanceType = defineType({
  name: 'performance',
  type: 'document',
  title: 'Performance',
  fields: [
    defineField({
      name: 'time',
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
  preview: {
    select: {
      date: 'time',
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
