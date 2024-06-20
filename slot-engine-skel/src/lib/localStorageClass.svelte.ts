import { browser } from '$app/environment';

export class LocalStorage<T> {
	key = '';
	value = $state<T>() as T;

	constructor(key: string, value: T) {
		this.key = key;
		this.value = value;

		if (browser) {
			const item = localStorage.getItem(key);
			if (item) {
				this.value = this.deserialize(item);
			}
		}

		$effect(() => {
			localStorage.setItem(this.key, this.serialize(this.value));
		});
	}

	serialize(value: T) {
		return JSON.stringify(value);
	}

	deserialize(value: string) {
		return JSON.parse(value);
	}
}
