import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";
export const useLogout = () => {
    const {dispatch} = useAuthContext();
    const {dispatch: workoutsDispatch} = useWorkoutsContext();
    const logout = () => {
        const response = fetch('/api/user/logout');
        dispatch({type: 'LOGOUT'});
        workoutsDispatch({type: 'SET_WORKOUTS', payload: null});
    }
    return {logout};
}