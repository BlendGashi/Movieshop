export function exists(movie, movies) {
    return movies.filter(m => m.id == movie.id).length > 0
}