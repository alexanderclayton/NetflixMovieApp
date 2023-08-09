//import//
import { useState, useEffect } from "react";
import axios from "axios";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { MainMovieResponse } from "../Types";
import { Movie } from "./Movie";

interface IRow {
  title: string;
  fetchURL: string;
  rowId: number;
}

export const Row: React.FC<IRow> = (props: IRow) => {
  const [movies, setMovies] = useState<MainMovieResponse[]>([]);

  useEffect(() => {
    axios.get(props.fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [props.fetchURL]);

  const slideLeft = (): void => {
    var slider: HTMLDivElement = document.getElementById('slider' + props.rowId) as HTMLDivElement
    slider.scrollLeft = slider.scrollLeft - 500
  }

  const slideRight = (): void => {
    var slider: HTMLDivElement = document.getElementById('slider' + props.rowId) as HTMLDivElement
    slider.scrollLeft = slider.scrollLeft + 500
  }

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{props.title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
          onClick={slideLeft}
        />
        <div
          id={"slider" + props.rowId}
          className="left-0 w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item, id) => (
            <Movie key={id} item={item} />
          ))}
        </div>
        <MdChevronRight
          className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block right-0"
          size={40}
          onClick={slideRight}
        />
      </div>
    </>
  );
};
