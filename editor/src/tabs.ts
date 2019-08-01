import _editorDelegate from 'delegate';
import updateActiveTab from 'update-tab';

const tabsListContainer = document.getElementById('tabs-list');

export function initTabs() {
	_editorDelegate('#tabs-list span.link', 'click', (e, t: HTMLButtonElement) => {
		// deactivate last tab
		document.querySelector('.tab.active').classList.remove('active');
		tabsListContainer.querySelector('.active').classList.remove('active');

		const tabId = t.dataset.target + '-tab';
		const tab = document.getElementById(tabId);
		tab.classList.add('active');
		t.classList.add('active');

		updateActiveTab();
	});
}
