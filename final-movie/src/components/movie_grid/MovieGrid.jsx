import React, { useState, useEffect, useCallback } from "react";
import MovieCard from "./../movie-card/MovieCard";
import { useHistory, useParams } from "react-router";
import "./movie-grid.scss";
import Button, { OutlineButton } from "../button/Button";
import Input from "../input/Input";
import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";
const MovieGrid = (props) => {
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();

  const [top50, setTop50] = useState(false);
  useEffect(() => {
    const getList = async () => {
      let response = null;

      if (keyword === undefined) {
        const params = {};
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(movieType.upcoming, {
              params,
            });
            break;
          case category.top50:
            response = await tmdbApi.getMoviesList(movieType.top_rated, {
              params,
            });
            break;
          default:
            console.log("default");
            response = await tmdbApi.getTvList(tvType.popular, { params });
        }
      } else {
        const params = {
          query: keyword,
        };
        response = await tmdbApi.search(props.category, { params });
      }
      //top 50 nên chỉ có 3 trang, mỗi trang 20 phim, trang thứ 3 là 10 phim
      if (props.category == category.top50) {
        setTotalPage(3);
        setTop50(true);
      } else {
        setTop50(false);
        setTotalPage(response.total_pages);
      }
      console.log(response.results);
      setItems(response.results);
    };
    getList();
  }, [keyword, props.category]);

  const loadMore = async () => {
    let response = null;

    if (keyword === undefined) {
      const params = {
        page: page + 1,
      };
      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming, {
            params,
          });
          break;
        case category.top50:
          response = await tmdbApi.getMoviesList(movieType.top_rated, {
            params,
          });
        default:
          response = await tmdbApi.getTvList(tvType.popular, { params });
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };
      response = await tmdbApi.search(props.category, { params });
    }
    if (top50) {
      if (page == 2) {
        response.results = response.results.slice(0, 10);
      }
    }
    setItems([...items, ...response.results]);
    setPage(page + 1);
  };

  return (
    <>
      {top50 ? <h1 style={{ fontWeight: "bold", fontSize: "3em", marginBottom: "40px", textAlign: "center" }}>Top 50 Movies</h1> :
        <div className="section mb-3">
          <MovieSearch category={props.category} keyword={keyword} />
        </div>
      }

      <div className="movie-grid">
        {items.map((item, index) => (
          <MovieCard key={index} category={props.category} item={item} />
        ))}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      ) : (
        ""
      )}
    </>
  );
};


const MovieSearch = (props) => {
  const history = useHistory();

  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      history.push(
        `/${category[props.category]}/search/${keyword}`
      );
    }
  }, [keyword, props.category, history]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [goToSearch]);

  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button className="small" onClick={goToSearch}>
        Search
      </Button>
    </div>
  );
};

export default MovieGrid;