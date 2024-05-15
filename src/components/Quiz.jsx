import { useCallback, useState } from "react";
import QUESTIONS from "../questions";

import Questions from "../components/Question";
import Summary from "./Summary";

const Quiz = () => {
  const [userAnswers, setuUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback((selectedAnswer) => {
    setuUserAnswers((prevState) => {
        return [
            ...prevState,
            selectedAnswer 
        ]
    });
  }, []);

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

  if(quizIsComplete) {
    return (
        <Summary userAnswers={userAnswers} />
    )
  }

  return (
    <div id="quiz">
        <Questions
            key={activeQuestionIndex}
            index={activeQuestionIndex}
            onSelectAnswer={handleSelectAnswer}
            onSkipAnswer={handleSkipAnswer}
        />
    </div>
  )
}

export default Quiz