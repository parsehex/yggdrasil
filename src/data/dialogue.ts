import { Dialogue } from '../types';

const dialogue: Dialogue[] = [
	{
		character: 'Green Man',
		image: 'room',
		text: "Hi, how are you?",
		choices: [
			0,
			1,
			2,
			3,
		],
	},
	{
		character: 'Green Man',
		text: "I don't really have anything else to say to you.",
		choices: [],
	},
	{
		character: 'Green Man',
		text: "What does \"ambivalent\" mean?",
		choices: [
			4,
			5,
		],
	},
	{
		character: 'Green Man',
		text: "Huh.",
		choices: [],
	},
];

export default dialogue;
