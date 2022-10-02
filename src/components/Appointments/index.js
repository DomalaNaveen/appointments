import {Component} from 'react'

import {v4} from 'uuid'

import './index.css'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    isFilterActive: false,
  }

  onFilter = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onChangeTitleInput = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  onChangeDateInput = event => {
    this.setState({
      dateInput: event.target.value,
    })
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MM yyyy,EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  getFilteredAppointmentList = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(
        eachAppointmentItem => eachAppointmentItem.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentList = this.getFilteredAppointmentList()
    return (
      <div className="bg-container">
        <div className="app-container">
          <div className="add-container">
            <div>
              <form onSubmit={this.onAddAppointment} className="text-container">
                <h1>Add Appointment</h1>
                <label htmlFor="title">TITLE</label>
                <input
                  type="text"
                  placeholder="Title"
                  id="title"
                  onChange={this.onChangeTitleInput}
                  value={titleInput}
                  className="input"
                />
                <label htmlFor="date">DATE</label>
                <input
                  type="date"
                  placeholder="Title"
                  id="date"
                  onChange={this.onChangeDateInput}
                  value={dateInput}
                  className="input"
                />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
            </div>
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
          </div>
          <hr className="line" />
          <h1 className="list-heading">Appointments</h1>
          <button
            type="button"
            className={`filter-style ${filterClassName}`}
            onClick={this.onFilter}
          >
            Starred
          </button>
          <ul>
            {filteredAppointmentList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleIsStared={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
