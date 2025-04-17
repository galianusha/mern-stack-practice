import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = ()=>{
    const {dispatch} = useAuthContext();
    const {dispatch : workOutsDispatch} = useWorkoutsContext();
    const logout = ()=>{
        //remove user from storage
        localStorage.removeItem('user');

        //dispatch
        dispatch({type:'LOGOUT'})
        workOutsDispatch({type:'SET_WORKOUTS',payload:null})
    
    }
    return {logout}
}