"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

interface Result {
  poster_path: string;
  title: string;
}

export default function Search() {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const [resultList, setResultList] = useState<Result[]>([]);
  const [keyword, setKeyword] = useState("");

  const searchMovie = async (query: string) => {
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=ko-kr`;
      const response = await axios.get(url);
      const data = await response.data;
      setResultList(data.results);
    } catch (error: any) {
      console.log(error);
    }
  };

  const onClickSearchButton = () => {
    searchMovie(keyword);
  };

  const onChangeKeyword = (event: any) => {
    setKeyword(event.target.value);
  };

  return (
    <>
      <div className="space-x-4">
        <label htmlFor="title">제목</label>
        <input
          onChange={onChangeKeyword}
          value={keyword}
          className="border-2 p-2"
          type="text"
          name="title"
          id="title"
        />
        <button
          className="inline-block rounded bg-blue-600 px-6 pb-2 pt-2.5 text-base font-medium uppercase leading-normal text-white"
          onClick={onClickSearchButton}
        >
          검색
        </button>
      </div>
      <div className="flex flex-wrap gap-4 container w-fit">
        {resultList?.map((item, i) => (
          <div key={i} className="w-[240px]">
            <div className="w-auto h-[340px] overflow-hidden">
              <Image
                src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
                alt="poster image"
                width={240}
                height={360}
              />
            </div>
            <div className="w-auto h-16">
              <p className="text-center py-4 font-medium text-lg break-all">
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
