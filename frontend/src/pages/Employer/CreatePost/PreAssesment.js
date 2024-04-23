import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import PreAssesmentStyle from "./Preassessment.module.css";
import toast from "react-hot-toast";
import {useNavigate} from 'react-router-dom'

const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

const PreAssesment = () => {
  const [mcqs, setMCQs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [editingMCQId, setEditingMCQId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMCQs();
  }, []);

  const fetchMCQs = async () => {
    try {
      const response = await axios.get(`${baseUrl}/aptitude/`);
      const data = response.data;
      setMCQs(data);
    } catch (error) {
      console.error("Error fetching MCQs:", error);
    }
  };

  const handleEdit = async (mcqId) => {
    try {
      const response = await axios.patch(`${baseUrl}/aptitude/${mcqId}`);
      const mcqToEdit = response.data;
      setNewQuestion(mcqToEdit.question);
      setOptions(mcqToEdit.options);
      setEditingMCQId(mcqId); // Set the ID of the MCQ being edited
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching MCQ for editing:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingMCQId) {
        // Update existing MCQ
        await axios.patch(`${baseUrl}/aptitude/${editingMCQId}`, {
          question: newQuestion,
          options: options,
          correctAnswer: options[0], // Assuming correct answer is always the first option
        });
        toast.success("Question Updated Successfully");

        const editedMCQIndex = mcqs.findIndex((mcq) => mcq._id === editingMCQId);
        const newMCQs = [...mcqs];
        newMCQs[editedMCQIndex] = { ...mcqs[editedMCQIndex], question: newQuestion, options };
        setMCQs(newMCQs);
      }
      else {
        // If editingMCQId is not set, add a new MCQ
        const response = await axios.post(`${baseUrl}/aptitude/`, {
          question: newQuestion,
          options: options,
          correctAnswer: options[0],
        });
        const newMCQ = response.data;
        setMCQs([...mcqs, newMCQ]); // Update the state with the new MCQ
      }
      // Clear inputs and close modal
      setNewQuestion("");
      setOptions(["", "", "", ""]);
      setEditingMCQId(null); // Reset editingMCQId after submission
      setShowModal(false);
    } catch (error) {
      console.error("Error adding/editing MCQ:", error);
    }
  };

  const handleDelete = async (mcqId) => {
    // Logic to delete the MCQ from the backend
    try {
      await axios.delete(`${baseUrl}/aptitude/${mcqId}`);
      // Update the state to remove the deleted MCQ
      setMCQs(mcqs.filter((mcq) => mcq._id !== mcqId));
    } catch (error) {
      console.error("Error deleting MCQ:", error);
    }
  };

  return (
    <>
      <div className={PreAssesmentStyle.aptitude_round_container}>
        <div className={PreAssesmentStyle.rounds_heading}>MCQ Questions</div>

        <div className={PreAssesmentStyle.aptitude_heading_container}>
          <div
            className={PreAssesmentStyle.aptitude_round_question_option_heading}
          >
            Question
          </div>
          <div
            className={PreAssesmentStyle.aptitude_round_question_option_heading}
          >
            Option
          </div>
        </div>

        <div>
          {mcqs.map((mcq, index) => (
            <div key={index}>
              <div className={PreAssesmentStyle.aptitude_round_flex_container}>
                <div>
                  <div
                    className={
                      PreAssesmentStyle.aptitude_round_question_container_first_question
                    }
                  >
                    <div
                      className={
                        PreAssesmentStyle.aptitude_round_question_number
                      }
                    >
                      Question no. {index + 1}
                    </div>
                    <div className={PreAssesmentStyle.aptitude_round_question}>
                      {mcq.question}
                    </div>
                  </div>
                </div>

                <div>
                  <div
                    className={
                      PreAssesmentStyle.aptitude_round_option_container_first_option
                    }
                  >
                    <ol type="A">
                      {mcq.options.map((option, index) => (
                        <li key={index}>{option}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
              <div
                className={
                  PreAssesmentStyle.aptitude_round_edit_del_btn_container
                }
              >
                <Button variant="warning" onClick={() => handleEdit(mcq._id)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(mcq._id)}
                  className={PreAssesmentStyle.aptitude_round_del_btn}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}

          <div className={PreAssesmentStyle.add_btn_container}>
            <Button
              className={PreAssesmentStyle.add_btn}
              onClick={() => setShowModal(true)}
            >
              ADD +
            </Button>
          </div>
        </div>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add MCQ</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="question">
                <Form.Label>Question</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter question"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                />
              </Form.Group>
              {options.map((option, index) => (
                <Form.Group controlId={`option${index}`} key={index}>
                  <Form.Label>Option {index + 1}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={`Enter option ${index + 1}`}
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...options];
                      newOptions[index] = e.target.value;
                      setOptions(newOptions);
                    }}
                  />
                </Form.Group>
              ))}
              <div>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
                <Button variant="primary" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>

      <div className={PreAssesmentStyle.form_action_btn_container}>
        <div className={PreAssesmentStyle.cancel_btn_container}>
          <Button className={PreAssesmentStyle.cancel_btn} onClick={(e)=>navigate(-1) }>CANCEL</Button>
        </div>

        <div className={PreAssesmentStyle.submit_btn_container}>
          <Button className={PreAssesmentStyle.submit_btn}>SUBMIT</Button>
        </div>
      </div>
    </>
  );
};

export default PreAssesment;
