import React, { useState } from 'react';
import type { NextPage } from 'next';
import Link from "next/link";
import Image from 'next/image';
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

const Questions: NextPage = () => {

// State
    const [categoryName, setCategoryName] = useState("Geography");
    const [categoryNum, setCategoryNum] = useState(22);
    const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy);
    const [response, setResponse] = useState<HTMLButtonElement>();
    const [quizState, setQuizState] = useState(1);
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<QuestionState[]>([]);
    const [number, setNumber] = useState(0);
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(true);

//Choose a Category
    const chooseCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;
        if (target) {
            let num = parseInt(target.value);
            let name = target.textContent;

            if(num) setCategoryNum(num);
            if(name) setCategoryName(name);
        }
        setQuizState(2);
    }

//Choose Difficulty
    const chooseDifficulty = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;
        
        const level = target.value === "easy" ? Difficulty.Easy :
                        target.value === "medium" ? Difficulty.Medium : Difficulty.Hard;
        setDifficulty(level);
        setQuizState(3);
    }

//Fetch API data and Start Quiz
    const startQuiz = async () => {
        setLoading(true);
        setGameOver(false);
        const newQuestions = await fetchQuestions(totalQuestions, categoryNum, difficulty);
        setQuestions(newQuestions);
        console.log("nq", newQuestions)
        setScore(0);
        setUserAnswers([]);
        setNumber(0);
        setLoading(false);
        setQuizState(4);
    }

//Check if user response is correct answer
    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

        const target = e.target as HTMLButtonElement;
        const userAnswer = target.value;
        const correct = userAnswer === questions[number].correct_answer;
        
        if(correct) {
            setScore(previousScore => previousScore + 1);
            setResponse(target);
            target.classList.add("correct");
        } else {
            setResponse(target);
            target.classList.add("wrong");
        }

        //Save answer to array
        const answerObject = {
            question: questions[number].question,
            answer: userAnswer,
            correct: correct,
            correctAnswer: questions[number].correct_answer,
        }
        setUserAnswers((prev) => [...prev, answerObject]);
    }

//Display next question
    const nextQuestion = () => {
        //Check not last question
        if(number < totalQuestions - 1) {
            setNumber(prev => prev +1);
        }
        //console.log("res", response);
        if (response) response.classList.contains("correct") ? response.classList.remove("correct") : response.classList.remove("wrong"); 
    }

//Go back to previous screen and change settings
    const goBack = () => {
       if (quizState > 1) {
           setQuizState(prev => prev - 1);
       }
    }

//Reset Quiz when play again button is clicked
    const resetQuiz = () => {
        setQuizState(1);
        setUserAnswers([]);
    }

//Show game over screen and final score
    const seeResults = () => {
        setQuizState(5);
        setGameOver(true);
    }

    return (
        <div className="container">
            
            {/* Display Choice of Category */}
            {quizState === 1 &&
            <CategoryList chooseCategory={chooseCategory} />}

            {/* Display Choice of Difficulty */}
            {quizState === 2 &&
            <DifficultyList chooseDifficulty={chooseDifficulty} />}   
            
            {/* Display Chosen Options and Start Button */}
            {quizState === 3 &&
            <div className="flex settings">
            <h2>Category : {categoryName}</h2>
            <h2>Difficulty : {difficulty}</h2>
            <button onClick={startQuiz} className={styles.btn}>Start Quiz!</button>
            </div>
            }


            {loading && 
            <p>Loading Questions...</p>}
           
           {/* Display Questions */}
            {!loading && !gameOver &&  
            <QuestionCard 
            question={questions[number].question}
            answers={questions[number].allAnswers}
            callback={checkAnswer}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            questionNum={number+1}
            totalQuestions={totalQuestions}
            /> }

            {/* Display Score */}
            {!gameOver && userAnswers.length < totalQuestions &&
            <h2>Score: {score}</h2>}

            {/* Display Nest Question Button */}
            {!gameOver && !loading && number < totalQuestions -1 && userAnswers.length === number + 1 &&
            <button onClick={nextQuestion} className={styles.btn}>Next Question</button>}

            {/* Display Game Over Screen */}
            {!gameOver && !loading && userAnswers.length === totalQuestions &&
            <button onClick={seeResults} className={styles.btn}>See Results!</button>}

            {/* Display Play Again Button at the end of the game */}
            {quizState === 5 && userAnswers.length === totalQuestions &&
            <div className={styles.gameOver}>
                <h1>Game Over! You answered {score}/{totalQuestions} questions correctly!</h1>
                <button onClick={resetQuiz} className={styles.btn}>Play Again?</button>
            </div>
            }

            {/* Go Back and change category/difficulty before starting game */}
            {quizState > 1 && quizState < 4 &&
            <button onClick={goBack} className={styles.btn}>Go Back</button>}
            
            {/* Return to Homepage */}
            <Link href="/" passHref>
                <div className={styles.imageContainer}>
                <Image src={"/home-icon.png"}
                width={10}
                height={10}
                layout="responsive"
                alt={"Home Icon"}
                />
                </div>
            </Link>

        </div>
    )
}

export default Questions;
