import { useEffect, useState } from "react";
import axios from "axios";
import Detail from "../detail/Detail";
import { Link } from "react-router-dom";

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const [Datemovies, setDateMovies] = useState({});
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);

  const [modal, setModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleGetApiMovie = async () => {
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=1ec08ba7137001dfc6d58ae5b5d0fbd6&language=en-US&page=1"
      );
      setMovies(res.data.results);
      setDateMovies(res.data.dates);
      setFilter(res.data.results);
      console.log(res.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetApiMovie();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const results = movies.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilter(results);
  };

  const handleMovieDetail = (movie) => {
    setSelectedMovie(movie);
    setModal(true);
  };

  const handleAddMovie = () => {
    const movieToAdd = movies[0];
    setMovies([...movies, movieToAdd]);
    setFilter([...filter, movieToAdd]);
    alert("Film berhasil ditambahkan!");
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);
  };

  const handleDeleteMovie = (movieId) => {
    const updatedMovies = movies.filter((movie) => movie.id !== movieId);
    setMovies(updatedMovies);
    setFilter(updatedMovies);
    alert("Film berhasil dihapus!");
  };

  return (
    <div className="w-screen h-auto flex items-center flex-col">
      <div className="mb-4 flex ">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            className="border p-2"
            placeholder="Search movie..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-4 py-2 ml-2">
            Search
          </button>

          <button
            className="bg-green-500 text-white px-4 py-2 ml-2"
            onClick={handleAddMovie}
          >
            ADD
          </button>
        </form>
      </div>

      <div className="flex flex-wrap gap-4">
        {filter.map((movie, i) => (
          <div key={i} className="w-64 p-4 border rounded shadow">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-40 object-cover rounded"
            />
            <h1 className="text-xl font-bold mt-2">{movie.title}</h1>
            <p className="text-sm text-gray-600 mt-1">{movie.overview}</p>
            <div className="mt-2 space-y-2">
              <div className="flex items-center text-lg text-red-500 font-semibold">
                Popularity: {movie.popularity}
              </div>

              <div className="flex items-center text-lg text-blue-500 font-semibold">
                Release Date: {movie.release_date}
              </div>

              <div className="flex items-center text-lg text-green-500 font-semibold">
                {movie.vote_average}
              </div>
            </div>
            <div className="flex gap-2">
              <h1>{Datemovies.minimum}</h1> to <h1>{Datemovies.maximum}</h1>
            </div>

            <Link to={`/detail/${movie.id}`}>
              <button
                className="bg-blue-500 text-white px-4 py-2 mb-auto"
                onClick={() => handleMovieDetail(movie)}
              >
                Details
              </button>
            </Link>

            <button
              className="bg-red-500 text-white px-4 py-2 ml-2"
              onClick={() => handleDeleteMovie(movie.id)} // Delete the movie
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {modal && selectedMovie && (
        <Detail movie={selectedMovie} closeModal={() => setModal(false)} />
      )}
    </div>
  );
};
