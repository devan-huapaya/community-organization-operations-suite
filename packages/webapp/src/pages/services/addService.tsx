/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { AddServiceForm } from '~components/forms/AddServiceForm'
import { useServiceList } from '~hooks/api/useServiceList'
import { useCurrentUser } from '~hooks/api/useCurrentUser'
import { ServiceInput, ServiceStatus } from '@cbosuite/schema/dist/client-types'
import { Namespace, useTranslation } from '~hooks/useTranslation'
import { useHistory } from 'react-router-dom'
import { Title } from '~components/ui/Title'
import { wrap } from '~utils/appinsights'
import { FC } from 'react'
import { navigate } from '~utils/navigate'
import { ApplicationRoute } from '~types/ApplicationRoute'

export const AddServicePage: FC = wrap(function AddService() {
	const history = useHistory()
	const { orgId } = useCurrentUser()
	const { t } = useTranslation(Namespace.Services)
	const { addNewService } = useServiceList(orgId)

	// TODO: ask clarification about this
	// suggest that when a new service is created, it should be set as INACTIVE
	// INACTIVE service should allow Edits.
	// but when a service is Started, it should be set as ACTIVE and the user should not be able to edit it.
	// this is to make sure that date structure is consistent once it is started.
	const handleAddService = async (values) => {
		const newService: ServiceInput = {
			...values,
			orgId,
			status: ServiceStatus.Inactive
		}
		const res = await addNewService(newService)
		if (res) {
			navigate(history, ApplicationRoute.Services)
		}
	}
	const title = t('pageTitle')

	return (
		<>
			<Title title={title} />
			<AddServiceForm onSubmit={handleAddService} />
		</>
	)
})

export default AddServicePage
