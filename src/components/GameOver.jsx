import { useContext, useState, useEffect } from 'react'
import { QuizContext } from '../context/quiz'
import WellDone from "../img/welldone.svg"
import "./GameOver.css"

// 🔑 Configuração montada em partes para o chat não bugar o endereço da API
const ENDERECO_BASE = "https://" + "api.jsonbin.io/v3/b/";
const ID_DO_SEU_BIN = "6a8501d8da38895dfef51634";
const API_URL = ENDERECO_BASE + ID_DO_SEU_BIN;

const MASTER_KEY = "$2a$10$EKCQjrXfx3foSGQinigs4.VWkzeiLpULey.cLgpo6kqYIht2W5ihS";

const GameOver = () => {
  const [quizState, dispatch] = useContext(QuizContext)
  const [name, setName] = useState('')
  const [saved, setSaved] = useState(false)
  const [leaders, setLeaders] = useState([])

  // 🔄 BUSCA os líderes do banco de dados assim que a tela abre
  useEffect(() => {
    const loadLeaders = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "X-Master-Key": MASTER_KEY,
            "X-Bin-Meta": "false"
          }
        })
        const data = await response.json()
       // setLeaders(data.ranking || [])
        const rankingOrdenado = (data.ranking || []).sort((a, b) => b.score - a.score);
setLeaders(rankingOrdenado);
      } catch (error) {
        console.log("Erro ao carregar ranking:", error)
      }
    }
    
    loadLeaders()
  }, [])

  // 💾 SALVA o novo jogador na nuvem
  const handleSaveRanking = async () => {
    if (!name.trim()) {
      alert("Por favor, digite seu nome ou apelido!")
      return
    }

    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": MASTER_KEY
        },
        body: JSON.stringify({
          ranking: [...leaders, { name: name, score: quizState.score * 10 }]
        })
      })

      if (!response.ok) {
        throw new Error("Erro na comunicação com o servidor.")
      }

      setLeaders([...leaders, { name: name, score: quizState.score * 10 }])
      setSaved(true)
      alert("Pontuação salva com sucesso no ranking!")
    } catch (error) {
      console.error("Erro ao salvar:", error)
      alert("Ops, ocorreu um erro ao salvar sua pontuação.")
    }
  }

  return (
    <div id='gameover'>
        <h2>Desafio Concluído!</h2>
        <p>Pontuação: {quizState.score * 10}</p>
        <p>Você acertou {quizState.score} de {quizState.questions.length} perguntas.</p>
        <img src={WellDone} alt="Fim do Quiz" />
        
        {/* Área do Ranking */}
        <div className="ranking-input-container" style={{ margin: '20px 0', padding: '15px', backgroundColor: '#1c1a27', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ fontWeight: 'bold', color: '#8435de', marginBottom: '10px' }}>Quer entrar para o Ranking de Líderes?</p>
          {!saved ? (
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <input 
                type="text" 
                placeholder="Seu nome ou apelido" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #8435de', backgroundColor: '#2b283d', color: 'white', outline: 'none' }}
              />
              <button onClick={handleSaveRanking} style={{ padding: '8px 15px', backgroundColor: '#8435de', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Salvar</button>
            </div>
          ) : (
            <p style={{ color: '#00ff7f', fontWeight: 'bold' }}>✓ Sua pontuação foi enviada para a nuvem!</p>
          )}
        </div>

        {/* 🏆 LISTA VISUAL DO RANKING */}
        <div className="ranking-list" style={{ margin: '20px 0', padding: '15px', backgroundColor: '#1c1a27', borderRadius: '8px' }}>
          <h3 style={{ color: '#8435de', marginBottom: '15px' }}>🏆 Top Jogadores</h3>
          {leaders.length === 0 ? (
            <p style={{ fontSize: '14px' }}>Nenhum jogador no ranking ainda.</p>
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

        <button onClick={() => { setSaved(false); setName(''); dispatch({type: "NEW_GAME"}); }}>Jogar Novamente</button>
    </div>
  )
}

export default GameOver
