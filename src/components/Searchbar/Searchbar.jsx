import React from 'react'
import * as Style from './Searchbar.module.css'
const Searchbar = ({ onSent, setInput, input }) => {
  return (
      <div className={`${Style.mainBottom}`}>
        <div className={`${Style.searchBox}`}>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Ask anything"
            onKeyDown={(e) => { e.key === 'Enter' && onSent(input) }}
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
    
  )
}

export default Searchbar