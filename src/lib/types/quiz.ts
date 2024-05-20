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
    options: string[]
    constructor(title: string, correct: string, options: string[]) {
        super(title, QuizType.PilihanGanda);
        this.correct = correct;
        this.options = options;
    }
}

export class IsianSingkat extends Quiz {
    correct: string
    constructor(title: string, correct: string) {
        super(title, QuizType.IsianSingkat)
        this.correct = correct
    }
}

