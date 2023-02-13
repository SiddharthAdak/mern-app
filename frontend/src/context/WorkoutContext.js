import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext()

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS': 
      return {
        ...state,
        workouts: action.payload
      }
    case 'CREATE_WORKOUT':
      return {
        ...state,
        workouts: [action.payload, ...state.workouts]
      }
    case 'DELETE_WORKOUT':
      return {
        ...state,
        workouts: state.workouts.filter((w) => w._id !== action.payload._id)
      }
    case 'UPDATE_WORKOUT':
      return {
        ...state,
        update: action.payload,
      }
    case 'UPDATE_FORM_SCALE':
      return {
        ...state,
        update_form_scale: action.payload,
      }
    default:
      return state
  }
}

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
    update: null,
    update_form_scale:0
  })
  return (
    <WorkoutsContext.Provider value={{...state, dispatch}}>
      { children }
    </WorkoutsContext.Provider>
  )
}