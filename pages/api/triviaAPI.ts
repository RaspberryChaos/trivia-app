export type Question = {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string
}

export type QuestionState = Question & { allAnswers: string[] };

export enum Difficulty {
    Easy = "easy",
    Medium = "medium",
    Hard = "hard"
}

export enum QuestionCategory {
    Geography = 22,
    History = 23,
    Animals = 27,
    Books = 10,
    Film = 11,
    Music = 12
}

const shuffleArray = (array: any[]) => {
   return [...array].sort(() => Math.random() - Math.random());
}

export const fetchQuestions = async (amount: number, category: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
    const data = await(await fetch(endpoint)).json();
    console.log(data);
    return data.results.map((question: Question) => ({
        ...question,
        allAnswers: shuffleArray([...question.incorrect_answers, question.correct_answer])
    }) );
}