import React from 'react';

type Props = {
    question: string,
    answers: string[],
    callback: any,
    userAnswer: any,
    questionNum: number,
    totalQuestions: number
  };

const QuestionCard: React.FC<Props> = ({question, answers, callback, userAnswer, questionNum, totalQuestions}) => {
    return (
        <div>
            <h1>Quiz</h1>
            <p>Question {questionNum}/{totalQuestions}</p>
            <p>{question}</p>
            <div>
                {
                    answers.map((ans,i) => (
                        <div key={i}>
                            <button
                            value={ans}
                            disabled={userAnswer}
                            onClick={callback}
                            >
                            {ans}  
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default QuestionCard;
