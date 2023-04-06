import React, { useState, useEffect } from "react";
import MovieCard from "./../movie-card/MovieCard";
import { useParams } from "react-router";
import "./movie-grid.scss";
import Button, { OutlineButton } from "../button/Button";
import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";
const MovieGrid2 = (props) => {
    const [items, setItems] = useState([]);

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const { keyword } = useParams();


    useEffect(() => {
        const getList = async () => {
            let response = null;
            
            if (keyword === undefined) {    
                const params = {
                    with_genres: props.id
                };
                response = await tmdbApi.getMoviesGenres({ params })
                console.log(response.results);
            } else {
                const params = {
                    query: keyword,
                };
                response = await tmdbApi.search(props.category, { params });
            }
            setItems(response.results);
            setTotalPage(response.total_pages);
        };
        getList();
    }, [keyword, props.name]);

    const loadMore = async () => {
        let response = null;

        if (keyword === undefined) {
            const params = {
                page: page + 1,
                with_genres: props.id
            };
            const params1 = {
                with_genres: props.id
            };
            response = await tmdbApi.getMoviesGenres({ params})
        } else {
            const params = {
                page: page + 1,
                query: keyword,
            };
            response = await tmdbApi.search(props.category, { params });
        }
        setItems([...items, ...response.results]);
        setPage(page + 1);
    };

    return (
        <>
            {/* <div className="section mb-3">
          <MovieSearch category={props.category} keyword={keyword} />
        </div> */}
            <h1 style={{ fontWeight: "bold", fontSize: "3em", marginBottom: "40px", textAlign: "center" }}>{props.name}</h1>
            <div className="movie-grid">
                {items.map((item, index) => (
                    
                    <MovieCard key={index} category={"movie"} item={item} />
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

export default MovieGrid2;