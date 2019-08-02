import data from 'game/data';
import gameState from 'game/state';
import lookupData from 'game/data/lookup';
import _editorDelegate from 'delegate';
import draw from 'draw';
import remove from 'data/remove';
import { getFreeID } from 'id-service';

export function initDialogueTabEvents() {
	// update dialogue
	_editorDelegate('textarea#dialogue', 'input', (e, t: HTMLTextAreaElement) => {
		const d = lookupData.dialogue(gameState.currentDialogueID);
		d.text = t.value;
		draw();
	});

	// update choice
	_editorDelegate('div#choices .choice', 'input', (e, t: HTMLTextAreaElement) => {
		const id = +t.dataset.id;
		const c = lookupData.choice(id);
		c.text = t.value;
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
		const d = lookupData.dialogue(gameState.currentDialogueID);
		d.choices.push(id);
		draw();
	});

	// delete choice
	_editorDelegate('#choices button.delete', 'click', (e, t) => {
		const id = +t.dataset.id;
		remove.choice(id);
		draw();
	});

	// create dialogue from choice
	_editorDelegate('#choices button.create-dialogue', 'click', (e, t) => {
		const d = lookupData.dialogue(gameState.currentDialogueID);
		const choiceId = +t.dataset.id;
		const choice = lookupData.choice(choiceId);
		const dialogueId = getFreeID('dialogue');
		data.dialogue.push({
			id: dialogueId,
			text: 'Dialogue text',
			choices: [],
			// use same background and character by default
			backgroundID: d.backgroundID,
			characterID: d.characterID,
		});
		choice.targetDialogueID = dialogueId;
		draw();
	});

	// change dialogue character
	_editorDelegate('select#character', 'click', (e, t: HTMLSelectElement) => {
		const charId = +t.value;
		const d = lookupData.dialogue(gameState.currentDialogueID);
		d.characterID = charId;
		draw();
	});

	// change dialogue background
	_editorDelegate('select#background', 'click', (e, t: HTMLSelectElement) => {
		const bgId = +t.value;
		const d = lookupData.dialogue(gameState.currentDialogueID);
		d.backgroundID = bgId;
		draw();
	});
}