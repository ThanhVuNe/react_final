import React from "react";
import { Link } from "react-router-dom";

import { OutlineButton } from "../components/button/Button";
import HeroSlide from "../components/hero-slide/HeroSlide";
import MovieList from "../components/movie-list/MovieList";

import { category, movieType, tvType } from "../api/tmdbApi";



const Home = () => {
  return (
    <>
      {/* <HeroSlide /> */}

      <div className="container" style={{marginTop: "9rem"}}>
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending Movies</h2>
            {/* <Link to={`/movie`}>
              <OutlineButton className="small">View more</OutlineButton>
            </Link> */}
          </div>
          <MovieList category={"movie"} type={"trending"} />
        </div>   
        
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Popular Movies</h2>
            {/* <Link to={`/movie`}>
              <OutlineButton className="small">View more</OutlineButton>
            </Link> */}
          </div>
          <MovieList category={"movie"} type={"popular"} />
        </div> 

         

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending Tv Show</h2>
            {/* <Link to={`/movie`}>
              <OutlineButton className="small">View more</OutlineButton>
            </Link> */}
          </div>
          <MovieList category={"tv"} type={"trending"} />
        </div> 

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Popular TV</h2>
            {/* <Link to={`/movie`}>
              <OutlineButton className="small">View more</OutlineButton>
            </Link> */}
          </div>
          <MovieList category={"tv"} type={"popular"} />
        </div>
      </div>
    </>
  );
};

export default Home;
