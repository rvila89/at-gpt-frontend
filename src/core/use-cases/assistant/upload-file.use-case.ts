interface UploadFileResponse {
  success: boolean
  data: any | null
  message: string
}

export const uploadFileUseCase = async (
  pdfFile,
  setIsLoading: (isLoading: boolean) => void
): Promise<UploadFileResponse> => {
  try {
    const formData = new FormData()
    formData.append('file', pdfFile)
    const resp = await fetch(`${import.meta.env.VITE_AT_GPT_API}/upload-pdf`, {
      method: 'POST',
      body: formData,
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
      result.message = 'El soci@ atmira ha sido incorporado exitosamente!'
    }

    return result
  } catch (error) {
    console.error('Error:', error)
    return error
  } finally {
    setIsLoading(false)
  }
}
