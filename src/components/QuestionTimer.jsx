import { useEffect, useState } from "react";

const QuestionTimer = ({timeout, OnTimeOut, mode}) => {
  const [remainingTime, setTemainingTime] = useState(timeout);
  
  useEffect(() => {
    const timer = setTimeout(OnTimeOut, timeout);
    return () => {
        clearTimeout(timer)
    }
  }, [timeout, OnTimeOut]);

  useEffect(() => {
    const interval = setInterval(() => {
        setTemainingTime(prevState => prevState - 100);
    }, 100);
    return () => {
        clearInterval(interval)
    }
  }, []);

  return (
    <div className="progressbar">
      <progress 
        id="question-time" 
        max={timeout} 
        value={remainingTime} 
        className={mode}
      />
      {remainingTime / 100} - {timeout / 1000}s
    </div>
  )
}

export default QuestionTimer