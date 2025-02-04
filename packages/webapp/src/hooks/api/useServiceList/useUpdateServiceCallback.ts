/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { gql, useMutation } from '@apollo/client'
import { MutationUpdateServiceArgs, ServiceInput } from '@cbosuite/schema/dist/client-types'
import { ServiceFields } from '../fragments'
import { useToasts } from '~hooks/useToasts'
import { useTranslation } from '~hooks/useTranslation'
import { useCallback } from 'react'

const UPDATE_SERVICE = gql`
	${ServiceFields}

	mutation updateService($service: ServiceInput!) {
		updateService(service: $service) {
			message
			service {
				...ServiceFields
			}
		}
	}
`

export type UpdateServiceCallback = (svc: ServiceInput) => Promise<boolean>

export function useUpdateServiceCallback(load: () => void) {
	const { c } = useTranslation()
	const { success, failure } = useToasts()
	const [updateExistingService] = useMutation<any, MutationUpdateServiceArgs>(UPDATE_SERVICE)

	return useCallback(
		async (service: ServiceInput) => {
			try {
				await updateExistingService({ variables: { service } })
				load()
				success(c('hooks.useServicelist.updateServiceSuccess'))
				return true
			} catch (error) {
				failure(c('hooks.useServicelist.updateServiceFailed'))
				return false
			}
		},
		[c, failure, load, success, updateExistingService]
	)
}
