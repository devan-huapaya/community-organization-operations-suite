/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { LoginLayout } from '~layouts/LoginLayout'
import { PasswordResetForm } from '~components/forms/PasswordResetForm'
import { LoginPageBody } from '~components/ui/LoginPageBody'
import { wrap } from '~utils/appinsights'
import { FC } from 'react'
import { useLocationQuery } from '~hooks/useLocationQuery'

const PasswordResetPage: FC = wrap(function PasswordResetPage() {
	const { resetToken } = useLocationQuery()
	return (
		<LoginLayout>
			<LoginPageBody>
				<PasswordResetForm resetToken={resetToken} />
			</LoginPageBody>
		</LoginLayout>
	)
})

export default PasswordResetPage
