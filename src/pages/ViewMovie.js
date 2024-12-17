import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { Button,Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useLocalStorage } from "@uidotdev/usehooks"; 

function ViewMovie() {
  const[movie, setMovie] = useState()
  const{id} = useParams()
 const src = (movie && movie.backdrop_path !== null) ? `http://image.tmdb.org/t/p/w500/${movie.backdrop_path}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM4sEG5g9GFcy4SUxbzWNzUTf1jMISTDZrTw&s"

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=3e52e2f5350ae60de5e2fc58e818d2a0`)
    .then(resp => {
        if(resp.status === 200) setMovie(resp.data)
        
    })
        .catch(error => console.log(error))
  }, [])

  return (
    <section className='py-5'>
      <Container>
    {
      movie && <div className="row">
        <div className="col-6">
        <img src={src} alt={movie.original_title} />
        <p className='my-4'>{movie.overview}</p>
        </div>
        <div className="col-6">
        <h2>{movie.original_title}</h2>
        <p classname="my-4">{movie.overview}</p>
        <table className='table table-bordered mb-4'>
          <tr>
            <td>Revenue</td>
            <td>{movie.revenue}</td>
          </tr>
          <tr>
            <td>Release date</td>
            <td>{movie.release_date}</td>
          </tr>
          <tr>
            <td>Vote avg.</td>
            <td>{movie.vote_average}</td>
          </tr>
        </table>
        <form className='form-inline me-4'>
          <input type="number" min={1} max={100} value={1} className='form-control' />
          <Button variant='outline-primary' type='submit'>Add to cart</Button>
        </form>
        <Button variant='outline-danger' type='submit'>Add to favourites</Button>
        </div>
      </div>
    }
    </Container>
    </section>
  )
}

export default ViewMovie