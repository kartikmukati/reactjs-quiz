import { useEffect, useReducer } from "react";
import QUIZ_DATA from "./data/questions.json";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Timer from "./components/Timer";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  secondsRemaining: null,
};

const SECS_PER_QUESTION = 30;

const reducer = (state, action) => {
  switch(action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION
      };
    case 'newAnswer':
      return {
        ...state,
        answer: action.payload
      };
    case 'nextQuestion': 
      return {
      ...state,
      index: state.index + 1,
      answer: null
     };
    case 'finish':
      return {
        ...state,
        status: 'finish'
      }
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status
      }
  }
}



function App() {
  const [{ questions, status, index, answer, secondsRemaining }, dispatch] =
    useReducer(reducer, initialState);

  const numQuestions = questions.length;

  useEffect(() => {
    dispatch({type: 'dataReceived', payload: QUIZ_DATA.questions});
  }, [])

  return (
  <div>
    Hello ! ReactJs Interview question YT
    {status === 'ready' && <Question question={questions[index]} index={index} answer={answer} dispatch={dispatch}/>}
    <footer style={{display: 'flex', gap: '10px',marginTop: '10px'}}>
      <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>
      <NextButton numQuestions={numQuestions} index={index} dispatch={dispatch} answer={answer}/>
    </footer>
  </div>

  );
}

export default App;
