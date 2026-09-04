import { useContext, useEffect } from 'react'
import { QuizContext } from './context/quiz'


import Welcome from './components/Welcome'
import GameScreen from './components/GameScreen'
import GameOver from './components/GameOver'
import './App.css'
import PickCategory from './components/PickCategory'

function App() {
  const [quizState, dispatch] = useContext(QuizContext)

  

  return (
   <div className='App'>
       <h1>Desafio Tech do Jonathan</h1>
       {quizState.gameStage === "Start" && <Welcome/>}
       {quizState.gameStage === "Category" && <PickCategory/>}
       {quizState.gameStage === "Playing" && <GameScreen/>}
       {quizState.gameStage === "End" && <GameOver/>}
        </div>
  )
}

export default App
