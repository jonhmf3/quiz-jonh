import { useContext, useEffect, useState } from "react"
import { QuizContext } from "../context/quiz"
import Question from "./Question"
import "./GameScreen.css"

const GameScreen = () => {
  const [quizState] = useContext(QuizContext)
  const [ranking, setRanking] = useState([])
  

const rankingPorCategoria = {
  "Futebol": "rankingFutebol",
  "Novela Rebelde (RBD)": "rankingRBD",
  "Bíblia": "rankingBiblia"
}

const chaveRanking =
  rankingPorCategoria[quizState.selectedCategory] || "rankingFutebol"


useEffect(() => {
  const carregarRanking = async () => {
    try {
      const response = await fetch("/api/ranking")

      if (!response.ok) {
        throw new Error("Erro ao carregar ranking")
      }

      const dados = await response.json()

      setRanking(dados[chaveRanking] || [])

    } catch (error) {
      console.error("Erro ao buscar ranking:", error)
    }
  }

  carregarRanking()
}, [chaveRanking])

const jogadorAtual = {
  name: quizState.userName || "Jogador",
  score: quizState.score * 10,
  jogadorAtual: true
}

const rankingComJogador = [
  ...ranking,
  jogadorAtual
].sort((a, b) => b.score - a.score)

const posicaoJogador =
  rankingComJogador.findIndex((player) => player.jogadorAtual) + 1

const top4 = rankingComJogador.slice(0, 4)

const jogadorEstaNoTop4 = top4.some(
  (player) => player.jogadorAtual
)

const nivelAtual =
  quizState.currentQuestion < 5
    ? "Fácil"
    : quizState.currentQuestion < 10
    ? "Médio"
    : "Difícil"

  return (
    <div className="game-screen">

    <aside className="player-panel">

  <h3>👤 Jogador</h3>

  <p className="player-name">
    {quizState.userName}
  </p>

  <div className="player-stats">

    <div className="player-stat">
      <span>⭐ Pontos</span>
      <strong>{quizState.score * 10}</strong>
    </div>

    <div className="player-stat">
      <span>🔥 Combo</span>
      <strong>x{quizState.combo}</strong>
    </div>

    <div className="player-stat">
      <span>🎯 Nível</span>
      <strong>{nivelAtual}</strong>
    </div>

  </div>

</aside>

      <main className="main-screen">
        <Question />
      </main>

     <aside className="ranking-panel">
  <h3>🏆 Ranking</h3>

  <p className="ranking-category">
    {quizState.selectedCategory}
  </p>

  {ranking.length === 0 ? (
    <p>Carregando...</p>
  ) : (
    <ol className="ranking-list-game">

  {top4.map((player, index) => (
    <li
      key={`${player.name}-${index}`}
      className={player.jogadorAtual ? "current-player-ranking" : ""}
    >
      <span>
        {index === 0
          ? "🥇"
          : index === 1
          ? "🥈"
          : index === 2
          ? "🥉"
          : "4º"}

        {" "}

        {player.name}

        {player.jogadorAtual && " (Você)"}
      </span>

      <strong>{player.score}</strong>
    </li>
  ))}

  {!jogadorEstaNoTop4 && (
    <>
      <li className="ranking-separator">
        • • •
      </li>

      <li className="current-player-ranking">
        <span>
          {posicaoJogador}º {quizState.userName} (Você)
        </span>

        <strong>{quizState.score * 10}</strong>
      </li>
    </>
  )}

</ol>
  )}
</aside>

    </div>
  )
}

export default GameScreen