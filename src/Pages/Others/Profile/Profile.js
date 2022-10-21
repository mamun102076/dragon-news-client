import React, { useContext, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const Profile = () => {
    const {user} = useContext(AuthContext)
    const [name,setName] = useState(user.displayName)
    const photoURLRef = useRef(user.photoURL)

    const handleNameChange = (event) => {
        setName(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(photoURLRef.current.value)
    }
    return (
        <Form onSubmit={handleSubmit}>
            <h2>This is user profile</h2>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control defaultValue={user.email} name='email' type="text" placeholder="Enter Email" readOnly />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name:</Form.Label>
                <Form.Control onChange={handleNameChange} defaultValue={name} name='name' type="text" placeholder="Enter Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>PhotoURL:</Form.Label>
                <Form.Control ref={photoURLRef} defaultValue={user.photoURL} name='photoURL' type="text" placeholder="Enter PhotoURL" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default Profile;