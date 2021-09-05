import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function ContactApp() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contactList, setContactList] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const contact = {
      name: `${name}`,
      phoneNumber: `${phoneNumber}`,
    }
    contactList.push(contact);
    const sortedArray = contactList.sort((a, b) => {
      let nameA = a.name.toLowerCase(),
        nameB = b.name.toLowerCase();

      if (nameA < nameB) {
        return -1;
      }

      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });
    setContactList(sortedArray => [...sortedArray]);
    setName("");
    setPhoneNumber("");
  }


  return (
    <div className="container">
      <h2>Contact List</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input className="form-control" type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input className="form-control" type="text" name="phoneNumber" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
        </div>
        <button className="btn btn-primary mt-3">Add</button>
      </form>
      {
        contactList && contactList.length > 0 ?
          <div>
            <h3>List of Contact</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <td scope="col">Sr No</td>
                  <td scope="col">Name</td>
                  <td scope="col">Phone Number</td>
                </tr>
              </thead>
              <tbody>
                {contactList && contactList.map((contact, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.phoneNumber}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          : <label>Here you can see the list of contact. You have not added any contact yet!</label>
      }
    </div >
  )
}

ReactDOM.render(
  <ContactApp></ContactApp>,
  document.querySelector('#root')
);