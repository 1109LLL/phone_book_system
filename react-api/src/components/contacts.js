import { useState, useEffect, Componentent } from 'react';

const Contacts = ({ contacts }) => {
	const [contactList, setContactList] = useState(contacts)

	function fetch_api_delete(idToDelete) {
		fetch(`http://127.0.0.1:8000/api/v1/persons/${idToDelete}/delete`, { method: 'DELETE' })
		.then(alert('Delete successful'))
	}

	return (
	<div>
		<center><h1>Phone Book</h1></center>
		{contacts.map((contact) => (
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">{contact.first_name + " " + contact.last_name}</h5>
					<p class="card-text">{"Phone: " + contact.phone}</p>
					<h6 class="card-subtitle mb-2 text-muted">{"Email: " + contact.email}</h6>
					<button>edit</button>
					<button onClick={() => fetch_api_delete(contact.id)}>delete</button>
				</div>
			</div>
		))}
	</div>
	)
};

export default Contacts