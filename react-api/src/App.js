import React, { useState, useEffect } from 'react';
import Axios from 'axios';


function PostForm(props) {

	const [attrsForm, setAttrsForm] = useState({
		showForm: false
	})

	const [personDetail, setPersonDetail] = useState({...props.person})

	let updateURL = `http://127.0.0.1:8000/api/v1/persons/${props.person.id}/update`

	function handleSubmit(event) {
		event.preventDefault();
		Axios.patch(updateURL, {
									first_name: personDetail.first_name,
									last_name: personDetail.last_name,
									phone: parseInt(personDetail.phone,10),
									email:personDetail.email
		})
		.then(res => {console.log(res.data)})
	}

	function handleChange(event) {
		const updatedData = {...personDetail}
		updatedData[event.target.id] = event.target.value
		setPersonDetail(updatedData)
	}

	function showForm () {
		return (
			<div>
				<form onSubmit={(event) => handleSubmit(event)}>
					<label>
						First name: <input type="text" id="first_name" defaultValue={props.person.first_name} onChange={handleChange}/>
					</label>
					<label>
						Last name: <input type="text" id="last_name" defaultValue={props.person.last_name} onChange={handleChange}/>
					</label>
					<label>
						Phone: <input type="number" id="phone" defaultValue={props.person.phone} onChange={handleChange}/>
					</label>
					<label>
						Email: <input type="text" id="email" defaultValue={props.person.email} onChange={handleChange}/>
					</label>
					<button>Save</button>
				</form>
			</div>
		)
	}

	return (
		<div>
			<button onClick={() => setAttrsForm({showForm: !attrsForm.showForm}) }>edit</button>
			{attrsForm.showForm ? showForm() : null}
		</div>
	);
}


function Contacts({ contacts }) {
	function getContacts () {
		let api_view_list = 'http://127.0.0.1:8000/api/v1/persons/'
		fetch(api_view_list)
		.then((response => response.json()))
		.then(contacts[1]); //call setContactList to automatically refresh the page with values in response
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
				<div className="card" key={contact.id}>
					<div className="card-body">
						<h5 className="card-title">{contact.first_name + " " + contact.last_name}</h5>
						<p className="card-text">{"Phone: " + contact.phone}</p>
						<h6 className="card-subtitle mb-2 text-muted">{"Email: " + contact.email}</h6>
						<PostForm person={contact} setContact={contacts[1]}/>
						<button onClick={() => apiDelete(contact.id)}>delete</button>
					</div>
				</div>
			))}
		</div>
	)
};


function AddContact(props) {
	const [attrsForm, setAttrsForm] = useState({
		showForm: false
	})

	const [personDetail, setPersonDetail] = useState({
		first_name: "",
		last_name: "",
		phone: "",
		email: ""
	})

	const postURL = 'http://127.0.0.1:8000/api/v1/persons/new'

	function handleSubmit(event) {
		event.preventDefault();
		Axios.post(postURL, {
									first_name: personDetail.first_name,
									last_name: personDetail.last_name,
									phone: parseInt(personDetail.phone,10),
									email: personDetail.email
		})
		.then(res => {console.log(res.data)})
	}

	function handleChange(event) {
		const updatedData = {...personDetail}
		updatedData[event.target.id] = event.target.value
		setPersonDetail(updatedData)
	}

	function showForm () {
		return (
			<div>
				<form onSubmit={(event) => handleSubmit(event)}>
					<label>
						First name: <input type="text" id="first_name" onChange={handleChange}/>
					</label>
					<label>
						Last name: <input type="text" id="last_name" onChange={handleChange}/>
					</label>
					<label>
						Phone: <input type="number" id="phone" onChange={handleChange}/>
					</label>
					<label>
						Email: <input type="text" id="email" onChange={handleChange}/>
					</label>
					<button>Save</button>
				</form>
			</div>
		)
	}

	return (
		<div>
			<button onClick={() => setAttrsForm({showForm: !attrsForm.showForm}) }>Add Contact</button>
			{attrsForm.showForm ? showForm() : null}
		</div>
	);
}

function App() {
  const [contactList, setContactList] = useState(null)
	const api_view_list = 'http://127.0.0.1:8000/api/v1/persons/'

	useEffect(() => {
		fetch(api_view_list)
		.then((response => response.json()))
		.then(setContactList);
	}, []);

  if (contactList) {
		// const contactListObj = contactList.map((contact, i) => ({id: i,}))
		return (
			<div>
				<center><h1>Phone Book</h1></center>
				<div>
					<AddContact />
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