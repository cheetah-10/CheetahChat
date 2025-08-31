import React, { useContext, useEffect } from "react";
import * as Style from "./Main.module.css";
import { Context } from "../../context/Context";
import starIcon from "../../assets/download.png";
import { ModeContext } from "../../context/ModeContext";

export default function Main() {
  const { chatArr, onSent, setInput, input } = useContext(Context);
  const { darkMode, setDarkMode } = useContext(ModeContext);


  return (
    <div className={`${Style.main}`}>
      <div className={`${Style.nav}`}>
        <p>Hello</p>
        <i className="fa-solid fa-circle-user"></i>
      </div>

      
  {/* <p onClick={() => setDarkMode((prev) => !prev)}>
    {darkMode ? <i className="fa-regular fa-sun"></i> : <i className="fa-regular fa-moon"></i>}
  </p> */}

      <div className={`${Style.mainContainer}`}>
        {chatArr.length === 0 ? (
          <>
            <div className={`${Style.great}`}>
              <p><span>Hi, There</span></p>
              <p>How i can help you today</p>
            </div>

            <div className={`${Style.cards}`}>
              <div onClick={(e) => setInput(e.target.innerText)}
              className={`${Style.card}`}>
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <i className="fa-regular fa-compass"></i>
                <div />
              </div>
              <div onClick={(e) => setInput(e.target.innerText)} className={`${Style.card}`}>
                <p>Briefly summarize this concept: urban planning</p>
                <i className="fa-regular fa-lightbulb"></i>
                <div />
              </div>
              <div onClick={(e) => setInput(e.target.innerText)} className={`${Style.card}`}>
                <p>Brainstorm team bonding activities for our work retreat</p>
                <i className="fa-regular fa-message"></i>
                <div />
              </div>
              <div onClick={(e) => setInput(e.target.innerText)} className={`${Style.card}`}>
                <p>Tell me about React js and React native</p>
                <i className="fa-solid fa-code"></i>
                <div />
              </div>
            </div>
          </>
        ) : (
          chatArr.map((chat, index) => (
            <div key={index} className={`${Style.result}`}>
              <div className={`${Style.resultTitle}`}>
                <i className="fa-solid fa-user"></i>
                <p>{chat.recentPrompt}</p>
              </div>

              <div className={`${Style.resultData}`}>
                <img src={starIcon} alt="" />
                {chat.displayText.includes("<code>") || chat.displayText.includes("<pre>") ?
                  <div dangerouslySetInnerHTML={{ __html: chat.displayText }} /> :
                  <p dangerouslySetInnerHTML={{ __html: chat.displayText }} />

                }
                {chat.loading && (
                  <div className={`${Style.loader}`}>
                    <hr />
                    <hr />
                    <hr />
                  </div>
                )}
              </div>
            </div>
          ))
        )}

        <div className={`${Style.mainBottom}`}>
          <div className={`${Style.searchBox}`}>
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Ask anything"
              onKeyDown={(e) => {e.key === 'Enter' && onSent(input)}}
            />
            <div>
              <i className="fa-solid fa-paperclip"></i>
              <i className="fa-solid fa-microphone"></i>
              {input && (
                <i
                  onClick={() => onSent(input)}
                  className="fa-regular fa-paper-plane"
                ></i>
              )}
            </div>
          </div>
          <p className={`${Style.bottomInfo}`}>
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
}
