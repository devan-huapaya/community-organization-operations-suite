/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { SubscriptionEngagementsArgs } from '@cbosuite/schema/dist/provider-types'
import { singleton } from 'tsyringe'
import { Publisher } from '~components/Publisher'
import { Interactor } from '~types'

@singleton()
export class SubscribeToEngagementsInteractor
	implements
		Interactor<unknown, SubscriptionEngagementsArgs, AsyncIterator<unknown, any, undefined>>
{
	public constructor(private publisher: Publisher) {}

	public async execute(
		_: unknown,
		{ orgId }: SubscriptionEngagementsArgs
	): Promise<AsyncIterator<unknown, any, undefined>> {
		return this.publisher.subscribeToEngagements(orgId)
	}
}
