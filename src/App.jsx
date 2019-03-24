import React, {useState} from 'react'
import Board from './components/board'
import './App.css'
import initializeDeck from './deck'

export default function App(){

    const [show, setShow] = useState(false)
    const [cards, setCards] = useState([])
    const [flipped, setFlipped] = useState([])
    const [solved, setSolved] = useState([])
    const [size_card, setSize] = useState(150)
    const [disabled, setDisabled] = useState(false)
    const [score, setScore] = useState(0)
    const [numberCards, setNumberCards] = useState(0)
    const [value, setValue] = useState(1)

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

    const win = () => {
        alert('You win!')
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
                const temp = score+1
                setScore(temp)
                if (temp == numberCards){
                    setTimeout(win, 1000)
                }
            } else {
                setTimeout(resetCards, 1000)
            }
        }
    }

    const handleInput = (event) => {
      if ((event.target.value<7) && (event.target.value>1)) {
          setNumberCards(event.target.value)
      }
    }

    const handleValue = (event) => {
        setValue(event.target.value)
    }

    const handleButton = () => {
        setCards(initializeDeck(numberCards, value))
        setSolved([])
        setFlipped([])
        setScore(0)
        switch (numberCards) {
            case '2':
                setSize(250)
                break;
            case '3':
                setSize(630/numberCards);
                break;
            default:
                setSize(150)
        }
        if ((numberCards>1)&&(numberCards<7)){
            setShow(true)
        }
    }

    return (
        <div>
            <h1>Memory game</h1>
              <label className={'choice'}> Выберите количество карт для игры:
            <input
                type="number"
                max={6}
                min={2}
                onChange={handleInput}
            />
              </label>
            <div className={'radio'}>
                <label><input type={'radio'} name={'check'} defaultChecked={true} value={'1'} onClick={handleValue} />Cake</label>
                <label><input type={'radio'} name={'check'} value={'2'} onClick={handleValue}/>Cat</label>
            </div>
            <button onClick={handleButton}> Начать игру</button>
            <Board
                cards={cards}
                flipped={flipped}
                solved={solved}
                size_card={size_card}
                handleClick={handleClick}
                disabled={disabled}
            />}
            <p className={show ? 'score' : 'hidden'}>Ваш счет: {score}</p>
        </div>
    )
}
