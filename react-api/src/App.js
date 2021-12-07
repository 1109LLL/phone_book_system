import React, { useState, useEffect } from 'react';
// import Contacts from './components/contacts';

function Contacts({ contacts }) {
	function getContacts () {
		let api_view_list = 'http://127.0.0.1:8000/api/v1/persons/'
		fetch(api_view_list)
		.then((response => response.json()))
		.then(contacts[1]);
	}

	function apiUpdate(idToProcess) {
		let updatedAttrs = {}

		let updateURL = `http://127.0.0.1:8000/api/v1/persons/${idToProcess}/update`
		fetch(updateURL, { method: 'PATCH', 
												body: JSON.stringify(updatedAttrs)}, )
		.then(alert('Delete successful'))
		.then(getContacts);
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
					<button onClick>edit</button>
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