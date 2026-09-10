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
console.log("removeUsed:", quizState.removeUsed)
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
    <div className="difficulty-transition">

      <img
        src={Level}
        alt="Mudança de nível"
        className="level-image"
      />

      <span className="level-label">
        LEVEL UP
      </span>

      <h2>Novo nível!</h2>

      <p className="transition-message">
        {getTransitionMessage()}
      </p>

      <div className="new-level">
        <span>Próxima dificuldade</span>
        <strong>{transitionStage}</strong>
      </div>

      <button
        className="transition-button"
        onClick={() => {
          dispatch({ type: "RESET_STAGE_SCORE" })
          setShowTransition(false)
        }}
      >
        Continuar
      </button>

    </div>
  )
}

return (
  <div className="question-wrapper">

   <div
  
  id="question"
  className={`
    ${currentQuestion.image ? "question-with-image" : ""}
    ${quizState.help === "tip" ? "question-tip-open" : ""}
    ${quizState.combo >= 2 ? "combo-active" : ""}
  `}
>

      {/* Barra superior: pergunta, relógio e nível */}
   <div className="question-topbar">

  <span className="question-counter">
    {quizState.currentQuestion + 1} de {quizState.questions.length}
  </span>

  <div className="progress-container progress-inline">
    <div
      className="progress-bar"
      style={{
        width: `${
          ((quizState.currentQuestion + 1) /
            quizState.questions.length) *
          100
        }%`
      }}
    ></div>
  </div>

  <span
  className="question-timer"
  style={{
    color: tempoRestante > 5 ? '#00ff7f' : '#ff4747',
    border:
      tempoRestante > 5
        ? '1px solid #00ff7f'
        : '1px solid #ff4747'
  }}
>
  {tempoRestante}s
</span>

  

</div> 

    

      {/* Combo */}
      {quizState.combo >= 2 && (
        <div
          key={quizState.combo}
          className="combo-badge"
        >
          🔥 Combo x{quizState.combo}
        </div>
      )}

      {/* Pergunta */}
      <h2>{currentQuestion.question}</h2>

     

    {currentQuestion.image ? (

  <div className="image-question-content">

    <div className="image-question-left">
      <img
        src={currentQuestion.image}
        alt="Imagem da pergunta"
        className={`question-image ${
          currentQuestion.distorted && !quizState.answerSelected
            ? "question-image-distorted"
            : ""
        }`}
      />
    </div>

    <div id="options-container" className="image-question-options">
      {currentQuestion.options.map((option) => (
        <Option
          option={option}
          key={option}
          answer={currentQuestion.answer}
          selectOption={() => onSelectOption(option)}
          hide={quizState.optionToHide === option ? "hide" : null}
          disabled={quizState.answerSelected}
        />
      ))}
    </div>

  </div>

) : (

  <div id="options-container">
    {currentQuestion.options.map((option) => (
      <Option
        option={option}
        key={option}
        answer={currentQuestion.answer}
        selectOption={() => onSelectOption(option)}
        hide={quizState.optionToHide === option ? "hide" : null}
        disabled={quizState.answerSelected}
      />
    ))}
  </div>

)}

      


    </div>

         {/* Botões fora do telão */}
    <div className="question-actions">

      <div className="question-actions-left">
        {/* DICA */}
        {!quizState.answerSelected && currentQuestion.tip && (
          <button
            className={quizState.help === "tip" ? "help-used" : ""}
            disabled={quizState.help === "tip"}
            onClick={() => dispatch({ type: "SHOW_TIP" })}
          >
            {quizState.help === "tip" ? "💡 Dica usada" : "💡 Dica"}
          </button>
        )}

        {/* EXCLUIR */}
        {!quizState.answerSelected && (
          <button
            className={quizState.removeUsed ? "help-used" : ""}
            disabled={quizState.removeUsed}
            onClick={() => dispatch({ type: "REMOVE_OPTION" })}
          >
            {quizState.removeUsed ? "✂️ Usado" : "✂️ Excluir"}
          </button>
        )}
      </div>

      <div className="question-actions-right">
        {quizState.answerSelected && (
          <button onClick={() => dispatch({ type: "CHANGE_QUESTION" })}>
            Continuar →
          </button>
        )}
      </div>

      {/* 🗣️ BALÃO DO APRESENTADOR (Aparece apenas se a resposta foi selecionada) */}
      {quizState.answerSelected && (
        <div className={`balao-apresentador ${acertou ? "balao-acertou" : "balao-errou"}`}>
          {acertou ? (
            <span>🎉 Mandou bem! Resposta correta!</span>
          ) : quizState.answerSelected === "TEMPO_ESGOTADO_ERRADO" ? (
            <span>⏰ Tempo esgotado!</span>
          ) : (
            <span>😬 Quase! Resposta incorreta.</span>
          )}
        </div>
      )}

    


      <div className="question-actions-right">
        {quizState.answerSelected && (
          <button onClick={() => dispatch({ type: "CHANGE_QUESTION" })}>
            Continuar →
          </button>
        )}
      </div>

      {/* 🗣️ BALÃO 1: FEEDBACK DE ACERTO/ERRO (Aparece após responder) */}
      {quizState.answerSelected && (
        <div className={`balao-apresentador ${acertou ? "balao-acertou" : "balao-errou"}`}>
          {acertou ? (
           <span>🎉 Mandou bem! Resposta correta!</span>
          ) : quizState.answerSelected === "TEMPO_ESGOTADO_ERRADO" ? (
            <span>⏰ Tempo esgotado!</span>
          ) : (
            <span>😬 Quase! Resposta incorreta.</span>
          )}
        </div>
      )}

      {/* 💡 NOVO BALÃO 2: DICA DO APRESENTADOR (Aparece ao clicar em Dica, antes de responder) */}
      {!quizState.answerSelected && quizState.help === "tip" && (
        <div className="balao-apresentador balao-dica">
          <span>💡 {currentQuestion.tip}</span>
        </div>
      )}

    </div>
  </div>
);
};

export default Question;




