import { useLocalStorage } from '@uidotdev/usehooks'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Button } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
  const [cart, saveCart] = useLocalStorage('cart', [])
    const [user, saveUser] = useLocalStorage('user', {})
  const [total, setTotal] = useState(0.0)
  const navigate = useNavigate()

  useEffect(() => {
    setTotal(cart.reduce((sum, movie) => sum + (movie.qty * parseFloat(movie.vote_average)), 0.0))
  }, [cart])

  const handleDecQty = e => {
    const index = e.target.getAttribute('index')
    
    saveCart([...cart.map((item, key) => {
      return (key == index) ? {...item, qty: item.qty - 1}: item
    })])
  }

  const handleIncQty = e => {
    const index = e.target.getAttribute('index')

    saveCart([...cart.map((item, key) => {
      return (key == index) ? {...item, qty: item.qty + 1}: item
    })])
  }

  const handleDelete = e => {
    const index = e.target.getAttribute('index')
    
    if(window.confirm('Are you sure you want to delete this item?')){
      saveCart([...cart.filter((movie, key) => key != index)])
      alert('Item was deleted successfully.')
    }
  }

  const handleOrderCreation = e => {
    e.preventDefault()
    const elements = e.target.elements
    const address = elements['address'].value

    axios(
      {
        method: 'POST',
        url: 'https://67643bae52b2a7619f5be822.mockapi.io/api/v1/orders',
        data:{userId: user.id, items: cart, address}
      }
    ).then(resp => {
      if (resp.status === 201){
      saveCart([])
      navigate('/dashboard')
      }else {
        alert('Something went wrong - try again');
      }
    }).catch(e => console.log(e))
  }

  return (
    <section className='py-5'>
    <Container>
      {
        (cart && cart.length > 0) ? <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
      {
        cart.map((movie, index) => <tr key={movie.id}>
          <td>{movie.original_title}</td>
          <td>
            <Button variant="outline-primary me-2"index={index} onClick={handleDecQty}>-</Button>
            {movie.qty}
            <Button variant="outline-primary mx-2"index={index} onClick={handleIncQty}>+</Button>
          </td>
          <td>${parseFloat(movie.vote_average).toFixed(2)}</td>
          <td>${(movie.qty * parseFloat(movie.vote_average)).toFixed(2)}</td>
          <td> <Button variant="outline-danger"index={index} onClick={handleDelete}>Delete</Button></td>
        </tr>)
      }
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3"></td>
            <td><b>${total.toFixed(2)}</b></td>
          </tr>
        </tfoot>
      </table> : (cart && cart.length > 0) && <p><b>Cart is empty!</b></p>
      }
      {
        (user && user.email) ? <>
        <h3>Checkout</h3>
        <form onSubmit={handleOrderCreation}>
          <FloatingLabel controlId="address" label="Address">
            <Form.Control
              name="address"
              as="textarea"
              placeholder="Enter your address"
              className='mb-2'
              style={{ height: '100px' }}
            />
          </FloatingLabel>
          <Button type="submit" variant="outline-primary">Submit</Button>
        </form>
        </> : (cart && cart.length > 0) && <p>Please <Link to="/login">login</Link> first.</p>
      }
    
    </Container>
    </section>
  )
}

export default Cart