import { Component } from "react";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import axios from 'axios'

export default class EditExercise extends Component {


    constructor(props) {
        super(props);


        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);






        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        const arr = window.location.href.split('/');
        axios.get('http://localhost:4444/exercises/' + arr[arr.length - 1])
            .then(response => this.setState({
                username: response.data.username,
                description: response.data.description,
                duration: response.data.duration,
                date: new Date(response.data.date)


            }))
            .catch(error => console.log(error))





        axios.get('http://localhost:4444/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username)
                    })
                }
            })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value

        })
    }


    onChangeDescription(e) {
        this.setState({
            description: e.target.value

        })
    }
    onChangeDuration(e) {
        this.setState({
            duration: e.target.value

        })
    }
    onChangeDate(date) {
        this.setState({
            date: date

        })
    }


    onSubmit(e) {
        const arr = window.location.href.split('/');
        e.preventDefault();
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date

        }

        console.log(exercise)

        axios.post('http://localhost:4444/exercises/update/' + arr[arr.length - 1], exercise)
            .then(res => console.log(res.data))


        window.location = '/'
    }


    render() {
        return (
            <div>
                <h1>Edit Exercise Log</h1>
                <form onSubmit={this.onSubmit} action="">
                    <div className="form-group">
                        <label htmlFor="">Username: </label>
                        <select name="" id="" ref='userInput' required className="form-control" value={this.state.username} onChange={this.onChangeUsername}>
                            {


                                this.state.users.map((user) => (<option key={user} value={user}>{user}</option>))
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Description: </label>
                        <input type="text"
                            required className="form-control" value={this.state.description} onChange={this.onChangeDescription} />

                    </div>
                    <div className="form-group">
                        <label htmlFor="">Duration (in minutes): </label>
                        <input type="text"
                            required className="form-control" value={this.state.duration} onChange={this.onChangeDuration} />

                    </div>
                    <div className="form-group">
                        <label htmlFor="">Date: </label>
                        <DatePicker selected={this.state.date}
                            onChange={this.onChangeDate} />

                    </div>
                    <div className="form-group">
                        <input type="submit" value='Edit Exercise Log' className="btn btn-primary" />

                    </div>


                </form>
            </div>
        )
    }
}