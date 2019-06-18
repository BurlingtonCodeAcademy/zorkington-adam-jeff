const readline = require("readline");
const readlineInterface = readline.createInterface(
	process.stdin,
	process.stdout
);

function ask(questionText) {
	return new Promise((resolve, reject) => {
		readlineInterface.question(questionText, resolve);
	});
}

// remember the StateMachine lecture
// https://bootcamp.burlingtoncodeacademy.com/lessons/cs/state-machines
let states = { // I'm sure I need functions inside this for change the inventory of the room?
	"182main": {
		canChangeTo: ["foyer", "mr.mikes", "muddys"],
		name: "182 Main St.",
		welcomeMessage: `
182 Main St. 
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.

`
	},
	"foyer": {
		canChangeTo: ["182main", "stairs"],
		name: "Foyer",
		welcomeMessage: `
You are in a foyer. Or maybe it's an antechamber. Or a 
vestibule. Or an entryway. Or an atrium. Or a narthex.
But let's forget all that fancy flatlander vocabulary,
and just call it a foyer. In Vermont, this is pronounced
"FO-ee-yurr".

A copy of Seven Days lies in a corner.

`,
		readPaper: `
You pick up the paper and leaf through it looking for comics 
and ignoring the articles, just like everybody else does.

`,
		takePaper: `
You are carrying:
A copy of Seven Days, Vermont's Alt-Weekly

`,
		dropPaper: `
Paper has been dropped.

`
	},
	"stairs": { canChangeTo: ["classroom", "foyer"], name: "Stars" },
	"mr.mikes": { canChangeTo: ["182main"] },
	"muddys": { canChangeTo: ["182main"] },
	"classroom": { canChangeTo: ["stairs"] }
};

/*let character = { Character Object. Still not sure exactly how I want to implement.
	"inventory": {

	},
	"name": 'agent Z',
	"appetite": {},

}*/ 

let currentState = "182main";

function enterState(newState) {//  State Machine for room transition rules. 
let validTransitions = states[currentState].canChangeTo; //Do I need another seperate function for inventory?
	if (validTransitions.includes(newState)) {
		currentState = newState;
	} else {
		throw "Invalid state transition attempted - from " +
			currentState +
			" to " +
			newState;
	}
}

function checkPinCode(code) {
	code = answer.includes("enter code", 0);
	if (code === "true") {
		console.log("Please enter code now!");
	} else {
		console.log("Try again");
	}
}

start();

async function start() {                  // This whole loop is controlling the story depending on things typed.
	console.log(states[currentState].welcomeMessage);
	let answer = await ask(">_");
	answer = answer.toLowerCase();
	while (answer !== "exit") {
		if (answer === "gargle") {
			console.log("Sorry, I don't know how to gargle.");
			answer = await ask(">_");
			answer = answer.toLowerCase();
		} else if (answer === "read sign") {
			console.log(
				'The sign says "Welcome to Burlington Code Academy! Come on\nup to the third floor. If the door is locked, use the code\n12345."'
			);
			answer = await ask(">_");
			answer = answer.toLowerCase();
		} else if (answer === "take sign") {
			console.log(
				"That would be selfish. How will other students find their way?"
			);
			answer = await ask(">_");
			answer = answer.toLowerCase();
		} else if (answer === "enter code 12345") {
			enterState("foyer");
			console.log(states[currentState].welcomeMessage);
		} else if (
			(answer === "take paper" && currentState === "foyer") ||
			(answer === "take seven days " && currentState === "foyer")
		) {
			console.log(states[currentState].readPaper);
			answer = await ask(">_");
			answer = answer.toLowerCase();
		} else if (
			(answer === "take inventory" && currentState === "foyer") ||
			(answer === "i" && currentState === "foyer") ||
			(answer === "inventory" && currentState === "foyer")
		) {
			console.log(states[currentState].takePaper);
			answer = await ask(">_");
			answer = answer.toLowerCase();
		} else if (
			(answer === "drop paper" && currentState === "foyer") ||
			(answer === "drop seven days" && currentState === "foyer")
		) {
			console.log(states[currentState].dropPaper);
			answer = await ask(">_");
			answer = answer.toLowerCase();
		} else if (answer === "go upstairs" || answer === "go up") {
			enterState("stairs");
			console.log("I'm going up these dang stairs");
			answer = await ask(">_");
			answer = answer.toLowerCase();
		} else {
			console.log("Bye!");
			process.exit();
		}
		answer = await ask(">_");
		answer = answer.toLowerCase();
	}
}
