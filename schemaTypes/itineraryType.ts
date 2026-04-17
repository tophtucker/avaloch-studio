import {PinIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType, DEFAULT_ANNOTATIONS} from 'sanity'

export const itineraryType = defineType({
  name: 'itinerary',
  title: 'Itinerary',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [
              ...DEFAULT_ANNOTATIONS,
              defineField({
                name: 'placeReference',
                title: 'Place',
                type: 'object',
                icon: PinIcon,
                fields: [
                  defineField({
                    name: 'place',
                    title: 'Place',
                    type: 'reference',
                    to: [{type: 'place'}],
                    validation: (rule) => rule.required(),
                  }),
                ],
              }),
            ],
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
