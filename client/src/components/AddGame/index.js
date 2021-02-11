import { useState } from 'react'
import { Input, FormBtn, Checkbox } from "../Form";

const AddGame = ({ game, newGame, onAdd, onEdit, onCancel }) => {
  const [round, setRound] = useState(game.round)
  const [gameDate, setgameDate] = useState(game.gameDate)
  const [opposition, setOpposition] = useState(game.opposition)
  const [venue, setVenue] = useState(game.venue)
  const [votingOpen, setVotingOpen] = useState(game.votingOpen)

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
          value={votingOpen}
          onChange={(e) => setVotingOpen(e.target.checked)}
        />
      </div>
      <div>
        <FormBtn onClick={onCancel}>Cancel</FormBtn>        
        <FormBtn type='submit'>Save Game</FormBtn>        
        {/* <input type='button' value='Cancel' className='btn pull-right' onClick={onCancel} />
        <input type='submit' value='Save Game' className='btn pull-right' /> */}
      </div>
    </form>
  )
}

export default AddGame