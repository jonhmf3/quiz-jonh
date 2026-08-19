import { useContext, useState, useEffect } from 'react'
import { QuizContext } from '../context/quiz'
import WellDone from "../img/welldone.svg"
import "./GameOver.css"

// 🔑 Configuração das credenciais da API montadas com segurança
const ENDERECO_BASE = "https://" + "api.jsonbin.io/v3/b/";
const ID_DO_SEU_BIN = "6a8501d8da38895dfef51634";
const API_URL = ENDERECO_BASE + ID_DO_SEU_BIN;
const MASTER_KEY = "$2a$10$EKCQjrXfx3foSGQinigs4.VWkzeiLpULey.cLgpo6kqYIht2W5ihS";

const GameOver = () => {
  const [quizState, dispatch] = useContext(QuizContext)
  const [leaders, setLeaders] = useState([])
  // ➡️ MUDANÇA 1: Removemos o estado 'name' e 'saved' porque salvamos automático agora!

  // 🔄 PROCESSO AUTOMÁTICO: Busca, adiciona o jogador atual, ordena e salva na nuvem
  useEffect(() => {
    const processRanking = async () => {
      try {
        // 1. Faz o GET para buscar os líderes atuais que estão na nuvem
        const responseGet = await fetch(API_URL, {
          method: "GET",
          headers: {
            "X-Master-Key": MASTER_KEY,
            "X-Bin-Meta": "false"
          }
        })
        const data = await responseGet.json()
        const listaAtual = data.ranking || []

        // 2. Prepara os dados do jogador atual puxando o nome direto do Contexto global
        // Nota: Se por algum motivo o nome estiver vazio, usamos 'Jogador Anônimo' como segurança
        const nomeDoJogador = quizState.userName?.trim() || "Jogador Anônimo";
        const pontuacaoAtual = quizState.score * 10;

        // 3. Monta a nova lista adicionando o jogador do momento
        const novaListaComNovoJogador = [...listaAtual, { name: nomeDoJogador, score: pontuacaoAtual }];
        
        // 4. Ordena a lista inteira colocando as maiores pontuações no topo
        const listaOrdenada = novaListaComNovoJogador.sort((a, b) => b.score - a.score);

        // 5. Faz o PUT para atualizar o banco de dados na nuvem com a lista organizada
        const responsePut = await fetch(API_URL, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Master-Key": MASTER_KEY
          },
          body: JSON.stringify({
            ranking: listaOrdenada
          })
        })

        if (!responsePut.ok) {
          throw new Error("Não foi possível sincronizar com o banco de dados remoto.")
        }

        // 6. Atualiza o estado visual da tela com os novos líderes ordenados
        setLeaders(listaOrdenada)

      } catch (error) {
        console.error("Erro no processamento automático do ranking:", error)
      }
    }
    
    processRanking()
  }, [quizState.score, quizState.userName]) // ➡️ Executa de forma segura baseando-se nos dados da partida atual

  return (
    <div id='gameover'>
        <h2>Desafio Concluído!</h2>
        <p>Pontuação: {quizState.score * 10}</p>
        <p>Você acertou {quizState.score} de {quizState.questions.length} perguntas.</p>
        <img src={WellDone} alt="Fim do Quiz" />
        
        {/* ➡️ MUDANÇA 2: O bloco antigo de input de texto sumiu! No lugar dele, colocamos uma mensagem de sucesso discreta */}
        <div className="ranking-success-container" style={{ margin: '20px 0', padding: '12px', backgroundColor: '#1c1a27', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ color: '#00ff7f', fontWeight: 'bold', fontSize: '14px', margin: 0 }}>✓ Sua pontuação foi calculada e salva automaticamente no ranking!</p>
        </div>

        {/* 🏆 LISTA VISUAL DO RANKING (Carrega e atualiza na hora) */}
        <div className="ranking-list" style={{ margin: '20px 0', padding: '15px', backgroundColor: '#1c1a27', borderRadius: '8px' }}>
          <h3 style={{ color: '#8435de', marginBottom: '15px' }}>🏆 Top Jogadores</h3>
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

        {/* ➡️ Ao clicar em Jogar Novamente, limpamos o estado para o próximo jogo */}
        <button onClick={() => dispatch({type: "NEW_GAME"})}>Jogar Novamente</button>
    </div>
  )
}

export default GameOver
