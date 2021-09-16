const MovieDB = require('node-themoviedb');
const dotenv = require('dotenv') 
dotenv.config()
const mdb = new MovieDB(process.env.SECRET_API/*, options*/);
const banco = []


async function supew(dados) {
  var i = 0
await dados.forEach(async function themovie() { 
  try {
      const args = {
        pathParameters: {
          movie_id: dados[i],
        }, 
      };i++
      const movie = await mdb.movie.getDetails(args);
      
      var tudo = {
        nome: movie.data.original_title,
        data: movie.data.release_date,
        imagem: ("https://image.tmdb.org/t/p/w500" + movie.data.poster_path),
        descricao: movie.data.overview
      }
     await banco.push(tudo)
      //console.log(banco)
     
   
    } catch (error) {
      console.error(error);
    }
    
  })
   return banco.splice(0,6)
  
}
//themovie()
//supew(dados)



module.exports = {supew}