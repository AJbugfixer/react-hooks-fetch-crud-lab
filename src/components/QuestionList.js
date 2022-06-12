import React, { useEffect } from "react";
import QuestionItem from "./QuestionItem";


function QuestionList({setQuestions, questions}) {
  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then (r => r.json())
    .then(data => setQuestions(data))
  },[setQuestions])

  function handleDelete (deleteQuestion){
    const updatedQuestion = questions.filter(question => question.id !== deleteQuestion.id)
    setQuestions(updatedQuestion)
  }

  function handleUpdate(updatedQuestion){
    const updatedQuestions = questions.map(question =>{
      if(question.id === updatedQuestion.id){
        return updatedQuestion
      }else{
        return question
      }
    })
    setQuestions(updatedQuestions)
  }
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map(question =><QuestionItem key={question.id}
          question ={question} onDelete={handleDelete}
          onUpdate = {handleUpdate}/>)
        }
      </ul>
    </section>
  );
}

export default QuestionList;
