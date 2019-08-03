import data from 'game/data';
import loadData from 'game/data/load';

export default async function _editorLoadData() {
	const keys = Object.keys(data);
	let loadedData: any = {};

	let broken = false;
	for (const k of keys) {
		const v = localStorage.getItem('editor-' + k);
		if (!v) broken = true;
		loadedData[k] = JSON.parse(v);
	}

	// server runs on 80 now (reverse proxy)
	const devMode = location.href.includes('8080');
	if (broken || devMode) {
		console.log('Allowing game to load data...');
		await loadData();
	} else {
		Object.assign(data, loadedData);
		console.log('Loaded data from local storage.');
	}
	console.log('Game data:', data);
	(<any>window).data = data;
}
