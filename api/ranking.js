export async function GET() {
  const accessKey = process.env.JSONBIN_ACCESS_KEY

  if (!accessKey) {
    return Response.json(
      { erro: "Chave do JSONBin não configurada." },
      { status: 500 }
    )
  }

  return Response.json({
    mensagem: "A API encontrou a chave com segurança!",
  })
}