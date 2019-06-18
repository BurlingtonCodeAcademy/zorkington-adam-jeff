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
let states = {
	"182main": {
		canChangeTo: ["foyer", "mr.mikes", "muddys"],
		name: "182 Main St.",
		welcomeMessage: `182 Main St. 
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.`,
		dontTakePaper: `That would be selfish. How will other students find their way?`,
		readSign: `The sign says "Welcome to Burlington Code Academy! Come on 
up to the third floor. If the door is locked, use the code
12345."`
	},
	foyer: {
		canChangeTo: ["182main", "classroom"],
		name: "Foyer",
		welcomeMessage: `Success! The door opens. You enter the foyer and the door
shuts behind you.

You are in a foyer. Or maybe it's an antechamber. Or a 
vestibule. Or an entryway. Or an atrium. Or a narthex.
But let's forget all that fancy flatlander vocabulary,
and just call it a foyer. In Vermont, this is pronounced
"FO-ee-yurr". A copy of Seven Days lies in a corner.`,
		readPaper: `You pick up the paper and leaf through it looking for comics 
and ignoring the articles, just like everybody else does.`
	},
	stairs: {
		canChangeTo: ["classroom", "foyer"],
		name: "Stars",
		readPaper: `You pick up the paper and leaf through it looking for comics 
and ignoring the articles, just like everybody else does.`
	},
	"mr.mikes": { canChangeTo: ["182main"] },
	muddys: { canChangeTo: ["182main"] },
	classroom: { canChangeTo: ["stairs"] }
};

let currentState = "182main";

function enterState(newState) {
	let validTransitions = states[currentState].canChangeTo;
	if (validTransitions.includes(newState)) {
		currentState = newState;
	} else {
		throw "Invalid state transition attempted - from " +
			currentState +
			" to " +
			newState;
	}
}

start();
async function start() {
	console.log(states[currentState].welcomeMessage);
	let answer = await ask(">_");
	answer = answer.toLowerCase();
	while (answer !== "exit") {
		if (currentState === "182main") {
			while (currentState === "182main") {
				if (answer === "gargle") {
					console.log("Sorry, I don't know how to gargle.");
					answer = await ask(">_");
					answer = answer.toLowerCase();
				} else if (answer === "read sign") {
					console.log(states[currentState].readSign);
					answer = await ask(">_");
					answer = answer.toLowerCase();
				} else if (answer === "take sign") {
					console.log(states[currentState].dontTakePaper);
					answer = await ask(">_");
					answer = answer.toLowerCase();
				} else if (answer === "enter code 12345") {
					enterState("foyer");
					console.log(states[currentState].welcomeMessage);
					answer = await ask(">_");
					answer = answer.toLowerCase();
				} else {
					console.log('Sorry try again');
					answer = await ask(">_");
					answer = answer.toLowerCase();
				}
			}
		} else if (currentState === "foyer") {
			answer = await ask('>_');
			answer = answer.toLowerCase();
				while (currentState === "foyer") {
					if (answer === "take paper" || answer === "take seven days") {
						console.log(states[currentState].readPaper);
						answer = await ask(">_");
						answer = answer.toLowerCase();
					}
				}
			} else {
				console.log("Bye!");
				process.exit();
			}
		}
	}
