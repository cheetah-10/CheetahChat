import React, { useContext, useEffect } from "react";
import * as Style from "./Main.module.css";
import { Context } from "../../context/Context";
import starIcon from "../../assets/cheetahface.png";
import { ModeContext } from "../../context/ModeContext";
import Searchbar from "../Searchbar/Searchbar";
import Loader from "../Loader/Loader";
import Cards from "../Cards/Cards";

export default function Main() {
  const { chatArr, onSent, setInput, input } = useContext(Context);
  const { darkMode, setDarkMode } = useContext(ModeContext);


  return (
    <div className={`${Style.main}`}>
      <div className={`${Style.nav}`}>
        <p>Hello!</p>
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
              <p>How can I help you today?</p>
            </div>

            <Cards setInput={setInput} />

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
                {chat.loading && (<Loader />)}
              </div>
            </div>
          ))
        )}

        <Searchbar onSent={onSent} setInput={setInput} input={input} />
      </div>
    </div>
  );
}
