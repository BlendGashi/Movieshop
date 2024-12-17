import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Movie from "../components/Movie"
import { Link } from 'react-router-dom';

function LatestMovies() {
        const [movies, setMovies] =useState()

useEffect(()  => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=3e52e2f5350ae60de5e2fc58e818d2a0`)
    .then(resp => {
        if(resp.status === 200) setMovies(resp.data.results)
    })
        .catch(error => console.log(error))
}, [])

    return (
    <section className="py-5">
        <Container>
            <h2 className='mb-5 text-center'>Lastest movie</h2>
            <div className="row">
                {
                    movies && movies.slice(0,8).map(movie => <div className="col-3 mb-4" key={movie.id}>
                        <Movie {...movie} />
                    </div>)
                }
            </div>
            <div className='d-flex justify-content-center mt-5'>
            <Link to="/shop" className="btn btn-outline-secondary">Explore more &rarr;</Link>
            </div>
        </Container>
    </section>
    
  )
}

export default LatestMovies