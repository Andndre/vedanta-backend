export enum QuizType {
	PilihanGanda = 'pilgan',
	IsianSingkat = 'isian',
	SimakAudio = 'simakaudio',
	CocokGambar = 'cocokgambar'
}

export class Quiz {
	title: string;
	type: QuizType;
	constructor(title: string, type: QuizType) {
		this.title = title;
		this.type = type;
	}
}

export class PilihanGanda extends Quiz {
	correct: string;
	optionOne: string;
	optionTwo: string;
	optionThree: string;
	optionFour: string;
	constructor(
		title: string,
		correct: string,
		optionsOne: string,
		optionsTwo: string,
		optionsThree: string,
		optionsFour: string
	) {
		super(title, QuizType.PilihanGanda);
		this.correct = correct;
		this.optionOne = optionsOne;
		this.optionTwo = optionsTwo;
		this.optionThree = optionsThree;
		this.optionFour = optionsFour;
	}
}

export class IsianSingkat extends Quiz {
	correct: string;
	constructor(title: string, correct: string) {
		super(title, QuizType.IsianSingkat);
		this.correct = correct;
	}
}

export class SimakAudio extends Quiz {
	correct: string;
	audioUrl: string;
	optionOne: string;
	optionTwo: string;
	optionThree: string;
	optionFour: string;
	constructor(
		title: string,
		correct: string,
		audioUrl: string,
		optionOne: string,
		optionTwo: string,
		optionThree: string,
		optionFour: string
	) {
		super(title, QuizType.SimakAudio);
		this.correct = correct;
		this.audioUrl = audioUrl;
		this.optionOne = optionOne;
		this.optionTwo = optionTwo;
		this.optionThree = optionThree;
		this.optionFour = optionFour;
	}
}

export class CocokGambar extends Quiz {
	correct: string;
	optionOne: string;
	optionTwo: string;
	optionThree: string;
	optionFour: string;
	constructor(
		title: string,
		correct: string,
		optionOne: string,
		optionTwo: string,
		optionThree: string,
		optionFour: string
	) {
		super(title, QuizType.CocokGambar);
		this.correct = correct;
		this.optionOne = optionOne;
		this.optionTwo = optionTwo;
		this.optionThree = optionThree;
		this.optionFour = optionFour;
	}
}
