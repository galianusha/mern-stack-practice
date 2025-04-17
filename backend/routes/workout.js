const express = require('express');
// const Workout = require('../models/workoutmodel');
const{createWorkout, getWorkouts,getWorkout,deleteWorkout,updateWorkout} = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth');


const router = express.Router();

//require auth for all workout  routes
router.use(requireAuth)
//get all workouts
router.get('/', getWorkouts);

router.get('/:id',getWorkout);

router.post('/', createWorkout);


router.delete('/:id', deleteWorkout);
router.patch('/:id',updateWorkout);


module.exports = router;
// export default router;