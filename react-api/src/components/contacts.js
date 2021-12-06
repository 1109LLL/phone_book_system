import React from 'react'

const Contacts = ({ contacts }) => {
    return (
    <div>
        <center><h1>Phone Book</h1></center>
        {contacts.map((contact) => (
        <div class="card">
            <div class="card-body">
            <h5 class="card-title">{contact.first_name + " " + contact.last_name}</h5>
            <p class="card-text">{"Phone: " + contact.phone}</p>
            <h6 class="card-subtitle mb-2 text-muted">{"Email: " + contact.email}</h6>
            </div>
        </div>
        ))}
    </div>
    )
};

export default Contacts