import React, { useState } from 'react';
import type { NextPage } from 'next';
import Link from "next/link";
import QuestionCard from "../components/QuestionCard";
import CategoryList from "../components/CategoryList";
import DifficultyList from "../components/DifficultyList";
import { fetchQuestions } from "./api/triviaAPI";
import { QuestionState, Difficulty} from "./api/triviaAPI";
import styles from "../styles/Quiz.module.css";

export type AnswerObject = {
    question: string,
    answer: string,
    correct: boolean,
    correctAnswer: string
}

const totalQuestions = 10;

const questions: NextPage = () => {

    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy);
    const [quizState, setQuizState] = useState(1);
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
        setQuizState(2);
    }

    const chooseDifficulty = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;
        //if (target) setDifficulty(target.value);
        console.log("difficulty clicked");
        console.log(target.value);
        const level = target.value === "easy" ? Difficulty.Easy :
                        target.value === "medium" ? Difficulty.Medium : Difficulty.Hard;
        setDifficulty(level);
        console.log("dif", difficulty);
        setQuizState(3);
    }

    const startQuiz = async () => {
        setLoading(true);
        setGameOver(false);
        const newQuestions = await fetchQuestions(totalQuestions, 23, difficulty);
        setQuestions(newQuestions);
        console.log("nq", newQuestions)
        setScore(0);
        setUserAnswers([]);
        setNumber(0);
        setLoading(false);
        setQuizState(4);
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

    const goBack = () => {
       if (quizState > 1) {
           setQuizState(prev => prev - 1);
       }
    }

    return (
        <div className="container">
            <h1>Quiz</h1>
            
            {quizState === 1 &&
            <CategoryList chooseCategory={chooseCategory} />}

            {quizState === 2 &&
            <DifficultyList chooseDifficulty={chooseDifficulty} />}   
            
            {quizState === 3 &&
            <div>
            <h2>Category : {category}</h2>
            <h2>Difficulty : {difficulty}</h2>
            <button onClick={startQuiz} className={styles.startBtn}>Start Quiz!</button>
            </div>
            }


            {loading && 
            <p>Loading Questions...</p>}
           
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

            {!gameOver && 
            <p>Score: {score}</p>}

            {quizState > 1 && quizState < 4 &&
            <button onClick={goBack}>Go Back</button>}
            <Link href="/" passHref>Home</Link>
        </div>
    )
}

export default questions;
