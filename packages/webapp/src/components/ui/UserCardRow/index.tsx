/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import cx from 'classnames'
import styles from './index.module.scss'
import { StandardFC } from '~types/StandardFC'
import { CardRowTitle } from '~ui/CardRowTitle'
import { ShortString } from '~ui/ShortString'
import { memo } from 'react'
import { noop } from '~utils/noop'

export interface UserCardRowProps {
	title?: string
	layout?: Record<string, unknown>
	titleLink?: string
	body?: string | JSX.Element
	bodyLimit?: number
	mb?: boolean
	onClick?: () => void
}

/**
 * A responsive Row that turns into a Card!
 *
 * @returns CardRow should ONLY be used in ~ui/DetailsList
 */
export const UserCardRow: StandardFC<UserCardRowProps> = memo(function UserCardRow({
	title,
	titleLink,
	body,
	bodyLimit,
	mb = true,
	onClick = noop
}) {
	const bodyIsString = typeof body === 'string'

	return (
		<div className={cx(styles.userCardRow, 'p-3', mb && 'mb-3')}>
			<CardRowTitle title={title} titleLink={titleLink} onClick={onClick} />
			{bodyIsString ? <ShortString text={body as string} limit={bodyLimit} /> : body}
		</div>
	)
})
