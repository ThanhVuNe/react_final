
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import tmdbApi from "../api/tmdbApi";
import apiConfig from "../api/apiConfig";
import "./detail.scss";
import CastList from "./CastList";
const Detail = () => {
  const { category, id } = useParams();
  console.log(category, id);
  const [item, setItem] = useState(null);
  const [videoName, setVideoName] = useState('');
  const [videoLink, setVideoLink] = useState('');
  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
      // window.scrollTo(0, 0);
    };
    getDetail();
  }, [category, id]);
  //call api tmdb movie by id

  useEffect(() => {
    const getVideos = async () => {
      const response = await tmdbApi.getVideos(category, id);
      setVideoName(response.results[0].name);
      setVideoLink(response.results[0].key);
    };
    getVideos();
  }, [category, id]);

  // const iframeRef = useRef(null);

  // useEffect(() => {
  //   // const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
  //   iframeRef.current.setAttribute("height", "500px");
  // }, []);
  return (
    <>
      {item && (
        <>
          {/* <div
                className="banner"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.backdrop_path || item.poster_path
                  )})`,
                }}
              ></div> */}

          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.backdrop_path || item.poster_path
                  )})`,
                }}
              ></div>
            </div>

            <div className="movie-content__info">
              <h1 className="title">{item.title || item.name}</h1>
              <div className="genres">
                {item.genres &&
                  item.genres.slice(0, 5).map((genre, index) => (
                    <Link to={"/genres/"+genre.name+"/"+genre.id} key={index} className="genres__item">
                      {genre.name}
                    </Link>
                  ))}
              </div>
              <p className="overview">{item.overview}</p>
              <div className="cast">
                <div className="section__header">
                  <h2>Casts</h2>
                </div>

                <CastList id={item.id} />
              </div>
            </div>
          </div>

          <div className="container">
            <div className="section mb-3">
              {/* <VideoList id={item.id} />
                   */}
              {videoName ? (
                <div className="video">
                  <div className="video__title">
                    <h2>{videoName}</h2>
                  </div>
                  <iframe
                    src={`https://www.youtube.com/embed/${videoLink}`}
                    height={800}
                    width="100%"
                    title="video"
                  ></iframe>
                </div>
              ): (<h2 style={{fontSize:"30px",textAlign: "center"}}>No Trailer</h2>)
              }

            </div>

            {/* <div className="section mb-3">
                  <div className="section__header mb-2">
                    <h2>Similar</h2>
                  </div>
                  <MovieList category={category} type="similar" id={item.id} />
                </div> */}
          </div>
        </>
      )}
    </>
  );
}

export default Detail;