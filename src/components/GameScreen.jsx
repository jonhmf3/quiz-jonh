import { useContext } from "react"
import { QuizContext } from "../context/quiz"
import Question from "./Question"
import "./GameScreen.css"

const GameScreen = () => {
  const [quizState] = useContext(QuizContext)

  return (
    <div className="game-screen">

      <aside className="player-panel">
        <h3>👤 Jogador</h3>

        <p className="player-name">
          {quizState.userName}
        </p>

        <p>⭐ {quizState.score * 10} pontos</p>

        {quizState.combo >= 2 && (
          <p>🔥 Combo x{quizState.combo}</p>
        )}
      </aside>

      <main className="main-screen">
        <Question />
      </main>

      <aside className="ranking-panel">
        <h3>🏆 Ranking</h3>

        <p>Em breve...</p>
      </aside>

    </div>
  )
}

export default GameScreen