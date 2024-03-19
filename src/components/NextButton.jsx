import React from "react";

export default function NextButton({ numQuestions, index, dispatch, answer }) {
  if (answer === null) return null;

  if (index < numQuestions - 1) {
    return <button onClick={() => dispatch({type: 'nextQuestion'})}>Next Question</button>;
  } 
  else if (index === numQuestions - 1) {
    return <button onClick={() => dispatch({type: 'finish'})}>Finish</button>;
  }
}
