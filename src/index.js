import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, Field, useFormik } from 'formik';
import * as Yup from 'yup';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function ContactApp() {
  const [contactList, setContactList] = useState([]);

  // const phoneRegExp = "/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/"
  const phoneRegExp = "^((\\+1-?))[0-9]{10}$"

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    userType: Yup.string()
      .required('Required')
  });

  const onSubmit = (values, resetForm) => {
    console.log(values);

    contactList.push(values);

    contactList.sort((a, b) => {
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
    setContactList(contactList => [...contactList]);

    resetForm();
  }

  const formInitialState = {
    name: '',
    phoneNumber: '',
    email: '',
    userType: ''
  }

  return (
    <div className="container">
      <h2>Contact App</h2>

      <Formik
        initialValues={formInitialState}
        validationSchema={SignupSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values, resetForm);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field name="name" className="form-control" />
              {errors.name && touched.name ? (
                <div>{errors.name}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <Field name="phoneNumber" className="form-control" />
              {errors.phoneNumber && touched.phoneNumber ? (
                <div>{errors.phoneNumber}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" className="form-control" />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
            </div>
            <div className="form-group">
              <label htmlFor="userType">User Type</label>
              <Field as="select" name="userType" className="form-control">
                <option>Choose a user type</option>
                <option value="admin">Admin</option>
                <option value="supplier">Supplier</option>
                <option value="user">User</option>
              </Field>
              {errors.userType && touched.userType ? <div>{errors.userType}</div> : null}
            </div>
            <button type="submit" className="btn btn-primary mt-2">Submit</button>
          </Form>
        )}
      </Formik>
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
                  <td scope="col">Email</td>
                  <td scope="col">User Type</td>
                </tr>
              </thead>
              <tbody>
                {contactList && contactList.map((contact, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.phoneNumber}</td>
                    <td>{contact.email}</td>
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