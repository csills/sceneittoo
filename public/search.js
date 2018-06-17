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
			finalHTML += '<div class="card box-space";>';
			finalHTML += '<div class="fill"><img class="card-img-top" src="' + currentMovie.Poster + '" alt="Movie Poster"></div>';
			finalHTML += '<div class="card-body">';
			finalHTML += '<span class="badge badge-dark inline">' + currentMovie.Year + '</span>';
			finalHTML += '<h4 class="card-title">'+ currentMovie.Title +'</h4>';
            finalHTML += '<button data-id="'+ currentMovie.imdbID +'" class="btn aintsceneit btn-warning littleSpace round">Ain\'t Scene it</button>';
            finalHTML += '<button data-id="'+ currentMovie.imdbID +'" class="btn sceneit btn-warning round">Scene It</button>';
			finalHTML += '</div>';
			finalHTML += '</div>';
		});
		return finalHTML;
	}


	// Setting up the click listener on 'Ain't Scene It" button
	$('.movies-container').on('click', '.aintsceneit', function(){
		let imdbID = $(this).data('id');
		const button = $(this);
        $.ajax({
			url: "http://www.omdbapi.com/?apikey=4c39544b&i=" + imdbID,
			method: "GET",
			success: function(currentMovie){
				$.post({
					url: "http://localhost:3000/api/saveaintsceneit",
					data: {
						title: currentMovie.Title,
						imdbid: currentMovie.imdbID,
						mpaarating: currentMovie.Rated,
						released: currentMovie.Released,
						runtime: currentMovie.Runtime,
						genre: currentMovie.Genre,
						director: currentMovie.Director,
						writer: currentMovie.Writer,
						actors: currentMovie.Actors,
						plot: currentMovie.Plot,
						poster: currentMovie.Poster,
						imdbrating: currentMovie.imdbRating,
					}
				}, function( data ) {
					button.toggleClass('btn-success').html('Added!');  //'data' here is the data that was sent back from the server.
				});
			}
		});


    });

	// 	let movie = movieData.find(function(currentMovie){
	// 		return currentMovie.imdbID == imdbID;
	// });


    // Setting up the click listener on 'Scene It" button
	$('.movies-container').on('click', '.sceneit', function(){
		let imdbID = $(this).data('id');
		const button = $(this);

        $.ajax({
			url: "http://www.omdbapi.com/?apikey=4c39544b&i=" + imdbID,
			method: "GET",
			success: function(currentMovie){
				$.post({
					url: "http://localhost:3000/api/savesceneit",
					data: {
						title: currentMovie.Title,
						imdbid: currentMovie.imdbID,
						mpaarating: currentMovie.Rated,
						released: currentMovie.Released,
						runtime: currentMovie.Runtime,
						genre: currentMovie.Genre,
						director: currentMovie.Director,
						writer: currentMovie.Writer,
						actors: currentMovie.Actors,
						plot: currentMovie.Plot,
						poster: currentMovie.Poster,
						imdbrating: currentMovie.imdbRating,
					}
				}, function( data ) {
					button.toggleClass('btn-success').html('Been there!');  //'data' here is the data that was sent back from the server.
				});
			}
		});

    });

	// 	let movie = movieData.find(function(currentMovie){
	// 		return currentMovie.imdbID == imdbID;
	// });


});