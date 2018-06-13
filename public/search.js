$(function(){

	$('form').on('submit', function(e){
		e.preventDefault();

        // Gets the data from the OMDB API
		let searchString = $('.search-bar').val();
		let urlEncodedSearchString = encodeURIComponent(searchString);
		$.ajax({
			url: "http://www.omdbapi.com/?i=tt3896198&apikey=4c39544b&s=" + urlEncodedSearchString,
			method: "GET",
			success: function(response){
				movieData = response.Search;
				let finalHTML = renderMovies(response.Search);
				$('.movies-container').html(finalHTML);
			}
		});

		
	});

    // Renders each movie card with the data
	function renderMovies(movieArray) {
		let finalHTML = "";
		movieArray.forEach(function(currentMovie){
			finalHTML += '<div class="card style="width: 18rem";>';
			finalHTML += '<img class="card-img-top" src="' + currentMovie.Poster + '" alt="Movie Poster">';
			finalHTML += '<div class="card-body">';
			finalHTML += '<h5 class="card-title">'+ currentMovie.Title +'</h5>';
			finalHTML += '<p class="card-text">'+ currentMovie.Year +'</p>';
            finalHTML += '<button data-id="'+ currentMovie.imdbID +'" class="btn btn-primary">Ain\'t Scene it</button>';
            finalHTML += '<button data-id="'+ currentMovie.imdbID +'" class="btn btn-primary">Scene It</button>';
			finalHTML += '</div>';
			finalHTML += '</div>';
		});
		return finalHTML;
	}


	// Setting up the click listener on 'Ain't Scene It" button
	$('.movies-container').on('click', 'button', function(){
		let imdbID = $(this).data('id');
		$(this).html('Ain\'t Scene it');
        $(this).toggleClass('btn-success').html('Added!');
    });    
		
		let movie = movieData.find(function(currentMovie){
			return currentMovie.imdbID == imdbID;	
	});

    // Add movie to table	
    //    - check to see if the movie is in the movie table, 
    //   -if not, add to movie table
    //  - if it does exist, do nothing

    // - check to see if the movie is in the user table, 
    //   -if not, add to user table
    //  - if it does exist, alert ("Already added to your "Ain't Scene It" list")

    connection.sync().then(function() {
        Movie.create({
            title: currentMovie.Title,
            imdbID: currentMovie.imdbID,
            mpaaRating: currentMovie.Rated,
            released: currentMovie.Released,
            runtime: currentMovie.Runtime,
            genre: currentMovie.Genre,
            director: currentMovie.Director,
            writer: currentMovie.Writer,
            actors: currentMovie.Actors,
            plot: currentMovie.Plot,
            poster: currentMovie.Poster,
            imdbRating: currentMovie.imdbRating,
        });
    });






        


        // Setting up the click listener on 'Scene It" button
	$('.movies-container').on('click', 'button', function(){
		let imdbID = $(this).data('id');
		$(this).html('Scene It');
        $(this).toggleClass('btn-success').html('Added!');;
    });    
		
		let movie = movieData.find(function(currentMovie){
			return currentMovie.imdbID == imdbID;	
	});

	// Add movie to table

	

});