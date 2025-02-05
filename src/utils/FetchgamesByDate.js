import axios from "axios"
export const FetchgamesByDate=async({selectedOption,UserOptionData,DateForFetchGames,setGamesData,setLoading})=>{
    try{
        setLoading(true)
        if(selectedOption === "Chess"){
        const response=await axios.get(`https://api.chess.com/pub/player/${UserOptionData}/games/${DateForFetchGames.year}/${DateForFetchGames.month}`);
        if(response.status===200){
        console.log(response)
        setGamesData(response.data.games)
        setLoading(false)
        }else{
            setLoading(false)
        }
    }  
    if(selectedOption === "LeeChess.org"){
        const response=await axios.get(`https://lichess.org/api/games/user/${UserOptionData}?since=${DateForFetchGames.since}&until=${DateForFetchGames.until}&pgnInJson=true` ,{

              headers: { 'Accept': 'application/x-ndjson' }},
        );
console.log('Response',[response.data]);

// Add a delimiter between objects using regex to identify JSON boundaries
const fixedData =response.data.replace(/}\s*{/g, '},{');
// Wrap the fixed data in square brackets to make it a valid JSON array
const jsonArray = `[${fixedData}]`;
// Parse the data into an array of objects
const games = JSON.parse(jsonArray);

// // Store each game separately
// const formattedGames = games.map((game) => ({
//     id: game.id,
//     whitePlayer: game.players.white.user.name,
//     blackPlayer: game.players.black.user.name,
//   }));
  setGamesData(games)
  setLoading(false)

    }
    }catch(error){
        console.log(error);
        setLoading(false)

    }
}