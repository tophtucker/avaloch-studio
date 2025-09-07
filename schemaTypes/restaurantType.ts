import {ConditionalProperty} from 'sanity'
import {StringRule} from 'sanity'
import {defineField, defineType} from 'sanity'

const timeValidator = (rule: StringRule) =>
  rule.custom((value) => {
    if (value === undefined) return true
    const test = /^(?:[01]\d|2[0-3]):[0-5]\d|24:00$/.test(value)
    if (!test) {
      return 'Must be a 24-hour time formatted like “09:00” (for 9 AM) or “22:30” (for 10:30 PM).'
    }
    return true
  })

const disableIfClosed: ConditionalProperty = ({parent}) => !!(parent && parent.closed)

export const restaurantType = defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'menus',
      title: 'Menus',
      type: 'array',
      of: [
        {
          type: 'file',
          options: {
            accept: 'application/pdf',
          },
          fields: [
            defineField({
              type: 'string',
              name: 'name',
              title: 'Name',
              description: 'E.g. “Drinks” or “Food”',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'hours',
      title: 'Hours',
      description:
        'Open and close times must be a 24-hour time formatted like “09:00” (for 9 AM) or “22:30” (for 10:30 PM).',
      type: 'object',
      fields: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
        (title) =>
          defineField({
            name: title.toLowerCase(),
            title,
            type: 'object',
            fields: [
              defineField({type: 'boolean', name: 'closed', title: 'Closed'}),
              defineField({
                name: 'open',
                title: 'Open time',
                type: 'string',
                validation: timeValidator,
                readOnly: disableIfClosed,
              }),
              defineField({
                name: 'close',
                title: 'Close time',
                type: 'string',
                validation: timeValidator,
                readOnly: disableIfClosed,
              }),
            ],
            options: {columns: 3},
          }),
      ),
    }),
    defineField({
      name: 'hourOverrides',
      title: 'Special hours',
      description:
        'Special hours override default weekly hours. For example, you could say the restaurant is closed on Christmas.',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'override',
          fields: [
            defineField({type: 'date', name: 'date', title: 'Date'}),
            defineField({type: 'boolean', name: 'closed', title: 'Closed'}),
            defineField({
              type: 'string',
              name: 'open',
              title: 'Open time',
              validation: timeValidator,
              readOnly: disableIfClosed,
            }),
            defineField({
              type: 'string',
              name: 'close',
              title: 'Close time',
              validation: timeValidator,
              readOnly: disableIfClosed,
            }),
          ],
          preview: {
            select: {
              date: 'date',
              open: 'open',
              close: 'close',
              closed: 'closed',
            },
            prepare({date, open, close, closed}) {
              return {
                title: `${date}: ${closed ? 'Closed' : `${open} – ${close}`}`,
              }
            },
          },
        }),
      ],
    }),
  ],
})
