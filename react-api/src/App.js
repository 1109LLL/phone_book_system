import React, { useState, useEffect, Component } from 'react';

class UpdateForm extends Component {
	constructor(props) {
    super(props);

    this.state = {
      showForm: false,
			attrs: props.person
    };
		this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
		this.getContacts = this.getContacts.bind(this);
		this.updatedAttrs = props.person
  }

	
	getContacts() {
		let api_view_list = 'http://127.0.0.1:8000/api/v1/persons/'
		fetch(api_view_list)
		.then((response => response.json()))
		.then(this.props.setContact);
	
	}

	handleSubmit() {
		console.log(this.state.attrs)
		let updateURL = `http://127.0.0.1:8000/api/v1/persons/${this.props.person.id}/update`
		fetch(updateURL, { method: 'PATCH', 
												body: JSON.stringify(this.state.attrs)}, )
		// .then(this.getContacts);
	}

	handleChange(event){
		const name = event.target.name;
		const value = event.target.value;
		// const attrs_holder = this.state.attrs
		// attrs_holder[name] = value
		this.updatedAttrs[name] = value
    // this.setState({
		// 	attrs: attrs_holder
		// })
	}

	showForm = () => {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<label>
						First name:
							<input type="text" defaultValue={this.props.person.first_name} onChange={this.handleChange}/>
					</label>
					<label>
						Last name:
							<input type="text" defaultValue={this.props.person.last_name} onChange={this.handleChange}/>
					</label>
					<label>
						Phone:
						<input type="text" defaultValue={this.props.person.phone} onChange={this.handleChange}/>
					</label>
					<label>
						Email:
							<input type="text" defaultValue={this.props.person.email} onChange={this.handleChange}/>
					</label>
					<input type="submit" value="Save"/>
				</form>
			</div>
		);
	}

	render() {
		return (
				<div className='manage-app'>
					<button onClick={() => this.setState({showForm: true}) }>edit</button>
					{this.state.showForm ? this.showForm() : null}
				</div>
		);
	}
}

function Contacts({ contacts }) {
	function getContacts () {
		let api_view_list = 'http://127.0.0.1:8000/api/v1/persons/'
		fetch(api_view_list)
		.then((response => response.json()))
		.then(contacts[1]);
	}

	function apiDelete(idToProcess) {
		let deleteURL = `http://127.0.0.1:8000/api/v1/persons/${idToProcess}/delete`
		fetch(deleteURL, { method: 'DELETE' })
		.then(alert('Delete successful'))
		.then(getContacts);
	}

	return (
	<div>
		{contacts[0].map((contact) => (
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">{contact.first_name + " " + contact.last_name}</h5>
					<p class="card-text">{"Phone: " + contact.phone}</p>
					<h6 class="card-subtitle mb-2 text-muted">{"Email: " + contact.email}</h6>
					<UpdateForm person={contact} setContact={contacts[1]}/>
					<button onClick={() => apiDelete(contact.id)}>delete</button>
				</div>
			</div>
		))}
	</div>
	)
};

function App() {
  const [contactList, setContactList] = useState(null)
	const api_view_list = 'http://127.0.0.1:8000/api/v1/persons/'

	useEffect(() => {
		fetch(api_view_list)
		.then((response => response.json()))
		.then(setContactList);
	}, []);

  if (contactList) {
		return (
			<div>
				<center><h1>Phone Book</h1></center>
				<div>
					<button>Add Contact</button>
					<Contacts contacts={[contactList, setContactList]} />
				</div>
			</div>
		)
  }
	return <div>Empty phone book</div>
}
export default App;








// import React, { Component } from 'react';
// import { render } from 'react-dom';
// class App extends Component {
//   state = {
// 	contacts: []
//   }

//   componentDidMount() {
// 	const api_url = 'http://127.0.0.1:8000/api/v1/persons/'
// 	fetch(api_url)
// 	.then(res => res.json())
// 	.then((data) => {
// 		this.setState({ contacts: data })
// 	})
// 	.catch(console.log)
//   };

	

//   render () {
// 	return (
// 		<div>
// 			<button>Add Contact</button>
// 			<Contacts contacts={this.state.contacts} />
// 		</div>
// 	)
//   }
// }
// export default App;