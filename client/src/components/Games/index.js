import React from "react";
import Game from '../Game';

function Games ({ games, onDelete, onEdit, onOpenVoting }) {
  return (
    <div>
      {games.map((game) => (
        <Game key={game._id} game={game} onDelete={onDelete} onEdit={onEdit} onOpenVoting={onOpenVoting}/>
      ))}
    </div>
  );
}

export default Games;