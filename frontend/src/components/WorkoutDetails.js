import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from "../hooks/useAuthContext"
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const {user} = useAuthContext();

  const handleEdit = () => {
    dispatch({type: 'UPDATE_FORM_SCALE', payload: 1});
    dispatch({type: 'UPDATE_WORKOUT', payload: workout})
  }

  const handleClick = async () => {
    if(!user){
      console.log("User must be logged in");
      return;
    }
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined edit" onClick={handleEdit}>edit</span>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails