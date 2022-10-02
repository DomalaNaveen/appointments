import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {id, title, date, isStarred} = appointmentDetails
  const isActive = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleIsStarred(id)
  }

  return (
    <li>
      <div>
        <p className="title">{title}</p>
        <button
          type="button"
          testid="star"
          onClick={onClickStar}
          className="star-button"
        >
          <img src={isActive} alt="star" />
        </button>
      </div>
      <p>Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
