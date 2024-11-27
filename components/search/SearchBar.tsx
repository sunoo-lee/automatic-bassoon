"use client";

import searchStore from "@/store/searchStore";
import axios from "axios";
import React, { useEffect, useState } from "react";

const SearchBar = React.memo(function SearchBar() {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const [keyword, setKeyword] = useState("");
  const setMovieList = searchStore((state) => state.setMovieList);
  const togglePopup = searchStore((state) => state.togglePopup);

  const searchMovie = async (query: string) => {
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=ko-kr`;
      const response = await axios.get(url);
      const data = await response.data;
      setMovieList(data.results);
    } catch (error: any) {
      console.log(error);
    }
  };

  const onClickSearchButton = () => {
    searchMovie(keyword);
  };

  const onChangeKeyword = (event: any) => {
    setKeyword(event.target.value);
    togglePopup(false);
  };

  useEffect(() => {
    searchMovie(keyword);
  }, [keyword]);

  return (
    <div className="fixed top-0 w-full pt-20 pb-4 z-50 bg-neutral-800">
      <div className="relative w-fit h-11 left-1/2 -translate-x-1/2 px-4">
        <input
          onChange={onChangeKeyword}
          value={keyword}
          className="p-2 px-6 rounded-3xl w-full md:w-64 h-full text-2xl  bg-neutral-400 text-white placeholder:text-white outline-none"
          type="text"
          name="title"
          id="title"
          placeholder="Search"
        />
        <button
          className="absolute right-3 inline-block rounded h-11 w-11 text-base font-medium uppercase leading-normal text-white"
          onClick={onClickSearchButton}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
});

export default SearchBar;
