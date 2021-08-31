import React from 'react';
import type { AnswerObject } from "../pages/quiz";

type Props = {
    question: string,
    answers: string[],
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void,
    userAnswer: AnswerObject | undefined,
    questionNum: number,
    totalQuestions: number
  };

const QuestionCard: React.FC<Props> = ({question, answers, callback, userAnswer, questionNum, totalQuestions}) => {
    
    return (
        <div>
            <h1>Quiz</h1>
            <h2>Question {questionNum}/{totalQuestions}</h2>
            <p className="question" dangerouslySetInnerHTML={{__html: question}}></p>
            <div className="answerGrid">
                {
                    answers.map((ans,i) => (
                        <div key={i}>
                            <button className="choice category"
                            value={ans}
                            disabled={userAnswer ? true : false}
                            onClick={callback}
                            dangerouslySetInnerHTML={{__html: ans}}
                            >
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default QuestionCard;
