export const generatePdfUseCase = async (
  idPersona: number,
  setIsLoading: (isLoading: boolean) => void
) => {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_AT_GPT_API}/personas/${idPersona}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const result = {
      success: false,
      message: '',
    }
    if (!resp.ok) {
      if (resp.status === 400) {
        // Manejar error específico 400
        const data = await resp.json()
        result.message = data.message
      } else {
        throw new Error(`HTTP error! status: ${resp.status}`)
      }
    } else {
      const data = await resp.blob()
      result.success = true
      result.data = data
    }

    return result
  } catch (error) {
    console.error('Error:', error)
    return error
  } finally {
    setIsLoading(false)
  }
}
