import { useLocalStorage } from '@uidotdev/usehooks'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'

function Cart() {
  const [cart, saveCart] = useLocalStorage('cart', [])
  const [total, setTotal] = useState(0.0)

  useEffect(() => {
    setTotal(cart.reduce((sum, movie) => sum + (movie.qty * parseFloat(movie.vote_average)), 0.0))
  }, [])



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
          </tr>
        </thead>
        <tbody>
      {
        cart.map(movie => <tr key={movie.id}>
          <td>{movie.original_title}</td>
          <td>
            {movie.qty}
            </td>
          <td>${parseFloat(movie.vote_average).toFixed(2)}</td>
          <td>${(movie.qty * parseFloat(movie.vote_average)).toFixed(2)}</td>
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