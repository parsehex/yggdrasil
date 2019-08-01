import _editorDelegate from 'delegate';
import lookupData from 'game/data/lookup';
import draw from 'draw';
import { getFreeID } from 'id-service';
import data from 'game/data';
import updateActiveTab from 'update-tab';
import remove from 'data/remove';
import editorElements from 'editor-elements';

export default function initImagesTabEvents() {
	// create image
	_editorDelegate('#images-tab button.create', 'click', () => {
		const imgId = getFreeID('images');
		data.images.push({
			id: imgId,
			name: 'New Image',
			filename: '',
		});
		updateActiveTab();
	});

	// delete image
	_editorDelegate('#images-tab .list button.delete', 'click', (e, t: HTMLButtonElement) => {
		const imgId = +t.dataset.id;
		remove.image(imgId);
		draw();
	});

	// change image name
	_editorDelegate('#images-tab .list input.name', 'input', (e, t: HTMLInputElement) => {
		const id = +t.dataset.id;
		const img = lookupData.image(id);
		img.name = t.value;
		draw();
	});

	// change image file
	_editorDelegate('#images-tab .list select.image-file', 'change', (e, t: HTMLSelectElement) => {
		const imgId = +t.dataset.id;
		const img = lookupData.image(imgId);
		img.filename = t.value;
		draw();
	});

	// change preview image
	_editorDelegate('#images-tab select#image-file-preview-select', 'change', (e, t: HTMLSelectElement) => {
		let val = t.value;
		if (val === 'None') {
			val = '';
		} else {
			val = '/assets/images/' + val;
		}
		editorElements.imagesTab.previewImage.src = val;
	});

	// upload image
	_editorDelegate('#images-tab #upload button.submit', 'click', async () => {
		if (editorElements.imagesTab.fileInput.files.length === 0) {
			uploadError();
			return;
		}

		const file = editorElements.imagesTab.fileInput.files[0];
		let fileName = editorElements.imagesTab.uploadFileName.value;
		if (!fileName) fileName = file.name;

		const url = '/api/upload-image?filename=' + fileName;

		const r = await fetch(url, {
			method: 'POST',
			body: file.slice(),
		});
		if (r.status !== 200) {
			console.log(r);
			uploadError();
		} else {
			uploadSuccess();
		}
		updateActiveTab();
	});

	function uploadError() {
		// TODO not very descriptive
		editorElements.imagesTab.uploadButton.classList.add('error');
		editorElements.imagesTab.uploadButton.disabled = true;

		setTimeout(() => {
			editorElements.imagesTab.uploadButton.classList.remove('error');
			editorElements.imagesTab.uploadButton.disabled = false;
		}, 1500);
	}
	function uploadSuccess() {
		editorElements.imagesTab.uploadButton.classList.add('success');
		editorElements.imagesTab.uploadButton.disabled = true;

		setTimeout(() => {
			editorElements.imagesTab.uploadButton.classList.remove('success');
			editorElements.imagesTab.uploadButton.disabled = false;
		}, 1500);
	}
}
