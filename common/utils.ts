export function clone<T>(d: T): T {
	return JSON.parse(JSON.stringify(d));
}

/**
 * Returns `n` as long as it is a number, else returns `def`.
 */
export function numOr(n: number, def: number) {
	// it doesn't work to do `num || defaultValue` with numbers
	//   (sice n could be 0)
	if (n === null) return def;
	if (Number.isNaN(n)) return def;
	if (typeof n !== 'number') return def;
	return n;
}
