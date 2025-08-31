import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import * as Style from "./Sidebar.module.css";
import { Context } from "../../context/Context";
const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { newChat, onSent, prevPrompts, setRecentPrompt } = useContext(Context)
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt)
    await onSent(prompt)
  }


  return (
    <motion.div
      className={`${Style.sidebar}`}
      animate={{ width: extended ? 250 : 80 }}   // العرض يتغير بالـ animation
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="top">
        <i
          onClick={() => {
            setExtended((prev) => !prev);
          }}
          className={`fa-solid fa-bars ${Style.menu}`}
        ></i>

        <div onClick={() => { newChat() }} className={`${Style.newChat}`}>
          <i className="fa-solid fa-plus"></i>
          {extended && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              New Chat
            </motion.p>
          )}
        </div>

        {extended && (
          <motion.div
            className={`${Style.recent}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <p className={`${Style.recentTitle}`}>Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div onClick={() => { loadPrompt(item) }} className={`${Style.recentEntry}`}>
                  <i className="fa-regular fa-message"></i>
                  <p>{item.slice(0, 18)}...</p>
                </div>
              )
            })}

          </motion.div>
        )}
      </div>

      <div className={`${Style.bottom}`}>
        <div className={`${Style.bottomItem} ${Style.recentEntry}`}>
          <i className="fa-solid fa-question"></i>
          {extended && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Help
            </motion.p>
          )}
        </div>

        <div className={`${Style.bottomItem} ${Style.recentEntry}`}>
          <i className="fa-solid fa-clock-rotate-left"></i>
          {extended && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Activity
            </motion.p>
          )}
        </div>

        <div className={`${Style.bottomItem} ${Style.recentEntry}`}>
          <i className="fa-solid fa-gear"></i>
          {extended && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Settings
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
