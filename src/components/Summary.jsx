import { useEffect } from 'react';
import QuizCompleteImg from '../assets/quiz-complete.png';
import QUESTIONS from '../questions';
const Summary = ({userAnswers}) => {
  const skippedAnswers = userAnswers.filter(answer => answer === null);
  const correctAnswers = userAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0]);

  const skippedAnswersShare = Math.round(
    (skippedAnswers.length / userAnswers.length) * 100
  )
  const correctAnswersShare = Math.round(
    (correctAnswers.length / userAnswers.length) * 100
  )
  const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

//   useEffect(() => {
//     userAnswers.map((answer, index) => {
//         let cssClass = "single-question";
//         if(answer === null) {
//             cssClass += ' skipped'
//         } else if(answer === QUESTIONS[index].answers[0]){
//             cssClass += ' correct'
//         } else {
//             cssClass += ' wrong'
//         }
//         return cssClass;
//     });
//   }, [userAnswers]);

  return (
    <div id="summary">
        <img src={QuizCompleteImg} alt="Trophy Icon" />
        <h2>Quiz Completed!</h2>
        <div id="summary-stats">
            <p>
                <span className='number'>{skippedAnswersShare}%</span>
                <span className='text'>skipped</span>
            </p>
            <p>
                <span className='number'>{correctAnswersShare}%</span>
                <span className='text'>answered correctly</span>
            </p>
            <p>
                <span className='number'>{wrongAnswersShare}%</span>
                <span className='text'>answered incorrectly</span>
            </p>
        </div>
        <div className="all-questions">
            {QUESTIONS.map((question, index) => {
                 
                 let cssClass = '';
                 if(userAnswers[index] === null) {
                     cssClass += ' skipped'
                 } else if(userAnswers[index] === QUESTIONS[index].answers[0]){
                     cssClass += ' correct'
                 } else {
                     cssClass += ' wrong'
                 }
                 const [userSelectedAnswer] = QUESTIONS[index].answers.filter((option) => {
                    return option === userAnswers[index]
                 });
        
                
                return <div key={question.id} className={`single-question ${cssClass}`}>
                    <h4 className={`question-title ${cssClass}`}>{index + 1}. {question.text}</h4>
                    <div className='question-options'>
                        {question.answers.map((option, index) =>
                            <div className={`option ${userSelectedAnswer === option ? 'selected' : '' }`} key={index}>
                                {option}
                            </div>
                        )}
                    </div>
                </div>
                
            })}
        </div>
    </div>
  )
}

export default Summary