import React from 'react'
import PropTypes from 'prop-types'

import Card from '../card'

import './styles.css'

export default function Board({
  size_card,
  cards,
  flipped,
  solved,
  handleClick,
  disabled,
}) {
  return (
    <div
      className='board'
    >
      {cards.map((card) => (
        <Card
          key={card.id}
          width={size_card}
          height={size_card}
          handleClick={handleClick}
          flipped={flipped.includes(card.id)}
          solved={solved.includes(card.id)}
          disabled={disabled || solved.includes(card.id)}
          {...card}
        />
      ))}
    </div>
  )
}

Board.propTypes = {
  dimension: PropTypes.number.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  flipped: PropTypes.arrayOf(PropTypes.number).isRequired,
  solved: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
}
