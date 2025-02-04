/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useServiceList } from '~hooks/api/useServiceList'
import { useCurrentUser } from '~hooks/api/useCurrentUser'
import { ServiceInput, ServiceStatus } from '@cbosuite/schema/dist/client-types'
import { Namespace, useTranslation } from '~hooks/useTranslation'
import { EditServiceForm } from '~components/forms/EditServiceForm'
import { useHistory } from 'react-router-dom'
import { useLocationQuery } from '~hooks/useLocationQuery'
import { Title } from '~components/ui/Title'
import { wrap } from '~utils/appinsights'
import { navigate } from '~utils/navigate'
import { ApplicationRoute } from '~types/ApplicationRoute'

const EditServicePage = wrap(function EditService() {
	const history = useHistory()
	const { orgId } = useCurrentUser()
	const { t } = useTranslation(Namespace.Services)
	const { serviceList, updateService } = useServiceList(orgId)

	const { sid } = useLocationQuery()
	const selectedService =
		typeof sid === 'string' ? serviceList.find((s) => s.id === sid) : undefined

	if (selectedService?.status === ServiceStatus.Archive) {
		navigate(history, ApplicationRoute.Services)
	}

	const handleUpdateService = async (values) => {
		const updatedService: ServiceInput = {
			...values,
			id: sid,
			orgId,
			status: selectedService?.status
		}
		const res = await updateService(updatedService)
		if (res) {
			navigate(history, ApplicationRoute.Services)
		}
	}
	const title = t('pageTitle')

	return (
		<>
			<Title title={title} />
			<EditServiceForm
				service={selectedService}
				onSubmit={(values) => handleUpdateService(values)}
			/>
		</>
	)
})

export default EditServicePage
