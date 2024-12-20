import { useLocalStorage } from '@uidotdev/usehooks'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

function Cart() {
  const [cart, saveCart] = useLocalStorage('cart', [])
  const [total, setTotal] = useState(0.0)

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

  return (
    <section className='py-5'>
    <Container>
      {
        cart && <table className='table table-bordered'>
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
            <td colspan="3"></td>
            <td><b>${total.toFixed(2)}</b></td>
          </tr>
        </tfoot>
      </table>
      }
    </Container>
    </section>
  )
}

export default Cart