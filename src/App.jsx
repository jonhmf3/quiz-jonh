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
  <div className="App">
    {/* 🔒 TELA DE BLOQUEIO DE ORIENTAÇÃO (SÓ APARECE SE O CELULAR ESTIVER EM PÉ) */}
    <div className="bloqueio-orientacao">
      <div className="bloqueio-conteudo">
        <div className="icone-girar">🔄</div>
        <h2>Modo deitado obrigatório</h2>
        <p>Por favor, gire o seu celular de lado para entrar no Palco do Quiz!</p>
      </div>
    </div>

    {/* 🎮 FLUXO NORMAL DO SEU JOGO (TUDO NA MESMA DIV PAI) */}
    {quizState.gameStage !== "Playing" && (
      <h1>Desafio Tech do Jonathan</h1>
    )}
    
    {quizState.gameStage === "Start" && <Welcome />}
    {quizState.gameStage === "Category" && <PickCategory />}
    {quizState.gameStage === "Playing" && <GameScreen />}
    {quizState.gameStage === "End" && <GameOver />}
  </div>
);

}

export default App
