import express from "express";
import { fileURLToPath } from "url";
import path from "path";


let app = express();
let port =3000;

let __fileName = fileURLToPath(import.meta.url);
console.log({ __fileName});

let __dirName = path.dirname(__fileName );
console.log({ __dirName });

app.set("views" , "./views");
app.set("view engine" , "pug");

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirName, "public", "index.html"))
  });

//route movie
app.get('/movie', (req, res) => {
    res.sendFile(path.join(__dirName, "public", "movie.html"))
  });


 app.get("/movies", async (req, res) =>{
  let movieRes = await fetch("https://api.themoviedb.org/3/discover/movie" , {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGUxOTNkNjYzMjMzZDM0YjZlNzBlMTNkMDI5YTU2OCIsIm5iZiI6MTc0NDM1NzYxNy4yNCwic3ViIjoiNjdmOGM4ZjFkODE3NDhjY2ZmOTk4YmVjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.bToRI43JPs7MtcS_v7_KE6eelLOBgjHkpr4aqyX54HQ'
    }
  });
 
 let movies = await movieRes.json();
 console.log({ movies});
//  res.json(movies);

res.render("movies", { data: movies.results});
});


//route each movie
app.get("/movies/:id", async (req, res) => {
  // res.render("movie")});

let id = req.params.id;
console.log({id});


let movieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGUxOTNkNjYzMjMzZDM0YjZlNzBlMTNkMDI5YTU2OCIsIm5iZiI6MTc0NDM1NzYxNy4yNCwic3ViIjoiNjdmOGM4ZjFkODE3NDhjY2ZmOTk4YmVjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.bToRI43JPs7MtcS_v7_KE6eelLOBgjHkpr4aqyX54HQ'
  }
});


let movie = await movieRes.json();
console.log({movie});

res.render("movie", { data: movie});

});


//route series
app.get("/series", async (req, res) =>{
  let seriesRes = await fetch("https://api.themoviedb.org/3/discover/tv", {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGUxOTNkNjYzMjMzZDM0YjZlNzBlMTNkMDI5YTU2OCIsIm5iZiI6MTc0NDM1NzYxNy4yNCwic3ViIjoiNjdmOGM4ZjFkODE3NDhjY2ZmOTk4YmVjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.bToRI43JPs7MtcS_v7_KE6eelLOBgjHkpr4aqyX54HQ'
    }
  });
  
  let series = await seriesRes.json();
  console.log({ series});
  //  res.json(movies);
  
  res.render("series", { data: series.results });
});

//route each series
app.get("/series/:id", async (req, res) => {
  // res.render("movie")});

let id = req.params.id;
console.log({id});


let seriesRes = await fetch(`https://api.themoviedb.org/3/tv/${id}`, {
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGUxOTNkNjYzMjMzZDM0YjZlNzBlMTNkMDI5YTU2OCIsIm5iZiI6MTc0NDM1NzYxNy4yNCwic3ViIjoiNjdmOGM4ZjFkODE3NDhjY2ZmOTk4YmVjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.bToRI43JPs7MtcS_v7_KE6eelLOBgjHkpr4aqyX54HQ'
  }
});


let series = await seriesRes.json();
console.log({series});

res.render("series1", { data: series});

});



  app.listen(port, () => {
    console.log(`Server running at port ${port}`)
  });

