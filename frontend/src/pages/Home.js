import React,{ useEffect} from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

function Home() {
    const {workouts,dispatch} = useWorkoutsContext();
    const {user} = useAuthContext();

    // const [workouts, setWorkouts] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/workouts',{
                    headers:{
                        'Authorization':`Bearer ${user.token}`
                    }
                });
                const data = await response.json();
                console.log(data);
                if(response.ok) { 
                    dispatch({type:"SET_WORKOUTS",payload:data})
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
            if(user){

                    fetchData();
                    
                }

    },[dispatch,user])
  return (
    <div className='home'><div className='workouts'>
        {workouts && workouts?.map((workout)=>(
            <WorkoutDetails key={workout._id} workout={workout}/>)
        )}</div>
        <WorkoutForm/>
        </div>
  )
}

export default Home