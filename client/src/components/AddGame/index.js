import { useState } from 'react'

const AddGame = ({ game, onAdd }) => {
  const [round, setRound] = useState(game.round)
  const [gameDate, setgameDate] = useState('')
  const [opposition, setOpposition] = useState(game.opposition)
  const [venue, setVenue] = useState('')
  const [votingOpen, setVotingOpen] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    // do user validation
    if ((!round) || (!gameDate) || (!opposition)) {
      alert('Please enter the Round, Date and Opposition.')
      return
    }

    onAdd({ round, gameDate, opposition, venue, votingOpen })

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
              onChange={(e) => setVotingOpen(e.target.value)}
          />
      </div>

      <input type='submit' value='Save Game' className='btn btn-block' />
    </form>
  )
}

export default AddGame