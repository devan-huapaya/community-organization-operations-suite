/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo } from 'react'
import { SetPasswordCallback, useSetPasswordCallback } from './useSetPasswordCallback'

export function useProfile(): {
	setPassword: SetPasswordCallback
} {
	const setPassword = useSetPasswordCallback()

	return useMemo(
		() => ({
			setPassword
		}),
		[setPassword]
	)
}
