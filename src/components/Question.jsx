import { useContext, useState, useEffect } from 'react'
import { QuizContext } from '../context/quiz'
import "./Question.css"
import Option from './Option'

const Question = () => {
  const [quizState, dispatch] = useContext(QuizContext)
  const currentQuestion = quizState.questions[quizState.currentQuestion]

  // 🎭 Estados para controlar a tela de transição de dificuldade
  const [showTransition, setShowTransition] = useState(false)
  const [transitionStage, setTransitionStage] = useState("")

  // 🔄 Monitora a numeração da pergunta para disparar o aviso de dificuldade
  useEffect(() => {
    // Pergunta 6 (índice 5 no código): Início do nível Médio
    if (quizState.currentQuestion === 5 && !quizState.answerSelected) {
      setTransitionStage("MÉDIO")
      setShowTransition(true)
    }
    // Pergunta 11 (índice 10 no código): Início do nível Difícil
    if (quizState.currentQuestion === 10 && !quizState.answerSelected) {
      setTransitionStage("DIFÍCIL")
      setShowTransition(true)
    }
  }, [quizState.currentQuestion])

  const onSelectOption = (option) => {
    dispatch({
      type: "CHECK_ANSWER",
      payload: { answer: currentQuestion.answer, option }
    })
  }

  // 🚧 RENDERIZA A TELA DE TRANSIÇÃO DE DIFICULDADE (SE ATIVADA)
  if (showTransition) {
    return (
      <div className="difficulty-transition" style={{
        padding: '30px',
        backgroundColor: '#1c1a27',
        borderRadius: '12px',
        textAlign: 'center',
        border: '3px solid #ffcc00',
        animation: 'pulse 1.5s infinite alternate'
      }}>
        <h2 style={{ color: '#ffcc00', fontSize: '28px', marginBottom: '10px' }}>⚠️ ATENÇÃO JOGADOR!</h2>
        <p style={{ fontSize: '18px', margin: '20px 0', color: '#fff' }}>
          Você concluiu a etapa anterior com sucesso. Prepare-se!
        </p>
        <div style={{
          padding: '15px',
          backgroundColor: '#2b283d',
          borderRadius: '8px',
          margin: '25px 0',
          borderLeft: '5px solid #8435de'
        }}>
          <h3 style={{ color: '#8435de', fontSize: '20px', margin: 0 }}>
            🔥 A dificuldade aumentou para o nível: <span style={{ color: '#00ff7f', fontWeight: 'bold' }}>{transitionStage}</span>!
          </h3>
        </div>
        <p style={{ fontSize: '14px', color: '#aaa', marginBottom: '25px' }}>
          As próximas perguntas exigirão muito mais do seu conhecimento.
        </p>
        <button 
          onClick={() => setShowTransition(false)} 
          style={{
            padding: '12px 30px',
            backgroundColor: '#00ff7f',
            color: '#1c1a27',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          🚀 Estou Pronto, Mandar Bala!
        </button>
      </div>
    )
  }

  // 📝 RENDERIZAÇÃO NORMAL DA PERGUNTA DO QUIZ
  return (
    <div id="question">
      {/* Exibe o nível atual da pergunta baseado na contagem */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '12px', color: '#aaa' }}>
        <span>Pergunta {quizState.currentQuestion + 1} de {quizState.questions.length}</span>
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
          />
        ))}
      </div>

      {!quizState.answerSelected && !quizState.help && (
        <>
          {currentQuestion.tip && <button onClick={() => dispatch({ type: "SHOW_TIP" })}>Dica</button>}
        </>
      )}

      <button onClick={() => dispatch({ type: "REMOVE_OPTION" })}>Excluir uma</button>
      
      {!quizState.answerSelected && quizState.help === "tip" && <p>{currentQuestion.tip}</p>}
      
      {quizState.answerSelected && (
        <button onClick={() => dispatch({ type: "CHANGE_QUESTION" })}>Continuar</button>
      )}
    </div>
  )
}

export default Question
