import { useContext, useState, useEffect } from 'react'
import { QuizContext } from '../context/quiz'
import "./Question.css"
import Option from './Option'
import Level from "../img/level-up-next-level.gif"

const Question = () => {
  const [quizState, dispatch] = useContext(QuizContext)
  const currentQuestion = quizState.questions[quizState.currentQuestion]

  // 🎭 Estados da tela de transição de dificuldade
  const [showTransition, setShowTransition] = useState(false)
  const [transitionStage, setTransitionStage] = useState("")

  // ⏱️ ESTADO DO CRONÔMETRO: Começa com 15 segundos para cada pergunta
  const [tempoRestante, setTempoRestante] = useState(15)

  // 🔄 MONITOR DO JOGO: Controla a transição de dificuldade
  useEffect(() => {
    if (quizState.currentQuestion === 5 && !quizState.answerSelected) {
      setTransitionStage("MÉDIO")
      setShowTransition(true)
    }
    if (quizState.currentQuestion === 10 && !quizState.answerSelected) {
      setTransitionStage("DIFÍCIL")
      setShowTransition(true)
    }
    // Toda vez que o jogador muda de pergunta, reseta o relógio para 15 segundos
    setTempoRestante(15)
  }, [quizState.currentQuestion])

  // ⏱️ EFEITO DO RELÓGIO: Faz a contagem regressiva segundo a segundo
  useEffect(() => {
    // Se o usuário já respondeu ou se a tela de transição está ativa, congela o relógio
    if (quizState.answerSelected || showTransition) return;

    // Se o tempo chegou a zero, força a resposta como errada por estouro de tempo
    if (tempoRestante === 0) {
      dispatch({
        type: "CHECK_ANSWER",
        payload: { answer: currentQuestion.answer, option: "TEMPO_ESGOTADO_ERRADO" }
      })
      return;
    }

    // Cria o temporizador para rodar e diminuir 1 segundo a cada 1000 milissegundos
    const temporizador = setInterval(() => {
      setTempoRestante((tempoAnterior) => tempoAnterior - 1)
    }, 1000)

    // Limpeza obrigatória do React para não acumular lixo na memória do celular
    return () => clearInterval(temporizador)
  }, [tempoRestante, quizState.answerSelected, showTransition])

  const onSelectOption = (option) => {
    dispatch({
      type: "CHECK_ANSWER",
      payload: { answer: currentQuestion.answer, option }
    })
  }

  // 🚧 RENDERIZA A TELA DE TRANSIÇÃO DE DIFICULDADE
  if (showTransition) {
    return (
      <div className="difficulty-transition" style={{
        padding: '30px',
        backgroundColor: '#1c1a27',
        borderRadius: '12px',
        textAlign: 'center',
        border: '3px solid #00ffa2'
      }}>
        <img src={Level} alt="Fim do Quiz" />
        <h2 style={{ color: '#ffcc00', fontSize: '28px', marginBottom: '10px' }}>⚠️ ATENÇÃO JOGADOR!</h2>
        <p style={{ fontSize: '18px', margin: '20px 0', color: '#fff' }}>
          Você concluiu a etapa anterior com sucesso. Prepare-se!
        </p>
        <div style={{ padding: '15px', backgroundColor: '#2b283d', borderRadius: '8px', margin: '25px 0', borderLeft: '5px solid #8435de' }}>
          <h3 style={{ color: '#8435de', fontSize: '20px', margin: 0 }}>
            🔥 A dificuldade aumentou para o nível: <span style={{ color: '#00ff7f', fontWeight: 'bold' }}>{transitionStage}</span>!
          </h3>
        </div>
        <button onClick={() => setShowTransition(false)} style={{ padding: '12px 30px', backgroundColor: '#00ff7f', color: '#1c1a27', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
          🚀 Estou Pronto, Mandar Bala!
        </button>
      </div>
    )
  }

  return (
    <div id="question">
      {/* Barra informativa do topo atualizada com o Relógio Regressivo */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '12px', color: '#aaa', alignItems: 'center' }}>
        <span>Pergunta {quizState.currentQuestion + 1} de {quizState.questions.length}</span>
        
        {/* ⏱️ EXIBIÇÃO VISUAL DO CRONÔMETRO (Muda de cor para vermelho se o tempo estiver acabando!) */}
        <span style={{ 
          fontWeight: 'bold', 
          fontSize: '14px',
          color: tempoRestante > 5 ? '#00ff7f' : '#ff4747',
          padding: '4px 10px',
          backgroundColor: '#1c1a27',
          borderRadius: '6px',
          border: tempoRestante > 5 ? '1px solid #00ff7f' : '1px solid #ff4747'
        }}>
          ⏱️ {tempoRestante}s
        </span>

        <span style={{ 
          fontWeight: 'bold', 
          color: quizState.currentQuestion < 5 ? '#00ff7f' : quizState.currentQuestion < 10 ? '#ffcc00' : '#ff4747' 
        }}>
          Nível: {quizState.currentQuestion < 5 ? 'Fácil' : quizState.currentQuestion < 10 ? 'Médio' : 'Difícil'}
        </span>
      </div>
      
      <h2>{currentQuestion.question}</h2>
      
      <div id="options-container">
        {currentQuestion.options.map((option) => (
          <Option 
            option={option} 
            key={option} 
            answer={currentQuestion.answer} 
            selectOption={() => onSelectOption(option)} 
            hide={quizState.optionToHide === option ? "hide" : null}
            disabled={quizState.answerSelected} // Bloqueia cliques adicionais após o tempo esgotar
          />
        ))}
      </div>

      {/* Alerta textual exibido apenas se o tempo estourar a zero */}
      {quizState.answerSelected === "TEMPO_ESGOTADO_ERRADO" && (
        <p style={{ color: '#ff4747', fontWeight: 'bold', textAlign: 'center', margin: '15px 0' }}>🛑 O tempo acabou! Você perdeu essa rodada.</p>
      )}

      {!quizState.answerSelected && !quizState.help && (
        <>
          {currentQuestion.tip && <button onClick={() => dispatch({ type: "SHOW_TIP" })}>Dica</button>}
        </>
      )}

      {!quizState.answerSelected && (
        <button onClick={() => dispatch({ type: "REMOVE_OPTION" })}>Excluir uma</button>
      )}
      
      {!quizState.answerSelected && quizState.help === "tip" && <p>{currentQuestion.tip}</p>}
      
      {quizState.answerSelected && (
        <button onClick={() => dispatch({ type: "CHANGE_QUESTION" })}>Continuar</button>
      )}
    </div>
  )
}

export default Question
