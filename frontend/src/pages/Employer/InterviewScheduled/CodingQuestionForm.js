import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap'; 
import PreAssesmentStyle from './InterviewScheduled.module.css';
import toast from 'react-hot-toast';

function CodingQuestionForm({ onSubmit }) {
  const [question, setQuestion] = useState('');
  // const [answer, setAnswer] = useState('');
  // const [company, setCompany] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/coding/', {
        question,
        // answer,
        // company
      });
      console.log("Response from server:", response.data); 
      onSubmit(response.data);
      setQuestion('');
      // setAnswer('');
      // setCompany('');
      setShowModal(false);
      toast.success("Question Added Successfully");
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalShow = () => {
    setShowModal(true);
  };

  return (
    <>
      <Button className={PreAssesmentStyle.add_btn} onClick={handleModalShow}>ADD +</Button>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="question">
              <Form.Label>Question</Form.Label>
              <Form.Control type="text" placeholder="Enter question" value={question} onChange={(e) => setQuestion(e.target.value)} required />
            </Form.Group>
            {/* <Form.Group controlId="answer">
              <Form.Label>Answer</Form.Label>
              <Form.Control type="text" placeholder="Enter answer" value={answer} onChange={(e) => setAnswer(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="company">
              <Form.Label>Company</Form.Label>
              <Form.Control type="text" placeholder="Enter company" value={company} onChange={(e) => setCompany(e.target.value)} required />
            </Form.Group> */}
            <Button variant="primary" type="submit">Submit</Button>
            <Button variant="secondary" onClick={handleModalClose}>Cancel</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CodingQuestionForm;

