/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ApiResponse } from '../types'
import type { Engagement } from '@cbosuite/schema/dist/client-types'
import { engagementState } from '~store'
import { useRecoilState } from 'recoil'
import { AddActionCallback, useAddActionCallback } from './useAddActionCallback'
import { LoadEngagementCallback, useLoadEngagementCallback } from './useLoadEngagementCallback'
import { useEffect, useMemo } from 'react'
import { SetStatusCallback, useSetStatusCallback } from './useSetStatusCallback'
import { useCompleteEngagementCallback } from './useCompleteEngagementCallback'
import {
	AssignEngagementCallback,
	useAssignEngagementCallback
} from './useAssignEngagementCallback'

interface useEngagementReturn extends ApiResponse<Engagement> {
	assign: AssignEngagementCallback
	setStatus: SetStatusCallback
	addAction: AddActionCallback
	completeEngagement: () => void
	loadEngagement: LoadEngagementCallback
}

export function useEngagement(id?: string, orgId?: string): useEngagementReturn {
	const [engagementData] = useRecoilState<Engagement | undefined>(engagementState)
	const assign = useAssignEngagementCallback(id)
	const setStatus = useSetStatusCallback(id, orgId)
	const addAction = useAddActionCallback(id)
	const completeEngagement = useCompleteEngagementCallback(id)

	const { load: loadEngagement, loading, error, refetch } = useLoadEngagementCallback()
	// TODO: why is this a lazy query if we're actively triggering it?
	useEffect(() => {
		if (id) {
			loadEngagement(id)
		}
	}, [id, loadEngagement])

	return useMemo(
		() => ({
			loading,
			error,
			loadEngagement,
			refetch,
			assign,
			setStatus,
			addAction,
			completeEngagement,
			data: engagementData
		}),
		[
			loading,
			error,
			loadEngagement,
			refetch,
			assign,
			setStatus,
			addAction,
			completeEngagement,
			engagementData
		]
	)
}
