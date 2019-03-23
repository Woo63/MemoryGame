import React, {useState} from 'react'
import Board from './components/board'
import './App.css'

import initializeDeck from './deck'

export default function App() {

    const [output, setOutput] = useState(false)
    const [cards, setCards] = useState([])
    const [flipped, setFlipped] = useState([])
    const [solved, setSolved] = useState([])
    const [size_card, setSize] = useState(150)
    const [disabled, setDisabled] = useState(false)
    const [score, setScore] = useState(0)


    const preloadImages = () =>
        cards.map((card) => {
            const src = `/img/${card.type}.png`
            new Image().src = src
        })

    const sameCardClickedTwice = (id) => flipped.includes(id)

    const isAMatch = (id) => {
        const clickedCard = cards.find((card) => card.id === id)
        const flippedCard = cards.find((card) => flipped[0] === card.id)
        return flippedCard.type === clickedCard.type
    }

    const resetCards = () => {
        setFlipped([])
        setDisabled(false)
    }

    const handleClick = (id) => {
        setDisabled(true)
        if (flipped.length === 0) {
            setFlipped((flipped) => [...flipped, id])
            setDisabled(false)
        } else {
            if (sameCardClickedTwice(flipped, id)) return
            setFlipped((flipped) => [...flipped, id])
            if (isAMatch(id)) {
                setSolved([...solved, ...flipped, id])
                resetCards()
            } else {
                setTimeout(resetCards, 1000)
            }
        }
    }

    const handleInput = (event) => {
      if ((event.target.value<7) && (event.target.value>1)) {
          setCards(initializeDeck(event.target.value))
          setOutput(true)
          if (event.target.value<5){
          setSize(600/event.target.value)}
          else {
              setSize(150)
          }
      }
    }

    return (
        <div>
            <h1>Memory game</h1>
          <div className={'choice'}>
            <p> Выберите количество карт для игры: </p>
            <input
                type="number"
                max={6}
                min={2}
                onChange={handleInput}
            />
          </div>
            if (output){
            <Board
                cards={cards}
                flipped={flipped}
                solved={solved}
                size_card={size_card}
                handleClick={handleClick}
                disabled={disabled}
            />
        }
        </div>
    )
}
