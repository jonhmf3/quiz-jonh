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
            let quizQuestions = null;

            // Busca a categoria correta dentro do seu array de dados
            state.questions.forEach((question) => {
                if(question.category === action.payload){
                    // ✨ Garante que estamos pegando a lista COMPLETA de perguntas da categoria
                    quizQuestions = [...question.questions]; 
                }
            })

            // 🚀 MUDANÇA IMPORTANTE: Reordena a lista completa DEPOIS de carregar todas as perguntas
            const reorderedQuestions = quizQuestions.sort(() => Math.random() - 0.5);

            return {
                ...state,
                questions: reorderedQuestions, // Salva todas as perguntas embaralhadas
                currentQuestion: 0, // Começa sempre na primeira (índice 0)
                gameStage: STAGES[2],
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
