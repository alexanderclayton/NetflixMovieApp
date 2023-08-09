//import
import { useState } from "react";
import { useAuthState, AuthStateHook } from "react-firebase-hooks/auth";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { MainMovieResponse } from "../Types";
import { auth, db } from "../firebase";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import MovieCard from '../assets/moviecard.png'

interface IMovie {
    item: MainMovieResponse
}

export const Movie: React.FC<IMovie> = ({item}) => {
  const [like, setLike] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  
  const [user]: AuthStateHook = useAuthState(auth)

  const movieId = doc(db, 'users', `${user?.email}`)

  const saveMovie = async () => {
    if (user?.email) {
      setLike(!like)
      setSaved(true)
      await updateDoc(movieId, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path
        })
      })
      console.log('saved show to firestore!')
    } else {
      alert('please log in to save a movie')
    }
  }

  return (
    <div
      key={item?.id}
      className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
    >
      <img
        className="w-full h-auto block"
        src={item?.backdrop_path === null ? MovieCard : `https://image.tmdb.org/t/p/w500${item?.backdrop_path}`}
        alt={item?.title}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <p className="whitespace-pre-wrap text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
          {item?.title}
        </p>
        <p onClick={saveMovie}>
          {like ? (
            <FaHeart className="absolute top-4 left-4 text-gray-300" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
          )}
        </p>
      </div>
    </div>
  );
};
