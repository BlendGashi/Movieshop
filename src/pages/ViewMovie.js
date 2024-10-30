import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

function ViewMovie() {
  const[movie, setMovie] = useState()
  const{id} = useParams()
 const src = (movie.backdrop_path !== null) ? `http://image.tmdb.org/t/p/w500/${movie.backdrop_path}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM4sEG5g9GFcy4SUxbzWNzUTf1jMISTDZrTw&s"

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
        </div>
      </div>
    }
    </Container>
    </section>
  )
}

export default ViewMovie