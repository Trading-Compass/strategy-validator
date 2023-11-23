import { ema, sma, bollingerbands, crossUp, crossDown } from 'technicalindicators'

export const _crossUp = (lineA: number[], lineB: number[]): boolean[] => {
	return crossUp({ lineA, lineB })
}

export const _crossDown = (lineA: number[], lineB: number[]): boolean[] => {
	return crossDown({ lineA, lineB })
}

export const _ema = (period: number, values: number[]): number[] => {
	return ema({ period, values })
}

export const _sma = (period: number, values: number[]): number[] => {
	return sma({ period, values })
}

export const _bb = ({
	period,
	stdDev,
	values,
}: {
	period: number
	stdDev: number
	values: number[]
}): { middle: number; upper: number; lower: number; pb: number }[] => {
	return bollingerbands({ period, stdDev, values })
}
