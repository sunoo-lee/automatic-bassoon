"use client";

import Searcher from "@/components/search/Searcher";
import authStore from "@/store/authStore";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string;
  const CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET as string;

  const [result, setResult] = useState([]);
  const setToken = authStore((state) => state.setToken);
  const token = authStore((state) => state.token);

  const [resultList, setResultList] = useState([]);
  const [keyword, setKeyword] = useState<string>("");

  const getSpotifyToken = async () => {
    const params = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });

    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        params.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { access_token: token } = await response.data;
      console.log(token);
      setToken(token);
      return token;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const onClickAlbumButton = async (keyword: string) => {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${keyword}&type=album`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(await response);

    const {
      albums: { items: data },
    } = await response.data;
    setResultList(data);
    console.log(data);
  };

  const onClickButton = async () => {
    const data = await getSpotifyToken();

    await onClickAlbumButton(keyword);
  };

  const onChangeKeyword = (event: any) => {
    setKeyword(event.target.value);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-20 gap-16">
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
          onClick={onClickButton}
        >
          검색
        </button>
      </div>
      <div className="flex flex-wrap gap-4 container w-fit">
        {resultList && (
          <>
            {resultList.map((item, i) => (
              <div key={i} className="w-[280px] text-center space-y-2">
                <Image
                  src={item?.images[0].url}
                  alt="album image"
                  height={280}
                  width={280}
                />
                <div>{item.name}</div>
              </div>
            ))}
          </>
        )}
        {/* {result.images && (
          <div>
            <Image
              src={result.images[0].url}
              alt="album image"
              width={300}
              height={300}
            />
          </div>
        )}
        {result.name && <div>{result.name}</div>}
        {result.tracks && (
          <div>
            {result.tracks.items.map((item, i) => (
              <li key={i}>{item.name}</li>
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
}
