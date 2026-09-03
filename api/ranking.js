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