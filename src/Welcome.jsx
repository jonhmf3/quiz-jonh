import { useContext, useState } from "react" // ➡️ MUDANÇA 1: Adicionado o 'useState' para controlar o texto do campo
import { QuizContext } from "../context/quiz"
import Quiz from "../img/quiz.svg"
import "./Welcome.css"

const Welcome = () => {
  const [quizState, dispatch] = useContext(QuizContext)
  const [localName, setLocalName] = useState("") // ➡️ MUDANÇA 2: Criado o estado para armazenar o nome digitado localmente

  // ➡️ MUDANÇA 3: Criada uma função para gerenciar o clique do botão Iniciar
  const handleStart = () => {
    // Se o nome estiver vazio ou cheio de espaços, exibe um alerta e para a execução
    if (!localName.trim()) {
      alert("Por favor, digite seu nome ou apelido para começar!")
      return
    }

    // Envia o nome para salvar globalmente no Contexto (que criamos no passo anterior)
    dispatch({ type: "SET_USER_NAME", payload: localName.trim() })

    // Avança para a próxima tela do jogo
    dispatch({ type: "CHANGE_STATE" })
  }

  return (
    <div id="welcome">
        <h2>Seja bem-vindo</h2>
        
        {/* ➡️ MUDANÇA 4: Adicionada a estrutura visual do campo de texto */}
        <div style={{ margin: "20px 0", display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
          <label htmlFor="player-name" style={{ fontWeight: "bold", fontSize: "14px" }}>Como quer ser chamado no ranking?</label>
          <input 
            id="player-name"
            type="text" 
            placeholder="Digite seu nome aqui" 
            value={localName}
            onChange={(e) => setLocalName(e.target.value)} // Atualiza o estado a cada letra digitada
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
        {/* ➡️ MUDANÇA 5: O botão agora chama a nossa função handleStart em vez de disparar o dispatch direto */}
        <button onClick={handleStart}>Iniciar</button>
        <img src={Quiz} alt="Inicio do quiz" />
    </div>
  )
}

export default Welcome

//O que mudou aqui na prática?
// useState: Captura cada letra que a pessoa digita no teclado e guarda dentro de localName.
// handleStart: Essa função serve como um "guarda do trânsito". Ela olha se o texto está preenchido. Se estiver certo, ela primeiro chama a ação de guardar o nome (SET_USER_NAME) e logo em seguida libera a troca de tela do jogo (CHANGE_STATE).
