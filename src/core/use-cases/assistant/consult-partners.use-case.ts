interface UploadFileResponse {
  success: boolean
  data: any | null
  message: string
}

export const consultPartnersUseCase = async (
  setIsLoading: (isLoading: boolean) => void
): Promise<UploadFileResponse> => {
  try {
    const resp = await fetch(`${import.meta.env.VITE_AT_GPT_API}/personas`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = {
      success: false,
      data: null,
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
      const data = await resp.json()
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
