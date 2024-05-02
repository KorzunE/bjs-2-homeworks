function cachingDecoratorNew(func) {
	let cache = [];

	function wrapper(...args) {
		const hash = md5(JSON.stringify(args));
		let objectInCache = cache.find(item => item.hash === hash);
		if (objectInCache) {
			console.log("Из кеша: " + objectInCache.value, cache);
			return "Из кеша: " + objectInCache.value;
		}
		let result = func(...args);
		cache.push({
			hash: hash,
			value: result
		});
		if (cache.length > 5) {
			cache.shift();
		}
		console.log("Вычисляем: " + result, cache);
		return "Вычисляем: " + result;
	}
	return wrapper;
}

function debounceDecoratorNew(func, delay) {
	let timeoutId;
	let hasCalled = false;

	function wrapper(...args) {
		if (!hasCalled) {
			func(...args);
			wrapper.count++;
			hasCalled = true;
		}
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			func(args);
			wrapper.count++;
		}, delay);
		wrapper.allCount++;
	}
	wrapper.count = 0;
	wrapper.allCount = 0;
	return wrapper;
}