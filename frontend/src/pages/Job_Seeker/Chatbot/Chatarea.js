import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ChatBotStyle from "./Chatbot.module.css";

import icon3 from "../../../Assets/icon3.png";
import icon4 from "../../../Assets/icon4.png";
import icon5 from "../../../Assets/icon5.png";
import icon6 from "../../../Assets/icon6.png";
import icon7 from "../../../Assets/icon7.png";
import icon8 from "../../../Assets/icon8.png";
import icon9 from "../../../Assets/icon9.png";
import icon10 from "../../../Assets/icon10.png";
import icon11 from "../../../Assets/icon11.png";
import icon12 from "../../../Assets/icon12.png";
import icon15 from "../../../Assets/icon15.png";

import { GoDotFill } from "react-icons/go";

export default function Chatarea() {
  const [iconClicked, setIconClicked] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .JobSeeker_RightSideContainer__topHeaderContainer__2MnVw {
        display: none !important;
      }
      .JobSeeker___OutletContainer__BTBGZ{
        height: 100vh;
      }
      
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
  return (
    <div className={ChatBotStyle.ai_full}>
      <Helmet>
        <style>{`
          .JobSeeker_RightSideContainer__topHeaderContainer__2MnVw {
            display: none !important;
          }
        `}</style>
      </Helmet>
      <Container>
        <Row>
          <Col md={12} className={ChatBotStyle.header_style_ai}>
            <div className={ChatBotStyle.ai_search_bar}>
              <div className={ChatBotStyle.ai_search_icons}>
                <img
                  src={icon3}
                  alt={"icon3"}
                  className={ChatBotStyle.chatbot_image_gender}
                />
                <div className={ChatBotStyle.ai_online}>
                  <GoDotFill className={ChatBotStyle.ai_online_green} />
                  <span>Online</span>
                </div>
              </div>
              <img
                src={icon4}
                alt={"icon4"}
                className={ChatBotStyle.chatbot_image_sound}
              />
            </div>
          </Col>
        </Row>
      </Container>

      <div className={ChatBotStyle.ai_inter}>
        <Container>
          <Row>
            <Col
              xxl={9}
              xl={9}
              lg={9}
              md={8}
              className={ChatBotStyle.search_field_color}
            >
              <div className={ChatBotStyle.ai_search_bar_full}>
                {iconClicked && (
                  <div className={ChatBotStyle.search_answer_total}>
                    <div className={ChatBotStyle.search_answer}>
                      <img
                        src={icon11}
                        alt={"icon11"}
                        className={ChatBotStyle.chatbot_gallery1_inside}
                      />
                      <div className={ChatBotStyle.search_exp}>Explain</div>

                      <button className={ChatBotStyle.search_one}>
                        Explain Quantum physics
                      </button>

                      <button className={ChatBotStyle.search_one}>
                        What are wormholes explain like i am 5
                      </button>
                    </div>
                    {/* first search over */}
                    {/* first search */}
                    <div className={ChatBotStyle.search_answer_two}>
                      <img
                        src={icon12}
                        alt={"icon12"}
                        className={ChatBotStyle.chatbot_gallery1_inside}
                      />
                      <div className={ChatBotStyle.search_exp_green}>
                        Write & edit
                      </div>

                      <button className={ChatBotStyle.search_one}>
                        Write a tweet about global warming
                      </button>

                      <button className={ChatBotStyle.search_one}>
                        Write a poem about flower and love
                      </button>

                      <button className={ChatBotStyle.search_one}>
                        Write a rap song lyrics about
                      </button>
                    </div>
                    {/* first search over */}
                    {/* first search */}
                    <div className={ChatBotStyle.search_answer_three}>
                      <img
                        src={icon15}
                        alt={"icon15"}
                        className={ChatBotStyle.chatbot_gallery1_inside}
                      />
                      <div className={ChatBotStyle.search_exp_red}>
                        Translate
                      </div>

                      <button className={ChatBotStyle.search_one}>
                        How do you say “how are you” in korean?
                      </button>

                      <button className={ChatBotStyle.search_one}>
                        Give me answers in Hindi
                      </button>
                    </div>
                    {/* first search over */}
                  </div>
                )}

                <div className={ChatBotStyle.search_field}>
                  <button className={ChatBotStyle.search_area}>
                    <div className={ChatBotStyle.search_field_area}>
                      Hello chatGPT,how are you today?
                    </div>

                    <div className={ChatBotStyle.search_icons}>
                      <img
                        src={icon7}
                        alt={"icon7"}
                        className={ChatBotStyle.chatbot_gallery1}
                      />

                      <img
                        src={icon8}
                        alt={"icon8"}
                        className={ChatBotStyle.chatbot_gallery2}
                      />

                      <img
                        src={icon9}
                        alt={"icon9"}
                        className={ChatBotStyle.chatbot_gallery3}
                      />

                      <img
                        src={icon10}
                        alt={"icon10"}
                        className={ChatBotStyle.chatbot_gallery4}
                        onClick={() => setIconClicked(true)}
                      />
                    </div>
                  </button>
                </div>
              </div>
            </Col>
            <Col
              xxl={3}
              xl={3}
              lg={3}
              md={4}
              className={ChatBotStyle.noPaddingRow}
            >
              <div className={ChatBotStyle.ai_inter_side}>
                <div className={ChatBotStyle.with_ai}>
                  Ace your <br /> interview with <br />{" "}
                  <span className={ChatBotStyle.ai_orange}>AI</span>
                </div>
                <div className={ChatBotStyle.ai_summary}>
                  Schedule your interview with AI, which can enhance your
                  confidence levels, thereby increasing your chances of seizing
                  opportunities at multinational corporations.
                </div>

                <img
                  src={icon5}
                  alt={"icon5"}
                  className={ChatBotStyle.chatbot_image_group}
                />

                <img
                  src={icon6}
                  alt={"icon6"}
                  className={ChatBotStyle.chatbot_image_camera}
                />

                <button className={ChatBotStyle.chatbot_shew}>
                  SCHEDULE NOW
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
