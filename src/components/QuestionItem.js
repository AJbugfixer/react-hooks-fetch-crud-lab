import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteClick(){
    fetch(`http://localhost:4000/questions/${question.id}`,{
      method:'DELETE',
      headers:{
        "Content-Type":"application/json",
      },
    })
    .then(r => r.json())
    .then(() => onDelete(question))
  }
  function handleUpdate(event){
    const correctAnswer = event.target.value
    fetch(`http://localhost:4000/questions/${question.id}`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        correctIndex :correctAnswer,
      }),
    })
    .then (r => r.json())
    .then(updatedQuestion => onUpdate(updatedQuestion))
  }
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}onChange={handleUpdate}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
