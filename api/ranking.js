const BIN_ID = "6a8501d8da38895dfef51634"

const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`

export async function GET() {
  const accessKey = process.env.JSONBIN_ACCESS_KEY

  if (!accessKey) {
    return Response.json(
      { erro: "Chave do JSONBin não configurada." },
      { status: 500 }
    )
  }

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "X-Access-Key": accessKey,
        "X-Bin-Meta": "false"
      }
    })

    if (!response.ok) {
      return Response.json(
        { erro: "Não foi possível buscar o ranking." },
        { status: response.status }
      )
    }

    const dados = await response.json()

    return Response.json(dados)

  } catch (error) {
    console.error("Erro ao acessar o JSONBin:", error)

    return Response.json(
      { erro: "Erro interno do servidor." },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  const accessKey = process.env.JSONBIN_ACCESS_KEY

  if (!accessKey) {
    return Response.json(
      { erro: "Chave do JSONBin não configurada." },
      { status: 500 }
    )
  }

  try {
    const body = await request.json()

    const { nome, pontuacao, categoria } = body

    if (!nome || typeof pontuacao !== "number" || !categoria) {
      return Response.json(
        { erro: "Dados do jogador inválidos." },
        { status: 400 }
      )
    }

    const responseGet = await fetch(API_URL, {
      method: "GET",
      headers: {
        "X-Access-Key": accessKey,
        "X-Bin-Meta": "false"
      }
    })

    if (!responseGet.ok) {
      return Response.json(
        { erro: "Não foi possível ler o ranking." },
        { status: responseGet.status }
      )
    }

    const dadosCompletos = await responseGet.json()

    const chaveBanco =
      categoria.includes("Rebelde") || categoria.includes("RBD")
        ? "rankingRBD"
        : categoria.includes("Bíblia") || categoria.includes("Biblia")
        ? "rankingBiblia"
        : "rankingFutebol"

    const rankingAtual = dadosCompletos[chaveBanco] || []

    const novoRanking = [
      ...rankingAtual,
      {
        name: nome.trim(),
        score: pontuacao
      }
    ].sort((a, b) => b.score - a.score)

    const novoObjeto = {
      ...dadosCompletos,
      [chaveBanco]: novoRanking
    }

    const responsePut = await fetch(
      `https://api.jsonbin.io/v3/b/${BIN_ID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Key": accessKey
        },
        body: JSON.stringify(novoObjeto)
      }
    )

    if (!responsePut.ok) {
      return Response.json(
        { erro: "Não foi possível atualizar o ranking." },
        { status: responsePut.status }
      )
    }

    return Response.json({
      ranking: novoRanking
    })

  } catch (error) {
    console.error("Erro ao salvar ranking:", error)

    return Response.json(
      { erro: "Erro interno do servidor." },
      { status: 500 }
    )
  }
}