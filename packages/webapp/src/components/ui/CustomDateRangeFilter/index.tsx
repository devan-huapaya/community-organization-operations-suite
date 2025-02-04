/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import type { StandardFC } from '~types/StandardFC'
import { wrap } from '~utils/appinsights'
import {
	Callout,
	DatePicker,
	IDatePickerStyles,
	ActionButton,
	IButtonStyles,
	Icon
} from '@fluentui/react'

import cx from 'classnames'
import { useBoolean, useId } from '@fluentui/react-hooks'
import { Namespace, useTranslation } from '~hooks/useTranslation'
import { useLocale } from '~hooks/useLocale'
import { noop } from '~utils/noop'

interface CustomDateRangeFilterProps {
	defaultSelectedDates?: [string | Date, string | Date]
	filterLabel: string
	minStartDate?: Date
	maxEndDate?: Date
	startDate?: Date
	endDate?: Date
	onFilterChanged?: ({ startDate, endDate }?: { startDate?: Date; endDate?: Date }) => void
}

const datePickerStyles: Partial<IDatePickerStyles> = {
	root: {
		border: 0
	},
	wrapper: {
		border: 0
	},
	textField: {
		selectors: {
			'.ms-TextField-field': {
				fontSize: 12
			},
			'.ms-TextField-fieldGroup': {
				borderRadius: 4,
				height: 34,
				borderColor: 'var(--bs-gray-4)',
				':after': {
					outline: 0,
					border: 0
				},
				':hover': {
					borderColor: 'var(--bs-primary)'
				}
			},
			'.ms-Label': {
				fontSize: 12,
				':after': {
					color: 'var(--bs-danger)'
				}
			}
		}
	}
}

const actionButtonStyles: Partial<IButtonStyles> = {
	textContainer: {
		fontSize: 12
	},
	icon: {
		fontSize: 12
	}
}

export const CustomDateRangeFilter: StandardFC<CustomDateRangeFilterProps> = wrap(
	function CustomDateRangeFilter({
		filterLabel,
		defaultSelectedDates,
		minStartDate,
		maxEndDate,
		startDate,
		endDate,
		onFilterChanged = noop
	}) {
		const { t } = useTranslation(Namespace.Reporting)
		const [locale] = useLocale()
		const buttonId = useId('filter-callout-button')
		const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false)
		const [startDateState, setStartDateState] = useState<Date | null>(startDate)
		const [endDateState, setEndDateState] = useState<Date | null>(endDate)

		const dateLimit = minStartDate === maxEndDate ? minStartDate : undefined

		useEffect(() => {
			if (defaultSelectedDates && defaultSelectedDates.length === 2) {
				const defaults = defaultSelectedDates.map((d) => (d ? new Date(d) : null))
				setStartDateState(defaults[0])
				setEndDateState(defaults[1])
			}
		}, [defaultSelectedDates, setStartDateState, setEndDateState])

		return (
			<>
				<button
					id={buttonId}
					className={styles.customFilterButton}
					onClick={toggleIsCalloutVisible}
					title={filterLabel.length > 30 ? filterLabel : ''}
				>
					<span>
						{filterLabel.length > 30 ? filterLabel.substring(0, 30) + '...' : filterLabel}
					</span>
					<Icon
						iconName='FilterSolid'
						className={cx(
							styles.buttonIcon,
							startDateState || endDateState ? styles.buttonIconActive : null
						)}
					/>
				</button>
				{isCalloutVisible ? (
					<Callout
						className={styles.callout}
						gapSpace={0}
						target={`#${buttonId}`}
						isBeakVisible={false}
						onDismiss={toggleIsCalloutVisible}
						directionalHint={4}
						setInitialFocus
					>
						<div className={styles.dateRangeFilter}>
							<DatePicker
								label={t('customFilters.dateFrom')}
								value={startDateState}
								minDate={dateLimit ? undefined : minStartDate}
								maxDate={endDateState || dateLimit}
								formatDate={(date) => date.toLocaleDateString(locale)}
								onSelectDate={(date) => {
									setStartDateState(date)
									onFilterChanged({ startDate: date, endDate: endDateState })
								}}
								allowTextInput
								styles={datePickerStyles}
							/>
							<DatePicker
								label={t('customFilters.dateTo')}
								value={endDateState}
								minDate={startDateState || minStartDate}
								maxDate={maxEndDate}
								formatDate={(date) => date.toLocaleDateString(locale)}
								onSelectDate={(date) => {
									setEndDateState(date)
									onFilterChanged({ startDate: startDateState, endDate: date })
								}}
								allowTextInput
								styles={datePickerStyles}
							/>
							<ActionButton
								iconProps={{ iconName: 'Clear' }}
								styles={actionButtonStyles}
								onClick={() => {
									setStartDateState(null)
									setEndDateState(null)
									onFilterChanged({ startDate: null, endDate: null })
								}}
							>
								{t('customFilters.clearFilter')}
							</ActionButton>
						</div>
					</Callout>
				) : null}
			</>
		)
	}
)
