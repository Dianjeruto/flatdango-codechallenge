document.addEventListener("DOMContentLoaded", () => {
    // Fetch movie details for the first movie and populate it initially
    fetch('http://localhost:3000/films')
      .then(response => response.json())
      .then(data => {
        // Populate movie details for the first movie
       // displayMovieDetails(data);
       data=data[0]
       const poster = data.poster;
            const title = data.title;
            const runtime = data.runtime;
            const showtime = data.showtime;
            const description = data.description;
            const capacity = data.capacity;
            const ticketsSold = data.tickets_sold;
            const availableTickets = capacity - ticketsSold;
        
            document.getElementById('poster').src = poster;
            document.getElementById('movieTitle').textContent = title;
            document.getElementById('runtime').textContent = `Runtime: ${runtime} minutes`;
            document.getElementById('showtime').textContent = `Showtime: ${showtime}`;
            document.getElementById('description').textContent = `Description: ${description}`;
            document.getElementById('availableTickets').innerHTML = `${availableTickets}`;
      });
  
    // Fetch the list of all movies and populate the movie list
    fetch('http://localhost:3000/films')
      .then(response => response.json())
      .then(data => {
        const filmsList = document.getElementById('films');
        const placeholder = filmsList.querySelector('.placeholder');
        if (placeholder) {
          filmsList.removeChild(placeholder);
        }
  
        data.forEach(movie => {
          const listItem = document.createElement('li');
          listItem.classList.add('film', 'item');
          listItem.textContent = movie.title;
          listItem.addEventListener('click', () => {
            // When a movie is clicked, fetch its details and display them
            fetch(`http://localhost:3000/films/${movie.id}`)
              .then(response => response.json())
              .then(movieData => {
                displayMovieDetails(movieData);
              });
          });
          filmsList.appendChild(listItem);
        });
      });
  
    // Function to display movie details
    function displayMovieDetails(data) {
      const poster = data.poster;
      const title = data.title;
      const runtime = data.runtime;
      const showtime = data.showtime;
      const description = data.description;
      const capacity = data.capacity;
      const ticketsSold = data.tickets_sold;
      const availableTickets = capacity - ticketsSold;
  
      document.getElementById('poster').src = poster;
      document.getElementById('movieTitle').textContent = title;
      document.getElementById('runtime').textContent = `Runtime: ${runtime} minutes`;
      document.getElementById('showtime').textContent = `Showtime: ${showtime}`;
      document.getElementById('description').textContent = `Description: ${description}`;
      document.getElementById('availableTickets').innerHTML = `${availableTickets}`;
    }
  });
  function buytickets(){
    let tickets = document.getElementById('availableTickets').innerHTML;
    if (tickets > 0){
        tickets=tickets-1;
        alert("tickets successfully bought")
        document.getElementById("availableTickets").innerHTML=tickets;
    }else{
        alert("cannot buy tickets")
    }
  }

  