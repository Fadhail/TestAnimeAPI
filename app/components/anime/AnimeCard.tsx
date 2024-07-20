"use client";

import { useState, useEffect } from 'react';
import Navbar from '../globaly/Navbar';

const AnimeList = "https://api.jikan.moe/v4/top/anime";

interface ImageType {
  image_url: string;
}

interface Anime {
  title: string;
  images: {
    jpg: ImageType;
    webp: ImageType;
  };
  popularity: number;
  year: number;
  synopsis: string;
}

const Anime = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [filteredAnime, setFilteredAnime] = useState<Anime[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAnime = async () => {
      const response = await fetch(AnimeList);
      const data = await response.json();
      setAnimeList(data.data);
      setFilteredAnime(data.data);
    };
    fetchAnime();
  }, []);

  useEffect(() => {
    setFilteredAnime(
      animeList.filter(anime =>
        anime.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, animeList]);

  const truncateSynopsis = (synopsis: string, maxLength: number) => {
    if (synopsis.length <= maxLength) return synopsis;
    return synopsis.substring(0, maxLength) + '...';
  };

  return (
    <div>
      <Navbar onSearch={setSearchTerm} />
      <div className="pt-24"> {/* Add padding top to avoid overlap */}
        <div className="flex flex-wrap justify-center mt-12">
          {filteredAnime.map((anime) => (
            <div className="card glass w-96 m-4" key={anime.title}>
              <figure>
                <img src={anime.images.webp.image_url} alt={anime.title} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{anime.title}</h2>
                <p>{truncateSynopsis(anime.synopsis, 100)}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Selengkapnya</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Anime;
