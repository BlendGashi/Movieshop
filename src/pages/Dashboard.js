import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useLocalStorage } from '@uidotdev/usehooks';

function Dashboard() {
const [orders, setOrders] = useState()
const [user, saveUser] = useLocalStorage('user', {})

useEffect(() => {
  if(user && user.email){
    axios({
      method: 'GET',
      url: 'https://67643bae52b2a7619f5be822.mockapi.io/api/v1/users/${user.id}/orders',
    }).then(resp => {
      if(resp.status === 200){
        setOrders(resp.data)
      }
    }).catch(e => console.log(e))
  }
}, [])

  const handleDelete = e => {
    if( (user && user.email) && window.confirm('Are you sure you want to delete this user?')){
      
    const id = e.target.getAttribute('id')
    
    axios({
      method: 'DELETE',
      url: 'https://67643bae52b2a7619f5be822.mockapi.io/api/v1/orders',
      data: {id}
    }).then(
      resp => {
        // if (resp.status === 201) navigate('/login'); else alert('Something went wrong - try again');
        console.log(resp)
      }
    ).catch(e => console.log(e))
    }
  }

  return (
    <section className='py-5'>
      <Container>
        <h3 className='mb-4'>Orders</h3>
        {
          orders && <table className='table table-bordered'>
            <thead>
              <tr>
                <th>Costumer</th>
                <th>Items</th>
                <th>Address</th> 
                <td></td>
              </tr>
            </thead>
            <tbody>
              {
                orders.map(order => <tr key={order.id}>
                  <td>{'${user.name} ${user.surname}'}</td>
                  <td>
                    {
                      order.items && order.items.map(item => <p key={item.id}>{item.original_title}</p>)
                    }
                  </td>
                  <td>{order.address}</td>
                  <td>
                    <Button variant="outline-danger" id={order.id} onClick={handleDelete}>Cancel</Button>
                  </td>
                </tr>)
              }
            </tbody>
          </table>
        }
      </Container>
    </section>
  )
}

export default Dashboard