import {isValid, format} from 'date-fns'
import { writableCached } from './cached-writable';
import { debounceReadable } from './debounced-readable';

const defaultDate = new Date(1990, 6, 6);
export const birthDate = writableCached<Date>({
	key: 'birthDate',
	defaultVal: defaultDate,
	fromCache: (str) => {
		const date = new Date(str);
		if(isValid(date)) {
			return date;
		}
		return defaultDate;
	},
	toCache: (date: Date) => {
		return format(date, "yyyy-MM-dd");
	},
	debounce: 0
});

const defaultExpectancy = 60;
export const expectancy = writableCached<number>({
	key: 'lifeExpectancy',
	defaultVal: defaultExpectancy,
	fromCache: (str) => Number(str) || defaultExpectancy,
	toCache: (val) => String(val)
});
