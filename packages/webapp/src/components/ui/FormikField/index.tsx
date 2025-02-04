/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import cx from 'classnames'
import { Field } from 'formik'
import styles from './index.module.scss'
import type { StandardFC } from '~types/StandardFC'
import { memo } from 'react'

// This props list is not all inclusive and should be added to as props from formiks input field are needed
// https://formik.org/docs/api/field
interface FormikFieldProps {
	title?: string
	name: string
	placeholder?: string
	as?: string
	error?: string
	errorClassName?: string
	type?: string
	value?: string
	disabled?: boolean
	min?: number
	max?: number
	onChange?: (val: any) => void
}

/**
 * Styled wrapper around FormikInputField
 * @param param0
 * @returns
 */
export const FormikField: StandardFC<FormikFieldProps> = memo(function FormikField({
	className,
	error,
	errorClassName,
	...props
}) {
	return (
		<>
			<Field className={cx(styles.formikField, className)} {...props} />

			{/* Handle errors */}
			{error ? <div className={cx('pt-2 text-danger', errorClassName)}>{error}</div> : null}
		</>
	)
})
