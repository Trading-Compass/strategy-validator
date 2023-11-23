import { Indicators } from './enums'
import { _ema, _crossDown, _sma } from './libUtils'

export const crossDownStrategy = (
	typeIndicator: Indicators,
	lineAPeriod: number,
	lineBPeriod: number,
	values: number[],
): {
	type: Indicators
	result: boolean
	recentValues: Record<string, number[]>
} => {
	switch (typeIndicator) {
		case Indicators.EMA: {
			const lineA = _ema(lineAPeriod, values)
			const lineB = _ema(lineBPeriod, values)

			const result = lineA.at(-2) >= lineB.at(-2) && lineA.at(-1) < lineB.at(-1)
			const recentValues = {}
			recentValues[`${lineAPeriod}`] = lineA.slice(-3)
			recentValues[`${lineBPeriod}`] = lineB.slice(-3)

			return {
				type: typeIndicator,
				result,
				recentValues,
			}
		}
		case Indicators.SMA: {
			const lineA = _sma(lineAPeriod, values)
			const lineB = _sma(lineBPeriod, values)

			const result = lineA.at(-2) >= lineB.at(-2) && lineA.at(-1) < lineB.at(-1)
			const recentValues = {}
			recentValues[`${lineAPeriod}`] = lineA.slice(-3)
			recentValues[`${lineBPeriod}`] = lineB.slice(-3)

			return {
				type: typeIndicator,
				result,
				recentValues,
			}
		}
		default: {
			const recentValues = {}
			recentValues[`${lineAPeriod}`] = []
			recentValues[`${lineBPeriod}`] = []

			return {
				type: typeIndicator,
				result: false,
				recentValues,
			}
		}
	}
}
