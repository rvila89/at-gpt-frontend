interface GeneratePdfResponse {
  success: boolean
  data: Blob
  message: string
}

export const generatePdfUseCase = async (
  idPersona: number,
  setIsLoading: (isLoading: boolean) => void
): Promise<GeneratePdfResponse> => {
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
      data: new Blob(),
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
    //@ts-expect-error De momento obviamos
    return error
  } finally {
    setIsLoading(false)
  }
}
