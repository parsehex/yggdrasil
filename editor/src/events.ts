import data from 'game/data';
import gameState from 'game/state';
import lookup from 'game/lookup';
import _editorDelegate from './delegate';
import draw from './draw';
import { goToPrev, goToNext } from './navigation';
import remove from './data/remove';
import { getFreeID } from './id-service';

export function initEditorEvents() {
	// update dialogue
	_editorDelegate('textarea#dialogue', 'change', (e, t: HTMLTextAreaElement) => {
		const d = lookup.dialogue(gameState.currentDialogueID);
		d.text = t.value;
		draw();
	});

	// update choice
	_editorDelegate('div#choices .choice', 'change', (e, t: HTMLTextAreaElement) => {
		const id = +t.dataset.id;
		const c = lookup.choice(id);
		c.text = t.value;
		draw();
	});

	_editorDelegate('button#nav-back', 'click', () => {
		goToPrev();
		draw();
	});
	_editorDelegate('button#nav-next', 'click', () => {
		goToNext();
		draw();
	});

	// add choice (to current dialogue)
	_editorDelegate('#choices button.add', 'click', () => {
		const id = getFreeID('choices');
		data.choices.push({
			id,
			text: 'Choice text',
			targetDialogueID: null,
		});
		const d = lookup.dialogue(gameState.currentDialogueID);
		d.choices.push(id);
		draw();
	});

	// delete choice
	_editorDelegate('#choices button.delete', 'click', (e, t) => {
		const id = +t.dataset.id;
		remove.choice(id);
		draw();
	});
}
