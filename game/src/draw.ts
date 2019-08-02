import state from './state';
import lookupData from './data/lookup';
import elements from './elements';

/** Draws whatever the current state is */
export default function drawScene() {
	const dia = lookupData.dialogue(state.currentDialogueID);
	const char = lookupData.character(dia.characterID);
	const bg = lookupData.background(dia.backgroundID);

	const bgImg = lookupData.image(bg.imageID);
	elements.bg.style.backgroundImage = `url(/assets/images/${bgImg.filename})`;
	elements.bg.style.backgroundColor = bg.bgColor;

	const charImg = lookupData.image(char.imageID);
	elements.charImg.style.backgroundImage = `url(/assets/images/${charImg.filename})`;
	elements.charName.textContent = char.name;
	elements.dialogueText.textContent = dia.text;

	resetChoices();
	let allHidden = true;
	for (let i = 0; i < dia.choices.length; i++) {
		const choiceID = dia.choices[i];
		const c = lookupData.choice(choiceID);
		addChoice(c.text, choiceID);
		if (c.text.length > 0) allHidden = false;
	}

	// if all choices are hidden then show a "continue" indicator
	if (allHidden) {
		if (dia.choices.length > 1) {
			throw new Error(`All ${dia.choices.length} dialogue choices are hidden`);
		}
		elements.continueInd.classList.remove('hidden');
	} else {
		elements.continueInd.classList.add('hidden');
	}
}

function resetChoices() {
	elements.choicesDiv.innerHTML = '';
}

function addChoice(text: string, id: number) {
	const btn = document.createElement('button');
	btn.className = 'choice';
	btn.type = 'button';
	btn.textContent = text;
	btn.dataset.id = id.toString();
	if (text.length === 0) {
		// for convenience, just hide blank choices
		// (maybe there's a reason they're blank)
		btn.classList.add('hidden');
	}

	elements.choicesDiv.append(btn);
}
