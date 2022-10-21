import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const Register = () => {
    const [error, setError] = useState(null)
    const [accepted,setAccepted] = useState(false)
    const { createUser,updateUserProfile,verifyEmail } = useContext(AuthContext)
    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.target
        const name = form.name.value
        const photoURL = form.photoURL.value
        const email = form.email.value
        const password = form.password.value
        console.log(name, photoURL, email, password)

        createUser(email, password)
            .then(result => {
                const user = result.user
                console.log(user) 
                form.reset()
                handleUserProfile(name,photoURL)
                handleEmailVerification()
                toast.success('please check your email')
                setError('')
            })
            .catch((error) => {
                console.log(error)
                setError(error.message)
            })
    }
    const handleAccepted = (event) => {
        console.log(event.target.checked)
        setAccepted(event.target.checked)
    }
    const handleUserProfile = (name,photoURL) => {
        const profile = {
            displayName: name,
            photoURL: photoURL
        }
        updateUserProfile(profile)
        .then( () => {})
        .catch( error => console.error(error))
    }
    const handleEmailVerification = () => {
        verifyEmail()
        .then( () => {})
        .catch( error => console.error(error))
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name:</Form.Label>
                <Form.Control name='name' type="text" placeholder="Enter Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Photo:</Form.Label>
                <Form.Control name='photoURL' type="text" placeholder="Enter PhotoURL" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control name='email' type="email" placeholder="Enter email" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control name='password' type="password" placeholder="Password" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check onClick={handleAccepted} type="checkbox" label={<>Accept <Link to='/terms'>Terms & conditions</Link></>} />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!accepted}>
                Register
            </Button>
            <p className='text-danger'><small>{error}</small></p>
        </Form>
    );
};

export default Register;