import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button, Form } from 'react-bootstrap';

function CodingQuestion({ question}) {
  const [editing, setEditing] = useState(false);
  const [updatedQuestion, setUpdatedQuestion] = useState(question.question);
  const [questions, setQuestions] = useState([]);
  // const [updatedAnswer, setUpdatedAnswer] = useState(question.answer);
  // const [updatedCompany, setUpdatedCompany] = useState(question.company);

  useEffect(() => {
    setQuestions([question]);
  }, [question]);

  const handleEdit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.patch(`http://localhost:8080/api/coding/${question._id}`, {
        question: updatedQuestion,
        // answer: updatedAnswer,
        // company: updatedCompany
      });
      console.log(response.data); 
      setEditing(false);
      toast.success("Question Updated Successfully");
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  // const handleDelete = async () => {
  //   try {
  //     const response = await axios.delete(`http://localhost:8080/api/coding/${question._id}`);
  //     console.log(response.data); 
  //   } catch (error) {
  //     console.error('Error deleting question:', error);
  //   }
  // };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/coding/${question._id}`);
      console.log(response.data); 
      // Update the state of questions by filtering out the deleted question
      setQuestions((prevQuestions) => prevQuestions.filter((q) => q._id !== question._id));
      toast.success("Question Deleted Successfully");
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };


  return (
    <div className="mb-3">
      {editing ? (
        <Form>
          <Form.Group controlId="updatedQuestion">
            <Form.Control type="text" value={updatedQuestion} placeholder="Edit Question" onChange={(e) => setUpdatedQuestion(e.target.value)} />
          </Form.Group>
          {/* <Form.Group controlId="updatedAnswer">
            <Form.Control type="text" value={updatedAnswer} placeholder="Edit Answer" onChange={(e) => setUpdatedAnswer(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="updatedCompany">
            <Form.Control type="text" value={updatedCompany} placeholder="Edit Company"onChange={(e) => setUpdatedCompany(e.target.value)} />
          </Form.Group> */}
          <Button variant="primary" onClick={handleEdit} type='submit'>Save</Button>
          <Button variant="secondary" onClick={() => setEditing(false)}>Cancel</Button>
        </Form>
      ) : (
        <div>
          <p>{question.question}</p>
          <p>{question.answer}</p>
          <p>{question.company}</p>
          <Button variant="info" onClick={() => setEditing(true)} >Edit</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
      )}
    </div>
  );
}

export default CodingQuestion;
