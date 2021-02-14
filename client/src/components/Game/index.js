import React from "react";
import { FaTimes, FaPencilAlt } from 'react-icons/fa'
import "./style.css";

function Game({ game, onDelete, onEdit, onOpenVoting }) {
  return (
    <div className={game.votingOpen ? "card votingOpen" : "card"}>
      <div>
        <FaTimes
          className="float-right"
          style={{ color: 'red', cursor: 'pointer', fontSize: '28px', padding: '2px' }}
          title="Delete Game"
          onClick={() => onDelete(game._id)}
        />
        <FaPencilAlt
          className="float-right"
          style={{ color: 'black', cursor: 'pointer', fontSize: '28px', padding: '2px' }}
          title="Edit Game"
          onClick={() => onEdit(game)}
        />
      </div>
      <p>Round {game.round}  on  {game.gameDate.slice(0, 10)}  v  {game.opposition}  @  {game.venue}</p>
    </div>
  )
}

export default Game;