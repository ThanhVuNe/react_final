import React from "react";

import { useParams } from "react-router";
import MovieGrid from "../components/movie_grid/MovieGrid";



import { category as cate } from "./../api/tmdbApi";

const Catalog = () => {
  const { category } = useParams();

  console.log(category);

  return (
    <>
      {/* <PageHeader>
        {category === cate.movie ? "Movies" : "TV Series"}
      </PageHeader> */}

      <div className="container" style={{marginTop: "150px"}}>
        <div className="section mb-3">
          <MovieGrid category={category} />
        </div>
      </div>
    </>
  );
};

export default Catalog;
