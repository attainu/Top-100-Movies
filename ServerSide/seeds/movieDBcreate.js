const mongoose = require('mongoose')
const mongoSchema = require('../model/movieGener')

mongoose.connect('mongodb://127.0.0.1:27017/moviesCollactionData',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(function(conn){
    console.log('success:DB connected')
})
.catch(function(err){
    console.log('err:'+err.message)
})
   

const MovieDBdata = [new mongoSchema(
    {"Title":"Toy Story (1995)","IMDB_Score":"8.3","Genre":"Animation|Adventure|Comedy","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_UX182_CR0,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"Jumanji (1995)","IMDB_Score":"6.9","Genre":"Action|Adventure|Family","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BZTk2ZmUwYmEtNTcwZS00YmMyLWFkYjMtNTRmZDA3YWExMjc2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UY268_CR10,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"Grumpier Old Men (1995)","IMDB_Score":"6.6","Genre":"Comedy|Romance","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMjQxM2YyNjMtZjUxYy00OGYyLTg0MmQtNGE2YzNjYmUyZTY1XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"Waiting to Exhale (1995)","IMDB_Score":"5.7","Genre":"Comedy|Drama|Romance","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTczMTMyMTgyM15BMl5BanBnXkFtZTcwOTc4OTQyMQ@@._V1_UY268_CR4,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"Father of the Bride Part II (1995)","IMDB_Score":"5.9","Genre":"Comedy|Family|Romance","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BOTEyNzg5NjYtNDU4OS00MWYxLWJhMTItYWU4NTkyNDBmM2Y0XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"Heat (1995)","IMDB_Score":"8.2","Genre":"Action|Crime|Drama","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BNGMwNzUwNjYtZWM5NS00YzMyLWI4NjAtNjM0ZDBiMzE1YWExXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_UX182_CR0,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"Sabrina (1995)","IMDB_Score":"6.3","Genre":"Comedy|Drama","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTA3OTQ2NTk2ODNeQTJeQWpwZ15BbWU4MDQ3NTM4MDMx._V1_UX182_CR0,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"Tom and Huck (1995)","IMDB_Score":"5.6","Genre":"Adventure|Comedy|Drama","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTUxNDYzMDY1OV5BMl5BanBnXkFtZTcwNDA2MzYxMQ@@._V1_UY268_CR2,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"Sudden Death (1995)","IMDB_Score":"5.7","Genre":"Action|Crime|Thriller","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BN2NjYWE5NjMtODlmZC00MjJhLWFkZTktYTJlZTI4YjVkMGNmXkEyXkFqcGdeQXVyNDc2NjEyMw@@._V1_UY268_CR0,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"GoldenEye (1995)","IMDB_Score":"7.2","Genre":"Action|Adventure|Thriller","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMzk2OTg4MTk1NF5BMl5BanBnXkFtZTcwNjExNTgzNA@@._V1_UX182_CR0,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"The American President (1995)","IMDB_Score":"6.8","Genre":"Comedy|Drama|Romance","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTI5NDU2NDYzOF5BMl5BanBnXkFtZTYwNDk5MDI5._V1_UY268_CR4,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"Dracula: Dead and Loving It (1995)","IMDB_Score":"5.8","Genre":"Comedy|Fantasy|Horror","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BZWQ0ZDFmYzMtZGMyMi00NmYxLWE0MGYtYzM2ZGNhMTE1NTczL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMjM5ODMxODc@._V1_UX182_CR0,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"Balto (1995)","IMDB_Score":"7.1","Genre":"Animation|Adventure|Drama","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMjBhNmFlZjMtMzhlYy00NDBlLWFiMjctMmE0ZjgwOGM2MTNmXkEyXkFqcGdeQXVyNjExODE1MDc@._V1_UX182_CR0,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"Nixon (1995)","IMDB_Score":"7.1","Genre":"Biography|Drama|History","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BNzBlOWY0ZmEtZjdkYS00ZGU0LWEwN2YtYzBkNDM5ZDBjMmI1XkEyXkFqcGdeQXVyMTAwMzUyOTc@._V1_UX182_CR0,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"Cutthroat Island (1995)","IMDB_Score":"5.6","Genre":"Action|Adventure|Comedy","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMDg2YTI0YmQtYzgwMi00Zjk4LWJkZjgtYjg0ZDE2ODUzY2RlL2ltYWdlXkEyXkFqcGdeQXVyNjQzNDI3NzY@._V1_UX182_CR0,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"Casino (1995)","IMDB_Score":"8.2","Genre":"Crime|Drama","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTcxOWYzNDYtYmM4YS00N2NkLTk0NTAtNjg1ODgwZjAxYzI3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_UX182_CR0,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"Sense and Sensibility (1995)","IMDB_Score":"7.7","Genre":"Drama|Romance","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BNzk1MjU3MDQyMl5BMl5BanBnXkFtZTcwNjc1OTM2MQ@@._V1_UX182_CR0,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"Four Rooms (1995)","IMDB_Score":"6.7","Genre":"Comedy","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BNDc3Y2YwMjUtYzlkMi00MTljLTg1ZGMtYzUwODljZTI1OTZjXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"Ace Ventura: When Nature Calls (1995)","IMDB_Score":"6.3","Genre":"Adventure|Comedy|Crime","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BNGFiYTgxZDctNGI4OS00MWU1LWIwOGUtZmMyNGQxYjVkZjQ3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"Money Train (1995)","IMDB_Score":"5.6","Genre":"Action|Comedy|Crime","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BNDEwNzcyNjkzNl5BMl5BanBnXkFtZTcwNzQyMzYxMQ@@._V1_UY268_CR4,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"Get Shorty (1995)","IMDB_Score":"6.9","Genre":"Comedy|Crime|Thriller","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMjAwODYzNDY4Ml5BMl5BanBnXkFtZTcwODkwNTgzNA@@._V1_UX182_CR0,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"Copycat (1995)","IMDB_Score":"6.6","Genre":"Crime|Drama|Mystery","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BYWUwNDk2ZDYtNmFkMi00NjE5LWE1M2ItYTRkNTFjZDU3ZDU4L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTYxNjkxOQ@@._V1_UX182_CR0,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"Assassins (1995)","IMDB_Score":"6.3","Genre":"Action|Crime|Thriller","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMGY2OWI5ZjQtYjY0Zi00Y2M4LWEwMmMtOTJhODYxYTExNWZlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_UY268_CR3,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"Powder (1995)","IMDB_Score":"6.5","Genre":"Drama|Fantasy|Mystery","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTM2NDczNjYwMV5BMl5BanBnXkFtZTYwNTI3Mjc4._V1_UX182_CR0,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"Leaving Las Vegas (1995)","IMDB_Score":"7.6","Genre":"Drama|Romance","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BNDg3MDM5NTI0MF5BMl5BanBnXkFtZTcwNDY0NDk0NA@@._V1_UX182_CR0,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"Othello (1995)","IMDB_Score":"6.9","Genre":"Drama|Romance","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTIxMzA2ODk2NV5BMl5BanBnXkFtZTcwMzQ4ODIyMQ@@._V1_UY268_CR4,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"Now and Then (1995)","IMDB_Score":"6.8","Genre":"Comedy|Drama|Romance","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTM2MDQ1YjUtMGM0NC00NmFlLTljMDktZjJiNWRhMWYxOWYyXkEyXkFqcGdeQXVyNjgzMjI4ODE@._V1_UX182_CR0,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"Persuasion","IMDB_Score":"7.7","Genre":"Drama","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTc5NzAwNDAyN15BMl5BanBnXkFtZTYwMjYzMDc5._V1_UY268_CR1,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"The City of Lost Children (1995)","IMDB_Score":"7.7","Genre":"Fantasy|Sci-Fi","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BZGQxZDMwYzYtYmFjNi00NWYyLThjZjAtMDJhODZhYTkyZDNhXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_UY268_CR7,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"Yao a yao, yao dao wai po qiao (1995)","IMDB_Score":"7.2","Genre":"Crime|Drama|Romance","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTgyMzAwOTQyNF5BMl5BanBnXkFtZTcwNDU1MjgxMQ@@._V1_UY268_CR1,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"Dangerous Minds (1995)","IMDB_Score":"6.4","Genre":"Biography|Drama","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BZjk2YjNkYTYtOTZkNy00ZmRkLWI5ODEtYzA4MTM3MzMyZjhlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"Twelve Monkeys (1995)","IMDB_Score":"8","Genre":"Mystery|Sci-Fi|Thriller","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BN2Y2OWU4MWMtNmIyMy00YzMyLWI0Y2ItMTcyZDc3MTdmZDU4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"Wings of Courage (1995)","IMDB_Score":"6.5","Genre":"Adventure|Romance","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTc3ODY1MjA3OF5BMl5BanBnXkFtZTcwODgzOTgyMQ@@._V1_UX182_CR0,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"Babe (1995)","IMDB_Score":"6.8","Genre":"Comedy|Drama|Family","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BYjg4ZjUzMzMtYzlmYi00YTcwLTlkOWUtYWFmY2RhNjliODQzXkEyXkFqcGdeQXVyNTUyMzE4Mzg@._V1_UX182_CR0,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"Carrington (1995)","IMDB_Score":"6.9","Genre":"Biography|Drama|Romance","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BZjQ3MTBkNDEtMGRlZS00OTY0LTkzYjktOWU2MzI3ZDRiMjY5XkEyXkFqcGdeQXVyMTA0MjU0Ng@@._V1_UX182_CR0,0,182,268_AL_.jpg"}),new mongoSchema(
    {"Title":"Dead Man Walking (1995)","IMDB_Score":"7.6","Genre":"Crime|Drama","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTM3NzA1MjM2N15BMl5BanBnXkFtZTcwMzY3MTMzNA@@._V1_UX182_CR0,0,182,268_AL_.jpg"})
]

var done =0;
for(var i=0;i<MovieDBdata.length;i++){
    MovieDBdata[i].save(function(err,result){
        done++;
        if(done===0){
            exit();
        }
    })
}
function exit(){
    mongoose.disconnect();
}