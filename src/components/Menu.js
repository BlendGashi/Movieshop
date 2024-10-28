import React from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';


function Menu() {

  const handleLogout = e =>{
    e.preventDefault()
  }
  return (
    <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/shop">Shop</Nav.Link>
            <Nav.Link href="/favourits">Favourites</Nav.Link>
            <Nav.Link href="/cart">Cart (0)</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              <NavDropdown.Item href="/register">Register</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
              <NavDropdown.Item href="#" onClick={handleLogout} >Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
  )
}

export default Menu