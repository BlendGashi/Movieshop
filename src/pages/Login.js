import React from 'react'
import { Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from "@uidotdev/usehooks"; 
import axios from 'axios';

function Login()  {
  const [user, saveUser] = useLocalStorage('user', {})
  const navigate = useNavigate()

  const handleLogin = e =>  {
    e.preventDefault() 
    const elements = e.target.elements
    const email = elements['email'].value
    const password = elements['password'].value

    axios(
      {
      method: 'GET',
      url: 'https://67643bae52b2a7619f5be822.mockapi.io/api/v1/users',
    }
    ).then(
      resp => {
        if(resp.status === 200) {
          const users = resp.data
          const user = users.filter(user => (user.email === email && user.password === password))

          if(user.length > 0){
            delete user[0].password
          saveUser({...user[0]}) 
          navigate ('/dashboard')
          } else {
            alert('User does not exist')
          }
        }
      }
    ).catch(e => console.log(e))
   }
  

  return (
    <section className='py-5'>
      <Container>
      <form onSubmit={handleLogin}>
      <Card className='w-50 mx-auto'>
      
      <Card.Body>
        <Card.Title>Login</Card.Title>
        <Card.Text>
          
        <Form.Control
          name="email"
          type='email'
          placeholder="Email"
          aria-label="Email"
          className='mb-3'
        />
        <Form.Control
          name="password"
          type='password'
          placeholder="Password"
          aria-label="Password"
          className='mb-3'
        />
        </Card.Text>
        <Button variant="outline-primary" type='submit' className='me-2'>Login</Button>
        <Link to="/register" className="btn btn-outline-secondary">Register</Link>
      </Card.Body>
      </Card>
      </form>
      </Container>
    </section>
  )
}


export default Login