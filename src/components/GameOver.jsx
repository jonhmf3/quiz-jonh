import { useContext, useState, useEffect } from 'react'
import { QuizContext } from '../context/quiz'
import WellDone from "../img/welldone.svg"
import "./GameOver.css"

const ENDERECO_BASE = "https://" + "api.jsonbin.io/v3/b/";
const ID_DO_SEU_BIN = "6a8501d8da38895dfef51634";
const API_URL = ENDERECO_BASE + ID_DO_SEU_BIN;
const MASTER_KEY = "$2a$10$EKCQjrXfx3foSGQinigs4.VWkzeiLpULey.cLgpo6kqYIht2W5ihS";

const GameOver = () => {
  const [quizState, dispatch] = useContext(QuizContext)
  const [leaders, setLeaders] = useState([])

  // 🏷️ 1. Identifica qual categoria foi jogada nesta partida para saber onde salvar/buscar
  const categoriaJogada = quizState.questions[0]?.category || "Futebol";

  // 🗄️ 2. Mapeia o nome da categoria para a chave exata do banco de dados na nuvem
  const obterChaveBanco = (categoria) => {
    if (categoria.includes("Rebelde") || categoria.includes("RBD")) return "rankingRBD";
    if (categoria.includes("Bíblia") || categoria.includes("Biblia")) return "rankingBiblia";
    return "rankingFutebol"; // Padrão
  };

  const chaveBancoAtual = obterChaveBanco(categoriaJogada);

  useEffect(() => {
    const processRanking = async () => {
      try {
        // 3. Faz o GET para buscar o objeto completo com todos os rankings da nuvem
        const responseGet = await fetch(API_URL, {
          method: "GET",
          headers: {
            "X-Master-Key": MASTER_KEY,
            "X-Bin-Meta": "false"
          }
        })
        const dadosCompletosDoBanco = await responseGet.json()

        // 4. Captura apenas a lista específica do tema jogado (se não existir nada ainda, começa um array vazio)
        const listaDesteTema = dadosCompletosDoBanco[chaveBancoAtual] || [];

        // 5. Prepara os dados do jogador atual e calcula a pontuação (15 perguntas * 10 = 150 pts max)
        const nomeDoJogador = quizState.userName?.trim() || "Jogador Anônimo";
        const pontuacaoAtual = quizState.score * 10;

        // 6. Monta a nova lista adicionando o novo recordista
        const novaListaComNovoJogador = [...listaDesteTema, { name: nomeDoJogador, score: pontuacaoAtual }];
        
        // 7. Ordena colocando as maiores pontuações no topo
        const listaOrdenada = novaListaComNovoJogador.sort((a, b) => b.score - a.score);

        // 8. 🚨 Atualiza o objeto geral preservando as listas das OUTRAS categorias que não foram jogadas agora
        const novoObjetoParaEnviar = {
          ...dadosCompletosDoBanco, // Mantém o que já tinha dos outros temas
          [chaveBancoAtual]: listaOrdenada // Atualiza APENAS a lista do tema atual
        };

        // 9. Faz o PUT para atualizar o banco de dados na nuvem com a nova estrutura separada
        const responsePut = await fetch(API_URL, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Master-Key": MASTER_KEY
          },
          body: JSON.stringify(novoObjetoParaEnviar)
        })

        if (!responsePut.ok) {
          throw new Error("Erro na sincronização.")
        }

        // 10. Atualiza a tela exibindo apenas o Top Líderes do tema selecionado
        setLeaders(listaOrdenada)

      } catch (error) {
        console.error("Erro no processamento do ranking por categoria:", error)
      }
    }
    
    processRanking()
  }, [quizState.score, quizState.userName, chaveBancoAtual])

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
