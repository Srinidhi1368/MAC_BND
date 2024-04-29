import React, { useState, useEffect } from "react";
import ChatBotStyle from "./Chatbot.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Helmet } from "react-helmet";

import icon2 from "./image/icon2.png";
import bg from "../../../Assets/backdropimage.png";

import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

function ChatBot() {
  const [showImage, setShowImage] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(false);
      setShowContent(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className={ChatBotStyle.chatbot_full}>
        {showImage && (
          <div className={ChatBotStyle.chatbot_full_image}>
            <img src={bg} alt={"bg"} className={ChatBotStyle.chatbot_bg} />
          </div>
        )}
        {showContent && (
          <Container>
            <Row>
              <Col xxl={12}>
                <div className={ChatBotStyle.chatbot_full_content}>
                  <div className={ChatBotStyle.chatbot_title}>
                    Your AI Assistant
                  </div>
                  <div className={ChatBotStyle.chatbot_content}>
                    Using this software, you can ask <br /> questions and
                    receive articles using <br /> an artificial intelligence
                    assistant
                  </div>
                  <div className={ChatBotStyle.chatbot_content_image}>
                    <img
                      src={icon2}
                      alt={"icon2"}
                      className={ChatBotStyle.chatbot_image}
                    />
                  </div>

                  <Link to="/Chatarea" className={ChatBotStyle.chatbot_link}>
                    <button className={ChatBotStyle.chatbot_button}>
                      Continue
                      <span>
                        <FaArrowRightLong
                          className={ChatBotStyle.chatbot_button_arrow}
                        />
                      </span>
                    </button>
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    </div>
  );
}

export default ChatBot;
