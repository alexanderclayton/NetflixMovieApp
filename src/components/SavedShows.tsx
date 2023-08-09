//import//
import { useState, useEffect } from "react";
import { useAuthState, AuthStateHook } from "react-firebase-hooks/auth";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { auth, db } from "../firebase";
import { MainMovieResponse } from "../Types";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import MovieCard from "../assets/moviecard.png";

interface IMainMovieResponse extends MainMovieResponse {
  img: string;
}

export const SavedShows: React.FC = () => {
  const [movies, setMovies] = useState<IMainMovieResponse[]>([]);
  const [user]: AuthStateHook = useAuthState(auth);

  const slideLeft = (): void => {
    var slider: HTMLDivElement = document.getElementById(
      "slider"
    ) as HTMLDivElement;
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = (): void => {
    var slider: HTMLDivElement = document.getElementById(
      "slider"
    ) as HTMLDivElement;
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user?.email]);

  const movieRef = doc(db, "users", `${user?.email}`);

  const deleteMovie = async (passedId: number) => {
    try {
      const result = movies.filter((item) => item.id !== passedId);
      updateDoc(movieRef, {
        savedShows: result,
      });
      console.log("deleted from firestore");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.message as string);
      }
    }
  };

  return (
    <div>
      <h2 className="text-white font-bold md:text-xl p-4">My Shows</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
          onClick={slideLeft}
        />
        <div
          id={"slider"}
          className="left-0 w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item, id) => (
            <div
              key={id}
              className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
            >
              <img
                className="w-full h-auto block"
                src={
                  item?.backdrop_path === null
                    ? MovieCard
                    : `https://image.tmdb.org/t/p/w500${item?.img}`
                }
                alt={item?.title}
              />
              <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                <p className="whitespace-pre-wrap text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                  {item?.title}
                </p>
                <p
                  onClick={() => deleteMovie(item?.id)}
                  className="absolute text-gray-300 top-4 right-4"
                >
                  <AiOutlineClose />
                </p>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight
          className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block right-0"
          size={40}
          onClick={slideRight}
        />
      </div>
    </div>
  );
};
