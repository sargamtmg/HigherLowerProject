import React,{useState,useEffect} from 'react';
const Game = (props) =>{

    const [select, setSelect] = useState('');
    const [score, setScore] = useState(0);

    let check = () =>{
        return props.data2.population > props.data1.population;
    }
    useEffect(() =>{
        async function sleepresult(){
            let res = document.querySelector('.result');
            let isHigh = check();
        
        if(select === ''){
            res.classList.remove('red');
            res.classList.remove('green');
            res.classList.add('vs');
        }
        else if((select ==='high'&& isHigh) || (select ==='low' && !isHigh))
        {
            res.classList.add('green');
            res.classList.remove('vs');
            setScore(score+1);
            document.querySelector('.pop2').classList.toggle('hidden');
            await new Promise(r => setTimeout(r, 3000));
            document.querySelector('.pop2').classList.toggle('hidden');
            props.fun();
        }
        else if((select ==='high'&& !isHigh) || (select ==='low' && isHigh)){
                res.classList.add('red');
                res.classList.remove('vs');
                props.scoreUpdate(score);
                document.querySelector('.pop2').classList.toggle('hidden');
                await new Promise(r => setTimeout(r, 3000));
                setScore(0);
                props.toggleGame();
        }
        console.log(select);
        setSelect('');
    }
    sleepresult();
    },[select]);


    let background1 = props.data1.image_Url;
    let background2 = props.data2.image_Url;
    return (
        <div className='main'>
            <div className="container">
                <div className="option" style={{backgroundImage: `url(${background1})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'}}>
                    <div className='tittleGrad'>
                        <h1>{props.data1.country}</h1>
                        <h1>{props.data1.population}</h1>
                    </div>
                    <div className='highScore'>High Score: {props.highScore} </div>
                </div>
                <div className="option2" style={{backgroundImage: `url(${background2})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'}}>
                    <div className='tittleGrad'>
                        <h1>{props.data2.country}</h1>
                        <h1 className='pop2 hidden'>{props.data2.population}</h1>
                    </div>
                    <div className='bggrad'>
                        <div className="higher" onClick={() => setSelect('high')}>Higher</div>
                        <div className="lower" onClick={() => setSelect('low')} >Lower</div>
                        <div className='scrore'>Your Score: {score} </div>
                    </div>
                </div>
            </div>
            <div className="result"></div>
        </div>
    );
}

export default Game;