import { writable } from "svelte/store";

interface Configuration<T> {
  defaultVal: T;
  toCache: (data: T) => string;
  fromCache: (cached: string) => T;
  key: string;
  debounce?: number;
}

declare let localStorage: Storage;

export function writableCached<T>({
  defaultVal,
  key,
  toCache,
  fromCache,
  debounce = 500,
}: Configuration<T>) {
  let init = fromCache(localStorage.getItem(key));
  init = init || defaultVal;
  const { set, subscribe, update } = writable<T>(defaultVal);
  let timeout = null;
  let currentValue: T = init;

  const debounceAction = (fn) => {
    clearTimeout(timeout);
    timeout = setTimeout(fn, debounce);
  };

  set(init);

  const saveValueToCache = (value) => {
    localStorage.setItem(key, toCache(value));
  };

  return {
    set(val: T) {
      debounceAction(() => {
        set(val);
        saveValueToCache(val);
      });
    },
    update: (fn: (val: T) => T) => {
      debounceAction(() => {
        update(fn);
        saveValueToCache(fn(currentValue));
      });
    },
    subscribe(subscriber, invalidator) {
      return subscribe((value) => {
        subscriber(value, invalidator);
        currentValue = value;
      });
    },
  };
}
