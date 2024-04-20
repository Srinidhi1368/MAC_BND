import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import CodingQuestionForm from "./CodingQuestionForm";
import CodingQuestion from "./CodingQuestion";
import axios from "axios";
import PreAssesmentStyle from "./InterviewScheduled.module.css";

const PreAssesment = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch questions from the backend when the component mounts
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/coding/');
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleQuestionAdded = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };
  return (
    <>
      <div className={PreAssesmentStyle.pre_asssesment_container}>
        <div className={PreAssesmentStyle.coding_round_container}>
          <div className={PreAssesmentStyle.rounds_heading}>Coding Round</div>

          <div className={PreAssesmentStyle.question_container}>
            {questions.map((question, index) => (
              <div key={question._id} className={PreAssesmentStyle.question}>
                <div className={PreAssesmentStyle.question_number}>
                  Question no .{index + 1}
                </div>
                <CodingQuestion question={question} />
              </div>
            ))}
          </div>

          <div className={PreAssesmentStyle.add_btn_container}>
            {/* <Button className={PreAssesmentStyle.add_btn}>ADD +</Button> */}
            <CodingQuestionForm onSubmit={handleQuestionAdded} />
          </div>
        </div>

        <div className={PreAssesmentStyle.aptitude_round_container}>
          <div className={PreAssesmentStyle.rounds_heading}>Aptitude Round</div>

          <div className={PreAssesmentStyle.aptitude_round_flex_container}>
            <div>
              <div>
                <div
                  className={
                    PreAssesmentStyle.aptitude_round_question_option_heading
                  }
                >
                  Question
                </div>
                <div
                  className={
                    PreAssesmentStyle.aptitude_round_question_container_first_question
                  }
                >
                  <div
                    className={PreAssesmentStyle.aptitude_round_question_number}
                  >
                    Question no. 1
                  </div>
                  <div className={PreAssesmentStyle.aptitude_round_question}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </div>
                </div>

                <div
                  className={
                    PreAssesmentStyle.aptitude_round_question_container
                  }
                >
                  <div
                    className={PreAssesmentStyle.aptitude_round_question_number}
                  >
                    Question no. 2
                  </div>
                  <div className={PreAssesmentStyle.aptitude_round_question}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div
                className={
                  PreAssesmentStyle.aptitude_round_question_option_heading
                }
              >
                Option
              </div>
              <div
                className={
                  PreAssesmentStyle.aptitude_round_option_container_first_option
                }
              >
                <ol type="A">
                  <li>Option 1</li>
                  <li>Option 2</li>
                  <li>Option 3</li>
                  <li>Option 4</li>
                </ol>
              </div>

              <div
                className={PreAssesmentStyle.aptitude_round_option_container}
              >
                <ol type="A">
                  <li>Option 1</li>
                  <li>Option 2</li>
                  <li>Option 3</li>
                  <li>Option 4</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className={PreAssesmentStyle.add_btn_container}>
          <Button className={PreAssesmentStyle.add_btn}>ADD +</Button>
        </div>

        <div className={PreAssesmentStyle.form_action_btn_container}>
          <div className={PreAssesmentStyle.cancel_btn_container}>
            <Button className={PreAssesmentStyle.cancel_btn}>CANCEL</Button>
          </div>

          <div className={PreAssesmentStyle.submit_btn_container}>
            <Button className={PreAssesmentStyle.submit_btn}>SUBMIT</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreAssesment;
