import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function ContactApp() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [userType, setUserType] = useState("");
  const [contactList, setContactList] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const contact = {
      name: `${name}`,
      phoneNumber: `${phoneNumber}`,
      bio: `${bio}`,
      userType: `${userType}`
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
    clearForm();
  }

  const clearForm = () => {
    setName("");
    setPhoneNumber("");
    setBio("");
    setUserType("user");
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
        <div className="mb-3">
          <label className="form-label">Profile Image</label>
          <input className="form-control" type="file" onChange={e => console.log(e.target.files)} />
        </div>
        <div className="form-group">
          <label>User Type</label>
          <select className="form-control" value={userType} onChange={e => setUserType(e.target.value)}>
            <option>Choose a user type</option>
            <option value="admin">Admin</option>
            <option value="supplier">Supplier</option>
            <option value="user">User</option>
          </select>
        </div>
        <div className="form-group">
          <label>Bio</label>
          <textarea className="form-control" row="10" value={bio} onChange={e => setBio(e.target.value)}></textarea>
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
                  <td scope="col">Bio</td>
                  <td scope="col">User Type</td>
                </tr>
              </thead>
              <tbody>
                {contactList && contactList.map((contact, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.phoneNumber}</td>
                    <td>{contact.bio}</td>
                    <td>{contact.userType}</td>
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