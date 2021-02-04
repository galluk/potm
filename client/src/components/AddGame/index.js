import { useState } from 'react'

const AddGame = ({ onAdd }) => {
  const [round, setRound] = useState('')
  const [gameDate, setgameDate] = useState('')
  const [opposition, setOpposition] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    // do user validation
    if ((!round) || (!gameDate) || (!opposition)) {
      alert('Please enter the Round, Date and Opposition.')
      return
    }

    onAdd({ round, gameDate, opposition })

    setRound('')
    setgameDate('')
    setOpposition('')
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
      <div className='form-control form-control-check'>
        <label>Opposition: </label>
        <input
          type='text'
          placeholder='Opposition'
          value={opposition}
          onChange={(e) => setOpposition(e.target.value)}
        />
      </div>

      <input type='submit' value='Save Game' className='btn btn-block' />
    </form>
  )
}

export default AddGame