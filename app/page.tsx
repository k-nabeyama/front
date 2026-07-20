"use client";

import { useEffect, useState } from "react";

const optionsNumSearches = [
  { value: '1', label: '1' },
  { value: '5', label: '5' },
  { value: '10', label: '10' },
  { value: '20', label: '20' },
];

export default function Home() {

  const BACKEND = 'https://backend-git-main-otameshi2.vercel.app';

  const [trends, setTrends] = useState<string[]>([]);
  const [keyword, setKeyword] = useState("");
  const [videos, setVideos] = useState<any[]>([]);
  const [numSearches, setNumSearches] = useState('5');

  // useEffect(() => {
  //   fetch(`${BACKEND}/trends`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setTrends(data.trends);
  //     });
  // }, []);

  const searchVideos = async () => {

    const res = await fetch(`${BACKEND}/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify({ keyword, numSearches, }),
    }
    );

    const data = await res.json();
    //console.log(data.items);
    setVideos(data.items);
  };

  const getComment = async (video_id:string) => {
    console.log("video_id",video_id);
    const res = await fetch(`${BACKEND}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify({ "videoId":video_id}),
    });

    // const data = await res.json();
    
    // console.log(data);
  }


  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold mb-6">
        YouTube Analyze
      </h1>

      <div className="mb-6">
        <input
          className="border p-2 mr-2"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="検索キーワード"
        />

        <select
          value={numSearches}
          onChange={(e) => setNumSearches(e.target.value)}
        >
          {optionsNumSearches.map((option) => (
            <option key={option.value} value={option.value} >
              {option.label}
            </option>))
          }
        </select>

        <button
          className="bg-black text-white px-4 py-2"
          onClick={searchVideos}
        >
          検索
        </button>
      </div>

      <div>
        {videos.map((video) => (

          <div
            key={video.id}
            className="mb-6 border-b pb-4"
          >
            <img
              src={video.snippet.thumbnails.medium.url}
              alt=""
            />

            <h2 className="font-bold mt-2">
              {video.snippet.title}
            </h2>

            <p>
              {video.snippet.channelTitle}
            </p>
            <p>
              再生回数：{video.statistics.viewCount}
            </p>
            <p>
              高評価：{video.statistics.likeCount}
            </p>
            <p>
              低評価：{video.statistics.dislikeCount}
            </p>
            <p>
              お気に入り数：{video.statistics.favoriteCount}
            </p>
            <p>
              コメント数：{video.statistics.commentCount}
            </p>
            <button
              className="bg-black text-white px-4 py-2"
              onClick={() => getComment(video.id)}
            >
              コメント取得
            </button>
          </div>
        ))}
      </div>

    </main>
  );
}