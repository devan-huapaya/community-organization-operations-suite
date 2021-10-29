/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { AppContext } from '~types'
import {
	Engagement as EngagementType,
	EngagementResolvers
} from '@cbosuite/schema/dist/provider-types'
import { createGQLContact, createGQLTag, createGQLUser } from '~dto'
import { sortByDate } from '~utils'
import { container } from 'tsyringe'
import { ContactCollection, TagCollection, UserCollection } from '~db'
import { empty } from '~utils/noop'

export const Engagement: EngagementResolvers<AppContext> = {
	user: async (_: EngagementType) => {
		if (!_.user) return null

		// if the user is already populated pass it along
		if (_.user.id) {
			return _.user
		}

		const users = container.resolve(UserCollection)
		const userId = _.user as any as string
		const user = await users.itemById(userId)
		if (!user.item) {
			throw new Error('user not found for engagement')
		}

		return createGQLUser(user.item, true)
	},
	contacts: async (_: EngagementType) => {
		if (!_.contacts) return []

		const contacts = container.resolve(ContactCollection)
		const contactIds = _.contacts as any[] as string[]

		const result = await Promise.all([
			...contactIds.map(async (contactId) => {
				const contact = await contacts.itemById(contactId)
				if (!contact.item) {
					throw new Error('contact not found for engagement')
				}
				return createGQLContact(contact.item)
			})
		])

		return result
	},
	tags: async (_: EngagementType) => {
		const engagementTags = (_.tags || []) as any as string[]
		const tags = container.resolve(TagCollection)
		const returnTags = await tags.items({}, { id: { $in: engagementTags } })
		return returnTags?.items.map(createGQLTag) ?? empty
	},
	actions: async (_: EngagementType) => {
		return _.actions.sort(sortByDate)
	}
}
