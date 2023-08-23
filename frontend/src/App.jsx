
import 'bootstrap/dist/css/bootstrap.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import Navbar from './components/navbar.components'
import ExercisesList from './components/exerciseslist.component'
import EditExercise from './components/editexercise.component'
import CreateExercise from './components/createexercise.component'
import CreateUser from './components/createuser.component'

export default function App() {
    return (

        <Router>
            <div className="container">
                <Navbar />
                <br />
                <Routes>
                    <Route path='/' exact Component={ExercisesList} />
                    <Route path='/edit/:id' exact Component={EditExercise} />
                    <Route path='/create' exact Component={CreateExercise} />
                    <Route path='/user' exact Component={CreateUser} />
                </Routes>
            </div>



        </Router>
    )
}