import React from 'react';
import dateFns from 'date-fns';
import '../../styles/components/forms/EventsForm.css';

const EventsForm = ({handleChange, handleSubmit, name, selectedDate, mode='create'}) => (
  <form className="events-form">
    <div className="form-row events-form__group">
      <div className="col">
        <label htmlFor="event-name">Name</label>
        <input
          id="event-name"
          type="text"
          className="form-control"
          placeholder="Choose name"
          onChange={(e) => handleChange(e)}
          value={name}
          name="name"
        />
      </div>
      <div className="col">
        <label htmlFor="event-date">Date</label>
        <div
          className="form-control"
          id="event-date"
        >
          {dateFns.format(selectedDate, 'MM/DD/YYYY')}
        </div>
      </div>
    </div>
    {
      mode === 'create' ? (
        <div className="form-row events-form__btns">
          <button
            className="btn events-form__btn"
            type="submit"
            name="add-event"
            onClick={(e) => handleSubmit(e)}
          >
            Add
          </button>
        </div>
      ) : (
        <div className="form-row events-form__btns">
          <button
            className="btn events-form__btn"
            type="submit"
            name="remove-event"
            onClick={(e) => handleSubmit(e)}
          >
            Remove
          </button>
          <button
            className="btn events-form__btn"
            type="submit"
            name="update-event"
            onClick={(e) => handleSubmit(e)}
          >
            Update
          </button>
        </div>
      )
    }
  </form>
);

export default EventsForm;
