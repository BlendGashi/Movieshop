import React from 'react';
import { useLocalStorage } from "@uidotdev/usehooks"; 
import { Container } from 'react-bootstrap';
import Movie from '../components/Movie';

function FavMovies() {
  const [favourites, saveFavourites] = useLocalStorage("favourites", []);

  return (
    <section className='py-5'>
      <Container>
        <div className="row">
          {
                favourites && favourites.map(movie => <div className="col-3 mb-4" key={movie.id}>
                <Movie {...movie} isBookmarked={true} />
                </div>)
          }
        </div>
      </Container>
    </section>
  )
}

export default FavMovies