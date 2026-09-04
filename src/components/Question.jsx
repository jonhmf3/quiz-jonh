import { useContext, useState, useEffect } from 'react'
import { QuizContext } from '../context/quiz'
import "./Question.css"
import Option from './Option'
import Level from "../img/level-up-next-level.gif"


const Question = () => {
  const [quizState, dispatch] = useContext(QuizContext)
  const currentQuestion = quizState.questions[quizState.currentQuestion]
  /*% Isso simplesmente pergunta: resposta escolhida === resposta correta ?,  
  Se forem iguais: acertou = true, Se forem diferentes: acertou = false */
const acertou = quizState.answerSelected === currentQuestion.answer


  // 🎭 Estados da tela de transição de dificuldade
  const [showTransition, setShowTransition] = useState(false)
  const [transitionStage, setTransitionStage] = useState("")

  // ⏱️ ESTADO DO CRONÔMETRO: Começa com 20 segundos para cada pergunta
  const [tempoRestante, setTempoRestante] = useState(20)

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
    setTempoRestante(20)
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

const getTransitionMessage = () => {
  const acertos = quizState.stageScore

  if (acertos === 5) {
    return "🔥 Perfeito! Você dominou o nível anterior com 5 de 5!"
  }

  if (acertos === 4) {
    return "👏 Mandou muito bem! Você acertou 4 de 5!"
  }

  if (acertos >= 2) {
    return `💪 Você acertou ${acertos} de 5. Dá para buscar ainda mais no próximo nível!`
  }

  if (acertos === 1) {
    return "🎯 Você acertou 1 de 5. Novo nível, nova chance de reagir!"
  }

  return "🎯 Nenhum acerto nesta etapa, mas agora começa um novo nível. Bora reagir!"
}

  // 🚧 RENDERIZA A TELA DE TRANSIÇÃO DE DIFICULDADE
 if (showTransition) {
  return (
    <div
      className="difficulty-transition"
      style={{
        padding: '30px',
        backgroundColor: '#1c1a27',
        borderRadius: '12px',
        textAlign: 'center',
        border: '3px solid #ccff00'
      }}
    >
      <img src={Level} alt="Mudança de nível" />

      <h2
        style={{
          color: '#ffcc00',
          fontSize: '28px',
          marginBottom: '10px'
        }}
      >
        NOVO NÍVEL!
      </h2>

      <p>{getTransitionMessage()}</p>

      <div
        style={{
          padding: '15px',
          backgroundColor: '#2b283d',
          borderRadius: '8px',
          margin: '25px 0',
          borderLeft: '5px solid #8435de'
        }}
      >
        <h3
          style={{
            color: '#8435de',
            fontSize: '20px',
            margin: 0
          }}
        >
          🔥 A dificuldade aumentou para o nível:{" "}
          <span
            style={{
              color: '#00ff7f',
              fontWeight: 'bold'
            }}
          >
            {transitionStage}
          </span>
          !
        </h3>
      </div>

      <button
        onClick={() => {
          dispatch({ type: "RESET_STAGE_SCORE" })
          setShowTransition(false)
        }}
      >
        🚀 Continuar para o nível {transitionStage}
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


{/*# a conta é: pergunta atual ÷ total de perguntas × 100 , exemplo: Pergunta 10 de 20  10 ÷ 20 = 0,5 0,5 × 100 = 50%, então a barra fica pela metade.   */}     

      <div className="progress-container">
  <div
    className="progress-bar"
    style={{
      width: `${((quizState.currentQuestion + 1) / quizState.questions.length) * 100}%`
    }}
  ></div>
</div>

{/*&A logica aqui é: combo 0 → não aparece, combo 1 → não aparece, combo 2 → 🔥 Combo x2, combo 3 → 🔥 Combo x3, combo 4 → 🔥 Combo x4,  errou → combo volta para 0 → desaparece    */}
      {quizState.combo >= 2 && (
  <div
    key={quizState.combo} // quando o combo muda de 2 para 3, por exemplo, o React trata esse elemento como renovado. Isso ajuda a animação a acontecer novamente. 
    className="combo-badge"
  >
    🔥 Combo x{quizState.combo}
  </div>
)}
      
        {/*A pergunta é distorcida?
        E
O jogador ainda não respondeu?
        ↓
SIM → adiciona a classe question-image-distorted
NÃO → imagem normal 
Então as duas condições precisam ser verdadeiras.*/}

      <h2>{currentQuestion.question}</h2>
      {currentQuestion.image && (
  <img 
  src={currentQuestion.image} 
  alt="Imagem da pergunta" 
  className={`question-image ${
      currentQuestion.distorted && !quizState.answerSelected
        ? "question-image-distorted"
        : ""
    }`} />
      )}

    
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

{/*% A lógica é:

alguém respondeu?
       ↓
      SIM
       ↓
acertou?
 ├─ SIM → Mandou bem!
 └─ NÃO
      ↓
      tempo acabou?
      ├─ SIM → Tempo esgotado!
      └─ NÃO → Quase! */}
     {quizState.answerSelected && (
  <div className={`answer-feedback ${
    acertou ? "feedback-correct" : "feedback-wrong"
  }`}>

    {acertou ? (
      <p>🎉 Mandou bem! Resposta correta!</p>
    ) : quizState.answerSelected === "TEMPO_ESGOTADO_ERRADO" ? (
      <p>
        ⏰ Tempo esgotado! A resposta correta era:{" "}
        <strong>{currentQuestion.answer}</strong>
      </p>
    ) : (
      <p>
        😬 Quase! A resposta correta era:{" "}
        <strong>{currentQuestion.answer}</strong>
      </p>
    )}

  </div>
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
