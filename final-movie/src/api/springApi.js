
const springApi = {
    getAccountByEmail: (email) => {
        return fetch('http://localhost:8080/api/login/getByEmail/' + email)
            .then(response => response.json())
    },
    getAll: () => {
        return fetch('http://localhost:8080/api/movie/getAll')
            .then(response => response.json())
    },
    getMovieByGenre: (genre) => {
       return fetch('http://localhost:8080/api/movie/getMovieByGenres/' + genre)
            .then(response => response.json())
    },
    getMovieByCategory: (category) => {
        return fetch('http://localhost:8080/api/movie/getMovieByCategory/' + category)
            .then(response => response.json())
    },
    getDetail: (id) => {
        return fetch('http://localhost:8080/api/movie/getMovie/' + id)
            .then(response => response.json())
    },
    getMovieByKeyword: (keyword) => {
        return fetch('http://localhost:8080/api/movie/getMovieByKeyword/' + keyword)
            .then(response => response.json())
    },
    getAllCategory: () => {
        return fetch('http://localhost:8080/api/category/getAll')
            .then(response => response.json())
    },
    getCastByMovie: (id) =>{
        return fetch('http://localhost:8080/api/cast/byMovie/' + id).then(response => response.json())
    },
    getCategoryByMovie: (id) =>{
        return fetch('http://localhost:8080/api/category/byMovie/' + id).then(response => response.json())
    },
    getCommentsByMovie: (id) => {
        return fetch('http://localhost:8080/api/comment/byMovieDtoOrderByTime/' + id).then(response => response.json())
    }
    
}

export default springApi;