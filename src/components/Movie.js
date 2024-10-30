import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function Movie({id, original_title, backdrop_path, popularity, vote_average}) {
  const src = (backdrop_path !== null) ? `http://image.tmdb.org/t/p/w500/${backdrop_path}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM4sEG5g9GFcy4SUxbzWNzUTf1jMISTDZrTw&s"
  return (
    <Card>
      <Card.Img variant="top" style={{height:"171px"}} src={src} />
      <Card.Body>
        <Card.Title style={{height: "50px"}}>{original_title}</Card.Title>
        <div className='d-flex justify-content-between align-items-center' >
        <Card.Text>
          Popularity: {popularity}
          <br/>
          Vote avg: {vote_average}
        </Card.Text>
        <Link to={`/movie/${id}`} className="btn btn-outline-primary">&rarr;</Link>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Movie