import bad from './gifs/bad.gif'
import good from './gifs/good.gif'
import congratulation from './gifs/congratulation.gif'

const HomePage = (props) =>{


    return(
        <div className="homepage-main">
            <h1>The wOrld MosT ADDictive Game</h1>
            <div className="start-button" onClick={props.toggleGame}>Start Game</div>
            
            {props.score === props.highScore && props.score!==0  && <img className='gifAnimation' src={congratulation} alt="animation"></img>}
            {props.score <= 3 && props.score >= 0 && props.score !== props.highScore && <img className='gifAnimation' src={bad} alt="animation"></img>}
            {props.score >3 && props.score !== props.highScore && <img className='gifAnimation' src={good} alt="animation"></img>}
            {
                props.score >= 0 && <div className='homeScore'>your score is: {props.score}</div>
            }
            {
                <div className="homeHighScore">Highscore : {props.highScore}</div>
            }
            {
                props.score === props.highScore && props.score!==0 && <div>Congratulation you have High Score</div>
            }
        </div>
    )
}

export default HomePage;