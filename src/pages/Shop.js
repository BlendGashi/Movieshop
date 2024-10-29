import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Movie from "../components/Movie"
import { Link } from 'react-router-dom';

function Shop() {
        const [page, setPage] =useState(1)
        const [movies, setMovies] =useState()
        const [totalPages, setTotalPages] =useState()


useEffect(()  => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=3e52e2f5350ae60de5e2fc58e818d2a0&page${page}`)
    .then(resp => {
        if(resp.status === 200) {
          setMovies(resp.data.results)
          setTotalPages(resp.data.total_pages)}
    })
        .catch(error => console.log(error))
        }, [page])

const handlePrevPage = e => {
  e.preventDefault()

  if(page>1) {
    setPage(page => page - 1)
  }
}

const handleNextPage = e => {
  e.preventDefault()

  if(page < totalPages) {
    setPage(page => page + 1)
  }
}

  return (
    <section className="py-5">
        <Container>
          <div className='d-flex justify-content-between align-items-center bg-light p-4 mb-5'>
            <input type="search" className="form-control w-50" placeholder='Search movies ...'/>
            <div>
              <a href='#' onClick={handlePrevPage} class="btn btn-sm btn-outline-primary me-3">Prev</a>
              <a href='#' onClick={handleNextPage} class="btn btn-sm btn-outline-primary">Next</a>
            </div>
          </div>
            <div className="row">
                {
                    movies && movies.map(movie => <div className="col-3 mb-4" key={movie.id}>
                        <Movie {...movie} />
                    </div>)
                }
            </div>
        </Container>
    </section>
    
  )
}

export default Shop