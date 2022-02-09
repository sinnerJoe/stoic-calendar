import {readable, Writable} from 'svelte/store';

export function debounceReadable<T>(store: Writable<T>, startVal: T, timeout = 500) {
    return readable<T>(startVal, (set) => {
	let timeout = null;
	const unsubscribe = store.subscribe(value => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			set(value)
			timeout = null;
		}, 500);
	});

	return unsubscribe;
});

}