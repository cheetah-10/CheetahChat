import React from 'react'
import * as Style from './Cards.module.css'
import { div } from 'framer-motion/client'
const Cards = ({setInput}) => {
  return (
    <div className={`${Style.cardsParent}`}>
      <div className={`${Style.cards}`}>
      <div onClick={(e) => setInput(e.target.innerText)}
        className={`${Style.card}`}>
        <p>Show me creative portfolio ideas for front-end developers</p>
        <i className="fa-regular fa-compass"></i>
        <div />
      </div>
      <div onClick={(e) => setInput(e.target.innerText)} className={`${Style.card}`}>
        <p>Generate modern UI/UX designs for a tech website</p>
        <i className="fa-regular fa-lightbulb"></i>
        <div />
      </div>
      <div onClick={(e) => setInput(e.target.innerText)} className={`${Style.card}`}>
        <p>Best project ideas to practice React and Node.js</p>
        <i className="fa-regular fa-message"></i>
        <div />
      </div>
      <div onClick={(e) => setInput(e.target.innerText)} className={`${Style.card}`}>
        <p>How to stand out as a computer science student in tech</p>
        <i className="fa-solid fa-code"></i>
        <div />
      </div>
    </div>  </div>
    
  )
}

export default Cards