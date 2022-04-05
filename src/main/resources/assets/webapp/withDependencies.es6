const buildQueryListMovies = (movieType, parentPath) => {
    // verify content type names like "com.enonic.app.react4xp:movie" and match up groups before and after the colon:
    const matched = movieType.match(/(\w+(\.\w+)*):(\w+)/i);
    if (!matched) {
        throw Error(`movieType '${movieType}' is not a valid format. Expecting <appName>:<XP content type>, for example: 'com.enonic.app.react4xp:movie' etc`);
    }

    // e.g. "com.enonic.app.react4xp" --> "com_enonic_app_react4xp
    const appNameUnderscored = matched[1].replace(/\./g, '_');

    // e.g. "movie" --> "Movie"
    const ctyCapitalized = matched[3][0].toUpperCase() + matched[3].substr(1);

    return `
query($first:Int!, $offset:Int!, $sort:String!) {
  guillotine {
    query(contentTypes: ["${movieType}"], query: "_parentPath = '/content${parentPath}'", first: $first, offset: $offset, sort: $sort) {
      ... on ${appNameUnderscored}_${ctyCapitalized} {
        _id
        displayName
        data {
          year
          description
          actor
          image {
            ... on media_Image {
              imageUrl(type: absolute, scale: "width(300)")
            }
          }
        }
      }
    }
  }
}`;
};

// Returns arrays unchanged.
// If the maybeArray arg is a non-array value, wraps it in a single-item array.
// If arg is falsy, returns an empty array.
const forceArray = maybeArray => {
    if (Array.isArray(maybeArray)) {
        return maybeArray;
    }
    return (maybeArray) ? [maybeArray] : [];
};

// Adapt the output from the guillotine query to the MovieList props signature
const extractMovieArray = responseData => responseData.data.guillotine.query
    .filter( movieItem => movieItem && typeof movieItem === 'object' && Object.keys(movieItem).indexOf('data') !== -1)
    .map(
        movieItem => ({
            id: movieItem._id,
            title: movieItem.displayName.trim(),
            imageUrl: movieItem.data.image.imageUrl,
            year: movieItem.data.year,
            description: movieItem.data.description,
            actors: forceArray(movieItem.data.actor)
                .map( actor => (actor || '').trim())
                .filter(actor => !!actor)
        })
    );


// ---------------------------------------------------------

// Makes a (guillotine) request for data with these search parameters and passes updateDOMWithNewMovies as the callback
// function to use on the returned list of movie data
const requestAndRenderMovies = () => {
    fetch(
        MOVIE_LIST_PARAMS.apiUrl,
        {
            method: "POST",
            body: JSON.stringify({
                query: buildQueryListMovies(
                    MOVIE_LIST_PARAMS.movieType,
                    MOVIE_LIST_PARAMS.parentPath
                ),
                variables: {
                    first: MOVIE_LIST_PARAMS.movieCount,
                    offset: 0,
                    sort: MOVIE_LIST_PARAMS.sortExpression
                }}
            ),
        }
    )
        .then(response => {
            if (!(response.status < 300)) {
                throw Error(`Guillotine API response:\n
                \n${response.status} - ${response.statusText}.\n
                \nAPI url: ${response.url}\n
                \nInspect the request and/or the server log.`);
            }
            return response;
        })

        .then(response => response.json())
        .then(extractMovieArray)
        .then(renderMovies)
        .catch( error => {console.error(error);})
};




const renderMovies = (movies) => {
    console.log("Rendering movies:", movies);

    const props = {
        movies: movies,
        apiUrl: MOVIE_LIST_PARAMS.apiUrl,
        parentPath: MOVIE_LIST_PARAMS.parentPath,
        movieCount: MOVIE_LIST_PARAMS.movieCount,
        movieType: MOVIE_LIST_PARAMS.movieType,
        sortExpression: MOVIE_LIST_PARAMS.sortExpression
    };

    React4xp.CLIENT.renderWithDependencies(
        {
            'MovieList': {
                targetId: 'movieListContainer',
                props: props
            }
        },
        null,
        MOVIE_LIST_PARAMS.serviceUrlRoot
    );
};


// Finally, calling the entry function and running it all:
requestAndRenderMovies();
