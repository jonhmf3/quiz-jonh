import { useContext, useState } from "react"
import { QuizContext } from "../context/quiz"
import Quiz from "../img/quiz.svg"
import "./Welcome.css"

const Welcome = () => {
  const [quizState, dispatch] = useContext(QuizContext)
  const [localName, setLocalName] = useState("")

  const handleStart = () => {
    if (!localName.trim()) {
      alert("Por favor, digite seu nome ou apelido para começar!")
      return
    }

    dispatch({ type: "SET_USER_NAME", payload: localName.trim() })
    dispatch({ type: "CHANGE_STATE" })
  }

  return (
    <div id="welcome">
        <h2>Seja bem-vindo ao Quiz do Jonathan!</h2>
        
        <div style={{ margin: "20px 0", display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
          <label htmlFor="player-name" style={{ fontWeight: "bold", fontSize: "14px" }}>Como quer ser chamado no ranking?</label>
          <input 
            id="player-name"
            type="text" 
            placeholder="Digite seu nome aqui" 
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
            style={{ 
              padding: "10px", 
              borderRadius: "6px", 
              border: "2px solid #8435de", 
              backgroundColor: "#2b283d", 
              color: "white", 
              outline: "none",
              width: "250px",
              textAlign: "center"
            }}
          />
        </div>

        <p>Clique no botão abaixo para começar:</p>
        <button onClick={handleStart}>Iniciar</button>
        <img src={Quiz} alt="Inicio do quiz" />
    </div>
  )
}

export default Welcome
