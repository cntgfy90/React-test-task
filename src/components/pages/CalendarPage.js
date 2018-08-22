import React from 'react';
// Components
import Calendar from '../smart/Calendar';

class CalendarPage extends React.Component {
  handleChange = (e) => {
    const target = e.target;
    this.setState(() => ({
      data: {...this.state.data, [target.name]: target.value}
    }));
  }

  render() {
    return (
      <div>
        <Calendar />
      </div>
    );
  }
}

export default CalendarPage;
