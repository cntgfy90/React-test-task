import React from 'react';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import _ from 'lodash';
import { createEvent, removeEvent, editEvent } from '../../actions/events';
import getAllDates from '../../selectors/getAllDates';
import '../../styles/components/smart/Calendar.css';
// Components
import EventsForm from '../forms/EventsForm';

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    name: '',
    message: ''
  };

  renderHeader() {
    const dateFormat = "MMMM YYYY";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = 'D';
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
            <div
              className={`col cell ${
                !dateFns.isSameMonth(day, monthStart)
                  ? 'disabled'
                  : dateFns.isSameDay(day, selectedDate) ? 'selected' : ''
              } ${this.props.dates.includes(String(day)) ? 'reserved' : ''}`}
              key={day}
              onClick={(e) => this.onDateClick(dateFns.parse(cloneDay))}
            >
              <span className="number">{formattedDate}</span>
              <span className="bg">{formattedDate}</span>
            </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">
      {rows}
    </div>;
  }

  onDateClick = (day) => {
    const dayString = day.toString();
    if (this.props.dates.includes(dayString)) {
      const name = _.find(this.props.events, {date : dayString}).name;
      this.setState(() => ({ name, selectedDate: day }));
    } else {
      this.setState(() => ({ selectedDate: day, name: '' }));
    }
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState(() => ({
      [name]: value
    }));
  }

  handleSubmit = (e) => {
      e.preventDefault();
      const { selectedDate, name } = this.state;
      const { createEvent, editEvent, removeEvent, events } = this.props;
      const selectedDateString = selectedDate.toString();

      new Promise((resolve, reject) => {
        if (e.target.name === 'add-event' && name) {
          createEvent({name, date: selectedDateString})
            .then(() => resolve('Event is successfully created'))
            .catch(() => reject('Some error occurred'));
        } else if (e.target.name === 'remove-event') {
          events.forEach((event) => {
            if (event.date === selectedDateString) {
              removeEvent(event.id)
                .then(() => {
                  this.setState(() => ({ name: '' }));
                  resolve('Event is successfully canceled')
                })
                .catch(() => reject('Some error occurred'));
            }
          });
        } else if (e.target.name === 'update-event') {
          events.forEach((event) => {
            if (event.date === selectedDateString) {
              editEvent(event.id, {name, date: selectedDateString})
                .then(() => resolve('Event is successfully updated'))
                .catch(() => reject('Some error occurred'));
            }
          });
        }
      }).then((message) => {
        this.setState(() => ({ message }));
      }).catch((message) => {
        this.setState(() => ({ message }));
      });

      var that = this;
      setTimeout(() => {
        that.setState(() => ({ message: ''}));
      }, 1000)
  }

  render() {
    const { dates } = this.props;
    const { selectedDate, name, message } = this.state;
    return (
      <div>
      {
        selectedDate ? (
          <div className="calendar">
            {this.renderHeader()}
            {this.renderDays()}
            {this.renderCells()}
            <EventsForm
              selectedDate={selectedDate}
              name={name}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              mode={dates.includes(selectedDate.toString()) ? 'edit' : 'create'}
              message={message}
            />
          </div>
        ) : (
          <div className="alert alert-info" role="alert">
            Please, select some date.
          </div>
        )
      }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  events: state.events.items,
  dates: getAllDates(state.events.items)
});

export default connect(mapStateToProps, {createEvent, editEvent, removeEvent})(Calendar);
