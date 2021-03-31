import {writable} from 'svelte/store';
import Cookies from 'js-cookie';

interface Configuration<T> {
    defaultVal: T,
    toCache: (data: T) => string,
    fromCache: (cached: string) => T,
    key: string,
    debounce?: number
}

export function writableCached<T>({defaultVal, key, toCache, fromCache, debounce = 500 }: Configuration<T>) {
    let init = fromCache(Cookies.get(key))
    init = init || defaultVal;
    console.log(Cookies.get(key))
    const {set, subscribe, update} = writable<T>(defaultVal);
    let timeout = null;

    const debounceAction = (fn) => {
        clearTimeout(timeout);
        timeout = setTimeout(fn, debounce);
    }

    let skip = true

    set(init);

    return {
        set(val: T) {
            console.log("SET", val)
            debounceAction(() => {
                set(val)
            });
        },
        update: (fn: (val:T) => T) => {
            debounceAction(() => {
                update(fn);
            })
        },
        subscribe(subscriber, invalidator) {
            return subscribe((value) => {
                subscriber(value, invalidator);
                Cookies.set(key, toCache(value));

            })
        }
    }
}