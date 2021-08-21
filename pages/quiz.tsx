import React, { useState } from 'react';
import type { NextPage } from 'next';
import Link from "next/link";
import QuestionCard from "../components/QuestionCard";
import CategoryList from "../components/CategoryList";
import { fetchQuestions } from "./api/triviaAPI";
import { QuestionState, Difficulty} from "./api/triviaAPI";

export type AnswerObject = {
    question: string,
    answer: string,
    correct: boolean,
    correctAnswer: string
}

const totalQuestions = 10;

const questions: NextPage = () => {

    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<QuestionState[]>([]);
    const [number, setNumber] = useState(0);
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(true);


    const chooseCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;
        if (target) setCategory(target.value);
        console.log("clicked");
    }

    const startQuiz = async () => {
        setLoading(true);
        setGameOver(false);
        const newQuestions = await fetchQuestions(totalQuestions, Difficulty.Medium);
        setQuestions(newQuestions);
        console.log("nq", newQuestions)
        setScore(0);
        setUserAnswers([]);
        setNumber(0);
        setLoading(false);
    }

    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

        const target = e.target as HTMLButtonElement;
        const userAnswer = target.value;
        const correct = userAnswer === questions[number].correct_answer;
        
        if(correct) {
            console.log("correct!")
            setScore(previousScore => previousScore + 10);
        } else {
            console.log("wrong")
        }

        //Save answer to array
        const answerObject = {
            question: questions[number].question,
            answer: userAnswer,
            correct: correct,
            correctAnswer: questions[number].correct_answer,
        }
        
        setUserAnswers((prev) => [...prev, answerObject]);
        console.log("ao", answerObject)
        console.log(userAnswers);
    }

    const nextQuestion = () => {
        //Check not last question
        if(number < totalQuestions - 1) {
            setNumber(prev => prev +1);
        }
    }

    return (
        <div>
            <h1>Quiz</h1>
            <h2>Category : {category}</h2>
            {gameOver && <CategoryList chooseCategory={chooseCategory} />}
            {gameOver || userAnswers.length === totalQuestions ?
            <button onClick={startQuiz}>Start Quiz</button> : null }
            {!gameOver && <p>Score: {score}</p>}
            {loading && <p>Loading Questions...</p>}
            {!loading && !gameOver &&  
            <QuestionCard 
            question={questions[number].question}
            answers={questions[number].allAnswers}
            callback={checkAnswer}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            questionNum={number+1}
            totalQuestions={totalQuestions}
            /> }
            {!gameOver && !loading && number < totalQuestions -1 && userAnswers.length === number + 1 &&
            <button onClick={nextQuestion}>Next Question</button>}
            <Link href="/" passHref>Go Back</Link>
        </div>
    )
}

export default questions;
