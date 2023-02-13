import { useState, useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

const WorkoutUpdateForm = () => {
  const { update,dispatch } = useWorkoutsContext()
  const {user} = useAuthContext();
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const fetchWorkouts = async () => {
    const response = await fetch('/api/workouts', {
      headers:{
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()
    if (response.ok) {
      dispatch({type: 'SET_WORKOUTS', payload: json})
    }
  }

  useEffect(() => {
      if(update){
        setTitle(update.title)
        setLoad(update.load)
        setReps(update.reps)
      }
  }, [update])

  const handleClose = () => {
    dispatch({type: 'UPDATE_FORM_SCALE', payload: 0});
    dispatch({type: 'UPDATE_WORKOUT', payload:null});
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!user){
      setError("User must be logged in");
      return;
    }
    const workout = {title, load, reps}

    

    const response = await fetch(`/api/workouts/${update._id}`, {
      method: 'PUT',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      console.log(json.emptyFields);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle('')
      setLoad('')
      setReps('')
      setError(null)
      setEmptyFields([])
      fetchWorkouts();
      handleClose();
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Update Workout</h3>
    
      <label>Excersize Title:</label>
      <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Load (in kg):</label>
      <input 
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Reps:</label>
      <input 
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button>Update Workout</button>
      {error && <div className="error">{error}</div>}
      <span className="material-symbols-outlined close" onClick = {handleClose}>close</span>
    </form>
    
  )
}

export default WorkoutUpdateForm;