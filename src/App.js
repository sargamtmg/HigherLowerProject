import './App.css';
import Game from './main-game.js';
import React,{useState,useEffect} from 'react';
import HomePage from './homepage';

function App() {
  let [isGameStart,setIsGameStart] = useState(false);
  let highScore = window?.localStorage.getItem('highScore') || 0;
  let [score,setScore] = useState(-1);
  let data = [
    {
      color: '#808000',
      num: 67
    },
    {
      color: '#CD5C5C',
      num: 45
    },
    {
      color: '#DC143C',
      num: 80
    },
    {
      color: '#000000',
      num: 70
    },
  ];
  let [data1,setData1] = useState(data[0]);
  let [data2,setData2] = useState(data[1]);

  var dat;
  useEffect(()=>{
  let populationUrl='https://countriesnow.space/api/v0.1/countries/population';
    const fetchdata = async () =>{
    let populationData = await fetch(populationUrl);
    var response = await populationData.json();
    dat = response.data;
    }

    fetchdata().catch(console.error);
  });

  const fun = async () =>{
    console.log('function called');
    setData1(data2);
    console.log(data1);
    let newData = await generateRandomData();
    setData2(newData);
  }

  const generateRandomData = async () =>{
    let elem= Math.floor(Math.random() * dat.length);
    let country= dat[elem].country;
    let pop =dat[elem].populationCounts[0].value;
    let photoUrl = 'https://api.pexels.com/v1/search?query='+country+'&per_page=1';
    let imageres =await fetch(photoUrl,{
      headers: {
      Authorization: '563492ad6f917000010000012f5388ca3d994023ab36ea7bb9a6a97c'
      }
    });
    let  imageresponse = await imageres.json();
    let im_Url = imageresponse.photos[0].src.original;
    let ret = {
      country: country,
      population: pop,
      image_Url: im_Url
    }
    return ret;
  }
  const toggleGameStatus = async () =>{
    setIsGameStart(!isGameStart);
    console.log('game status : '+ isGameStart);
    //console.log('dsadsa'+popres.length)
    if(!isGameStart){
      if(true)
      {
        let d1 = await generateRandomData();
        let d2 = await generateRandomData();
        console.log(d1);
        setData1(d1);
        setData2(d2);
      }
    }
  }

  const scoreUpdate = (score) =>{
    setScore(score);
    if(score > highScore)
    {
      window.localStorage.setItem('highScore',score);
    }
  }
  return (
    <div>
      { !isGameStart ?
        <HomePage toggleGame={toggleGameStatus} score={score} highScore={highScore}></HomePage>:
        <Game data1={data1} data2={data2} fun={fun} toggleGame={toggleGameStatus} highScore={highScore} scoreUpdate={scoreUpdate}></Game>
      }
    </div>
  );
}

export default App;
