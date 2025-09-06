import {defineField, defineType} from 'sanity'

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
              defineField({
                name: 'open',
                title: 'Open time',
                type: 'string',
                validation: (rule) =>
                  rule.custom((value, context) => {
                    if (value === undefined) return true
                    const test = /^(?:[01]\d|2[0-3]):[0-5]\d|24:00$/.test(value)
                    if (!test) {
                      return 'Must be a 24-hour time formatted like “09:00” (for 9 AM) or “22:30” (for 10:30 PM).'
                    }
                    return true
                  }),
              }),
              defineField({
                name: 'close',
                title: 'Close time',
                type: 'string',
              }),
            ],
            options: {columns: 2},
          }),
      ),
    }),
  ],
})
