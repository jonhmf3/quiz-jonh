import { createContext, useReducer } from "react";
import questions from "../data/questions_complete"

const BASE_URL = "https://mockapi.io";

const STAGES = ["Start", "Category", "Playing",  "End"]

const initialState = {
    gameStage: STAGES[0],
    questions,
    currentQuestion: 0,
    score: 0,
    answerSelected: false,
    help: false,
    optionToHide: null,
    // ➡️ MUDANÇA 1: Adicionamos este campo para começar vazio e guardar o nome globalmente
    userName: "" 
}

const quizReducer = (state, action) => {
console.log(state, action)

    switch(action.type){
        // ➡️ MUDANÇA 2: Criamos este caso novo ("case"). Quando ele for chamado,
        // ele vai pegar o nome que o usuário digitou (action.payload) e salvar no estado.
        case "SET_USER_NAME":
            return {
                ...state,
                userName: action.payload
            }

        case "CHANGE_STATE":
            return {
                ...state,
                gameStage: STAGES[1],
            }

              case "START_GAME":
            let todasAsPerguntasDaCategoria = [];

            // 1. Busca a categoria selecionada pelo jogador
            state.questions.forEach((question) => {
                if(question.category === action.payload){
                    todasAsPerguntasDaCategoria = [...question.questions]; 
                }
            });

            // 2. Separa as perguntas em gavetas por dificuldade
            const faceis = todasAsPerguntasDaCategoria.filter(q => q.difficulty === "facil");
            const medias = todasAsPerguntasDaCategoria.filter(q => q.difficulty === "media");
            const dificeis = todasAsPerguntasDaCategoria.filter(q => q.difficulty === "dificil");

            // 3. Embaralha cada gaveta de forma independente
            const faceisEmbaralhadas = faceis.sort(() => Math.random() - 0.5);
            const mediasEmbaralhadas = medias.sort(() => Math.random() - 0.5);
            const dificeisEmbaralhadas = dificeis.sort(() => Math.random() - 0.5);

            // 4. ✂️ Pega exatamente 5 de cada nível (totalizando 15 perguntas no jogo)
            const selecionadasFaceis = faceisEmbaralhadas.slice(0, 5);
            const selecionadasMedias = mediasEmbaralhadas.slice(0, 5);
            const selecionadasDificeis = dificeisEmbaralhadas.slice(0, 5);

            // 5. 🤝 Junta todas na ordem correta da partida: primeiro as fáceis, depois médias, depois difíceis
            const filaFinalDoJogo = [
                ...selecionadasFaceis,
                ...selecionadasMedias,
                ...selecionadasDificeis
            ];

            return {
                ...state,
                questions: filaFinalDoJogo, // O jogo agora terá exatamente 15 perguntas escalonadas!
                currentQuestion: 0,
                gameStage: STAGES,
            }


       

             case "CHANGE_QUESTION":
            const nextQuestion = state.currentQuestion + 1;
            let endGame = false;

            // ✨ Verifica dinamicamente se a próxima posição realmente NÃO existe na sua lista completa
            if (nextQuestion >= state.questions.length) {
                endGame = true;
            }

           return {
                ...state,
                currentQuestion: nextQuestion,
                gameStage: endGame ? STAGES[3] : state.gameStage,
                answerSelected: false,
                help: false,
                optionToHide: null // Limpa a ajuda da rodada anterior
            }

        case "NEW_GAME":
            return initialState

        case "CHECK_ANSWER":
            if(state.answerSelected) return state

            const answer = action.payload.answer;
            const option = action.payload.option;
            let correctAnswer = 0;

            if (answer === option) correctAnswer = 1;

            return {
                ...state,
                score: state.score + correctAnswer,
                answerSelected: option,
              }

        case "SHOW_TIP":
            return {
                ...state,
                help: "tip"
            }

        case "REMOVE_OPTION":
            let questioWithoutOption = state.questions[state.currentQuestion]

            let repeat = true
            let optionToHide

            questioWithoutOption.options.forEach((option) => {
                if(option !== questioWithoutOption.answer && repeat){
                    optionToHide = option;
                    repeat = false
                }
            })

            return {
                ...state,
                optionToHide,
                help: true
            }

        default:
            return state
    }
}

export const QuizContext = createContext()

export const QuizProvider = ({children}) => {
    const value = useReducer(quizReducer, initialState)

    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}
