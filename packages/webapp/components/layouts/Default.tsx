/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAuthUser } from '~slices/authSlice'
import CP from '~types/ComponentProps'

export interface DefaultLayoutProps extends CP {
	showNav?: boolean
}

export default function DefaultLayout({ children, showNav }: DefaultLayoutProps): JSX.Element {
	const router = useRouter()
	const auth = useSelector(getAuthUser)

	useEffect(() => {
		if (!auth.signedIn && !auth.loading && router.route !== '/login') {
			void router.push('/login')
		}
	}, [auth.signedIn, auth.loading, router.pathname, router])

	return <>{children}</>
}
