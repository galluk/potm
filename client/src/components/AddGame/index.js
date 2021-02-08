import { useState } from 'react'

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
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Round: </label>
        <input
          type='text'
          placeholder='Round'
          value={round}
          onChange={(e) => setRound(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Date: </label>
        <input
          type='date'
          // placeholder='Add Day & Time'
          value={gameDate}
          onChange={(e) => setgameDate(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Opposition: </label>
        <input
          type='text'
          placeholder='Opposition'
          value={opposition}
          onChange={(e) => setOpposition(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Venue: </label>
        <input
          type='text'
          placeholder='Venue'
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
        />
      </div>
      <div className="form-control">
          <label>Open Voting: </label>
          <input
              type="checkbox"
              name="votingOpen"
              value={votingOpen}
              onChange={(e) => setVotingOpen(e.target.checked)}
          />
      </div>

      <input type='submit' value='Save Game' className='btn pull-left' />
      <input type='button' value='Cancel' className='btn pull-right' onClick={onCancel}/>
    </form>
  )
}

export default AddGame