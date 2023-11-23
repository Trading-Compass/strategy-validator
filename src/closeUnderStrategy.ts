import { Indicators } from './enums'
import { _ema, _sma } from './libUtils'

export const closeUnderStrategy = (
	typeIndicator: Indicators,
	period: number,
	values: number[],
): {
	type?: Indicators
	result: boolean
	recentValues?: {
		indicatorValue: number
		price: number
	}
} => {
	switch (typeIndicator) {
		case Indicators.EMA: {
			const lineEMA = _ema(period, values)

			const isPriceCloseUpper = lineEMA?.at?.(-2) <= values.at(-2) && lineEMA.at(-1) > values.at(-1)

			if (isPriceCloseUpper) {
				return {
					type: typeIndicator,
					result: true,
					recentValues: {
						indicatorValue: lineEMA.at(-1),
						price: values.at(-1),
					},
				}
			}

			return { result: false }
		}
		case Indicators.SMA: {
			const lineSMA = _sma(period, values)
			const isPriceCloseUpper = lineSMA.at(-2) <= values.at(-2) && lineSMA.at(-1) > values.at(-1)

			if (isPriceCloseUpper) {
				return {
					type: typeIndicator,
					result: true,
					recentValues: {
						indicatorValue: lineSMA.at(-1),
						price: values.at(-1),
					},
				}
			}

			return { result: false }
		}
		default: {
			return { result: false }
		}
	}
}

export const closeUnderTargetPriceStrategy = (
	targetPrice: number,
	values: number[],
): {
	result: boolean
	recentValues?: {
		targetPrice: number
		price: number
	}
} => {
	return {
		result: values.at(-2) >= targetPrice && values.at(-1) < targetPrice,
		recentValues: {
			targetPrice,
			price: values.at(-1),
		},
	}
}

export const percentageLowerThanTargetPriceStrategy = (
	targetPrice: number,
	percentage: number,
	values: number[],
): {
	result: boolean
	recentValues?: {
		targetPrice: number
		price: number
		percentage: number
	}
} => {
	const priceToCompare = targetPrice * (1 - percentage)
	return {
		result: values.at(-2) >= priceToCompare && values.at(-1) < priceToCompare,
		recentValues: {
			targetPrice,
			price: values.at(-1),
			percentage,
		},
	}
}

export const percentageLowerThanPreviousPriceStrategy = (
	percentage: number,
	values: number[],
): {
	result: boolean
	recentValues?: {
		previousPrice: number
		latestPrice: number
		percentage: number
	}
} => {
	const priceToCompare = values.at(-2) * (1 - percentage)
	return {
		result: values.at(-1) < priceToCompare,
		recentValues: {
			previousPrice: values.at(-2),
			latestPrice: values.at(-1),
			percentage,
		},
	}
}
