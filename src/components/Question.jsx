import { useState } from "react"
import Answers from "./Answers"
import QuestionTimer from "./QuestionTimer";
import QUESTIONS from '../questions';

const Question = ({onSelectAnswer, onSkipAnswer, index}) => {
  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null
  });

  let timer = 10000;
  if(answer.selectedAnswer){
    timer = 500;
  }

  if(answer.isCorrect !== null){
    timer = 1000;
  }

  const handleSelectAnswer = (answer) => {
    setAnswer ({
      selectedAnswer:answer,
      isCorrect: null
    });
    setTimeout(() => {
      setAnswer ({
        selectedAnswer:answer,
        isCorrect: QUESTIONS[index].answers[0] === answer
      });
      setTimeout(() => {
        onSelectAnswer(answer);
      }, 1000);
    }, 500);
  }
  let answerState = '';
  if(answer.selectedAnswer && answer.isCorrect !== null){
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  } else if(answer.selectedAnswer) {
    answerState = 'answered';
  }
  return (
    <div id="question">
        <QuestionTimer
            timeout={timer} 
            OnTimeOut={answer.selectedAnswer === '' ? onSkipAnswer : null}
            mode={answerState}
            key={timer}
        />
        <h2>{QUESTIONS[index].text}</h2>
        <Answers
            answers={QUESTIONS[index].answers} 
            selectedAnswer={answer.selectedAnswer}
            onClick={handleSelectAnswer} 
            answerState={answerState}
            onSelect={handleSelectAnswer}
        />
    </div>
  )
}

export default Question