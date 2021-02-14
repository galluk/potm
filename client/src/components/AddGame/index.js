import { useState, useEffect } from 'react'
import { Input, FormBtn, Checkbox } from "../Form";

const AddGame = ({ game, newGame, onAdd, onEdit, onCancel }) => {
  const [round, setRound] = useState(game.round)
  const [gameDate, setgameDate] = useState('')
  const [opposition, setOpposition] = useState(game.opposition)
  const [venue, setVenue] = useState(game.venue)
  const [votingOpen, setVotingOpen] = useState(game.votingOpen)

  useEffect(() => {
    if (game.gameDate) {
      console.log(game.gameDate);
      setgameDate(game.gameDate.slice(0, 10));
    }
  }, [])    

const onSubmit = (e) => {
    e.preventDefault()

    // do user validation
    if ((!round) || (!gameDate) || (!opposition) || (!venue)) {
      alert('Please enter values for Round, Date, Opposition and Venue.')
      return
    }

    if (newGame) {
      onAdd({ round, gameDate, opposition, venue, votingOpen })
    }
    else {
      onEdit({ round, gameDate, opposition, venue, votingOpen })
    }

    setRound('')
    setgameDate('')
    setOpposition('')
    setVenue('')
    setVotingOpen(false)
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Round: </label>
        <Input
          type='text'
          placeholder='Round'
          value={round}
          onChange={(e) => setRound(e.target.value)}
        />
      </div>
      <div>
        <label>Date: </label>
        <Input
          type='date'
          // placeholder='Add Day & Time'
          value={gameDate}
          onChange={(e) => setgameDate(e.target.value)}
        />
      </div>
      <div>
        <label>Opposition: </label>
        <Input
          type='text'
          placeholder='Opposition'
          value={opposition}
          onChange={(e) => setOpposition(e.target.value)}
        />
      </div>
      <div>
        <label>Venue: </label>
        <Input
          type='text'
          placeholder='Venue'
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
        />
      </div>
      <div>
        <label>Open Voting: </label>
        <Input
          type="checkbox"
          name="votingOpen"
          checked={votingOpen}
          onChange={(e) => setVotingOpen(e.target.checked)}
        />
      </div>
      <div>
        <FormBtn onClick={onCancel}>Cancel</FormBtn>        
        <FormBtn type='submit'>Save Game</FormBtn>        
      </div>
    </form>
  )
}

export default AddGame