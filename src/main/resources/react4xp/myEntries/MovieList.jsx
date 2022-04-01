import React from 'react'

import './MovieList.scss';

import Movie from "../shared/Movie";

const MovieList = ({movies, apiUrl, parentPath, movieCount, sortExpression}) => {

    return (
        <div className="movieList">
            {movies
                ? movies.map(movie =>
                        <Movie key={movie.id} {...movie} />
                    )
                : null
            }
        </div>
    );
};

// MUST use this export line wrapping, because of a useState hook later.
export default (props) => <MovieList {...props} />;
