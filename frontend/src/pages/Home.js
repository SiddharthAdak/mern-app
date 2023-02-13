import { useEffect }from 'react'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import {useAuthContext} from "../hooks/useAuthContext";
// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import WorkoutUpdateForm from '../components/WorkoutUpdateForm';

const Home = () => {
  const {workouts,update_form_scale, dispatch} = useWorkoutsContext();
  const {user} = useAuthContext();
  useEffect(() => {
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
    if(user){
      fetchWorkouts();
    }
  }, [dispatch])

  return (
    <div className="home">
      <div className = "update" style = {{transform: `scale(${update_form_scale})`}} >
      <WorkoutUpdateForm />
      </div>
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home