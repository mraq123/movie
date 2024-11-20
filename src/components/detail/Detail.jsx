import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Impor useParams
import axios from "axios";

const Detail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const getMovieDetail = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
      );
      setMovie(res.data);
    } catch (error) {
      console.error("Error fetching movie details", error);
    }
  };

  useEffect(() => {
    getMovieDetail();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-3/4 md:w-1/2">
        <button
          className="text-black-500 absolute right-96 font-semibold"
          onClick={() => window.history.back()}
        >
          X
        </button>
        <h2 className="text-2xl font-bold mb-4">{movie.title}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-64 object-cover mb-4"
        />
        <p className="text-sm text-gray-600 mb-4">{movie.overview}</p>
        <h3 className="text-lg text-blue-500">
          Release Date: {movie.release_date}
        </h3>
        <h3 className="text-lg text-green-500">
          Vote Average: {movie.vote_average}
        </h3>
        <h3 className="text-lg text-red-500">Popularity: {movie.popularity}</h3>
      </div>
    </div>
  );
};

export default Detail;
