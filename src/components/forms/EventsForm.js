import React from 'react';
import { connect } from 'react-redux';
import { createEvent, removeEvent, editEvent } from '../../actions/events';
import dateFns from 'date-fns';
import '../../styles/components/forms/EventsForm.css';

class EventsForm extends React.Component {
  state = {
    data: {
      name: ''
    }
  };

  handleChange = (e) => {
    const target = e.target;
    this.setState(() => ({
      data: {...this.state.data, [target.name]: target.value}
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, date } = this.state.data;
    const { selectedDate } = this.props;
    switch(e.target.name) {
      case 'add-event':
        this.props.createEvent({name, date: String(selectedDate)}).then((a) => console.log(a));
        break;
      case 'remove-event':
        this.props.events.map((event) => {
          if (event.date === this.props.selectedDate) {
            this.props.removeEvent(event.id);
          }
        });
        break;
      case 'update-event':
        this.props.events.map((event) => {
          if (event.date === this.props.selectedDate) {
            this.props.editEvent(event.id, {name, date});
          }
        });
        break;
    }
  }

  render() {
    const { selectedDate } = this.props;
    const { data } = this.state;
    return (
      <form className="events-form">
        <div className="form-row events-form__group">
          <div className="col">
            <label htmlFor="event-name">Name</label>
            <input
              id="event-name"
              type="text"
              className="form-control"
              placeholder="Choose name"
              onChange={this.handleChange}
              value={data.name}
              name="name"
            />
          </div>
          <div className="col">
            <label htmlFor="event-date">Date</label>
            <div
              className="form-control"
              id="event-date"
            >
              {dateFns.format(this.props.selectedDate, 'MM/DD/YYYY')}
            </div>
          </div>
        </div>
        <div className="form-row events-form__btns">
        <button
          className="btn events-form__btn"
          type="submit"
          onClick={this.handleSubmit}
          name="add-event"
        >
          Add
        </button>
        <button
          className="btn events-form__btn"
          type="submit"
          onClick={this.handleSubmit}
          name="remove-event"
        >
          Remove
        </button>
        <button
          className="btn events-form__btn"
          type="submit"
          onClick={this.handleSubmit}
          name="update-event"
        >
          Update
        </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  events: state.events.items
});

export default connect(mapStateToProps, { createEvent, editEvent, removeEvent })(EventsForm);
