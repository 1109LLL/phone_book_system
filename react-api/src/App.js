import React, { Component } from 'react';
import Contacts from './components/contacts';

class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    fetch('http://127.0.0.1:8000/api/v1/persons/')
    .then(res => res.json())
    .then((data) => {
      this.setState({ contacts: data })
    })
    .catch(console.log)
  }

  render () {
    return (
      <Contacts contacts={this.state.contacts} />
    )
  }
}

export default App;