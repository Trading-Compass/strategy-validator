// Strategies
export { crossUpStrategy } from './src/crossUpStrategy'
export { crossDownStrategy } from './src/crossDownStrategy'
export {
	closeUnderStrategy,
	closeUnderTargetPriceStrategy,
	percentageLowerThanTargetPriceStrategy,
	percentageLowerThanPreviousPriceStrategy,
} from './src/closeUnderStrategy'
export {
	closeUpperStrategy,
	closeUpperTargetPriceStrategy,
	percentageHigherThanTargetPriceStrategy,
	percentageHigherThanPreviousPriceStrategy,
} from './src/closeUpperStrategy'

// Utils
export { _ema, _sma, _bb } from './src/libUtils'
