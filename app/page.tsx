'use client';

import Navbar from './components/globaly/Navbar';
import { useEffect, useState } from 'react';

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

const HomePage = () => {
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
    <div className="overflow-hidden h-screen">
      <Navbar onSearch={setSearchTerm} />
      {/* Carousel Section */}
      <div className="relative w-full h-screen">
        {filteredAnime.slice(0, 4).map((anime, index) => (
          <div id={`slide${index + 1}`} className="carousel-item relative w-full h-full" key={anime.title}>
            <img
              src={anime.images.webp.image_url}
              className="w-full h-full object-cover"
              alt={anime.title}
            />
            <div className="absolute inset-0 flex items-center justify-center text-center text-white p-4 bg-black bg-opacity-50">
              <div>
                <h2 className="text-3xl font-bold mb-2">{anime.title}</h2>
                <p className="text-lg">{truncateSynopsis(anime.synopsis, 150)}</p>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-between px-4">
              <a href={`#slide${index === 0 ? 4 : index}`} className="btn btn-circle bg-gray-800 text-white">❮</a>
              <a href={`#slide${index === 3 ? 1 : index + 2}`} className="btn btn-circle bg-gray-800 text-white">❯</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
