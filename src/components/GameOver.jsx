import { useContext, useState, useEffect } from 'react'
import { QuizContext } from '../context/quiz'
import WellDone from "../img/welldone.svg"
import "./GameOver.css"



const GameOver = () => {
  const [quizState, dispatch] = useContext(QuizContext)
  const [leaders, setLeaders] = useState([])

  // 🏷️ 1. Identifica qual categoria foi jogada nesta partida para saber onde salvar/buscar
  const categoriaJogada = quizState.selectedCategory || "Futebol"

  

  

 useEffect(() => {
  const processRanking = async () => {
    try {
      const response = await fetch("/api/ranking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome: quizState.userName?.trim() || "Jogador Anônimo",
          pontuacao: quizState.score * 10,
          categoria: categoriaJogada
        })
      })

      if (!response.ok) {
        throw new Error("Erro ao salvar o ranking.")
      }

      const dados = await response.json()

      setLeaders(dados.ranking || [])

    } catch (error) {
      console.error("Erro no processamento do ranking:", error)
    }
  }

  processRanking()
}, [
  quizState.score,
  quizState.userName,
  categoriaJogada
])

  return (
    <div id='gameover'>
        <h2>Desafio Concluído!</h2>
        <p>Pontuação: {quizState.score * 10}</p>
        <p>Você acertou {quizState.score} de {quizState.questions.length} perguntas.</p>
        <img src={WellDone} alt="Fim do Quiz" />
        
        <div className="ranking-success-container" style={{ margin: '20px 0', padding: '12px', backgroundColor: '#1c1a27', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ color: '#00ff7f', fontWeight: 'bold', fontSize: '14px', margin: 0 }}>✓ Sua pontuação foi salva automaticamente no ranking!</p>
        </div>

        {/* 🏆 LISTA VISUAL DO RANKING ESPECÍFICO DA CATEGORIA */}
        <div className="ranking-list" style={{ margin: '20px 0', padding: '15px', backgroundColor: '#1c1a27', borderRadius: '8px' }}>
          {/* ✨ O título da lista agora mostra o tema jogado dinamicamente */}
          <h3 style={{ color: '#8435de', marginBottom: '15px' }}>🏆 Top Jogadores: {categoriaJogada}</h3>
          {leaders.length === 0 ? (
            <p style={{ fontSize: '14px' }}>Atualizando ranking na nuvem...</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {leaders.map((player, index) => (
                <li key={player.id || index} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #2b283d', fontSize: '14px' }}>
                  <span>{index + 1}º - {player.name}</span>
                  <span style={{ fontWeight: 'bold', color: '#00ff7f' }}>{player.score} pts</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="recruiter-message" style={{ margin: '20px 0', padding: '15px', backgroundColor: '#1c1a27', borderRadius: '8px' }}>
            <p style={{ fontWeight: 'bold', color: '#8435de' }}>Obrigado por avaliar meus conhecimentos!</p>
            <p style={{ fontSize: '14px' }}>Estou em busca de oportunidades como desenvolvedor. Vamos nos conectar?</p>
        </div>

        <div className="social-buttons" style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '15px' }}>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ padding: '10px 15px', backgroundColor: '#0077b5', color: 'white', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>Meu LinkedIn</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" style={{ padding: '10px 15px', backgroundColor: '#24292e', color: 'white', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>Meu GitHub</a>
        </div>

        <button onClick={() => dispatch({type: "NEW_GAME"})}>Jogar Novamente</button>
    </div>
  )
}

export default GameOver
