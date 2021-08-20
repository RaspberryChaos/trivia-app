import React, { useState } from 'react';
import type { NextPage } from 'next';
import Link from "next/link";
import QuestionCard from "../components/QuestionCard";
import CategoryList from "../components/CategoryList";
import { fetchQuestions } from "./api/triviaAPI";
import { Difficulty} from "./api/triviaAPI";

const totalQuestions = 10;

const questions: NextPage = () => {

    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [number, setNumber] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(true);


    console.log(fetchQuestions(totalQuestions, Difficulty.Medium));

    const chooseCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;
        if (target) setCategory(target.value);
        console.log("clicked");
    }

    const getQuestions = async () => {
        
    }

    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

    }

    const nextQuestion = () => {

    }

    return (
        <div>
            <h1>Quiz</h1>
            <h2>Category : {category}</h2>
            <CategoryList chooseCategory={chooseCategory} />
            <button onClick={getQuestions}>Start Quiz</button>
            <p>Score: {score}</p>
            <p>Loading Questions...</p>
            {/* <QuestionCard 
            question={questions[number].question}
            answers={questions[number].answers}
            callback={checkAnswer}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            questionNum={number+1}
            totalQuestions={totalQuestions}
            /> */}
            <button onClick={nextQuestion}>Next Question</button>
            <Link href="/" passHref>Go Back</Link>
        </div>
    )
}

export default questions;
