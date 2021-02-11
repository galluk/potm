import React from "react";
import { FaTimes, FaPencilAlt, FaEnvelopeOpen } from 'react-icons/fa'
import "./style.css";

function Game({ game, onDelete, onEdit, onOpenVoting }) {
  return (
    <div className="card">
      <FaTimes
        className="float-right"
        style={{ color: 'red', cursor: 'pointer', fontSize: '28px', padding: '2px' }}
        title="Delete Game"
        onClick={() => onDelete(game._id)}
      />
      <FaPencilAlt
        className="float-right"
        style={{ color: 'blue', cursor: 'pointer', fontSize: '28px', padding: '2px' }}
        title="Edit Game"
        onClick={() => onEdit(game)}
      />
      {/* <FaEnvelopeOpen
        className="float-left"
        style={game.votingOpen ? { color: 'green', fontSize: '28px', padding: '2px 4px 2px 0px' } :
          { color: 'red', fontSize: '28px', padding: '2px' }}
        title={game.votingOpen ? "Close Voting" : "Open Voting"}
      // onClick={() => onOpenVoting(game._id)}
      /> */}
      {/* <p>Round {game.round}  on  {game.gameDate.slice(0, 10)}  v  {game.opposition}  @  {game.venue}</p> */}
      Round {game.round}  on  {game.gameDate.slice(0, 10)}  v  {game.opposition}  @  {game.venue}
    </div>
  )
}

export default Game;