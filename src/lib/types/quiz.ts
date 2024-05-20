export enum QuizType {
    PilihanGanda,
    IsianSingkat
}

export class Quiz {
    title: string
    type: QuizType
    constructor(title: string, type: QuizType) {
        this.title = title
        this.type = type
    }
}

export class PilihanGanda extends Quiz {
    correct: string
    optionOne: string
    optionTwo: string
    optionThree: string
    optionFour: string
    constructor(title: string, correct: string, optionsOne: string, optionsTwo: string, optionsThree: string, optionsFour: string) {
        super(title, QuizType.PilihanGanda);
        this.correct = correct;
        this.optionOne = optionsOne;
        this.optionTwo = optionsTwo;
        this.optionThree = optionsThree;
        this.optionFour = optionsFour;
    }
}

export class IsianSingkat extends Quiz {
    correct: string
    constructor(title: string, correct: string) {
        super(title, QuizType.IsianSingkat)
        this.correct = correct
    }
}

