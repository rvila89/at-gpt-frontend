// import { QuestionResponse } from '../../../interfaces'

export const postQuestionUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_AT_GPT_API}/chat?prompt=${prompt}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    )

    const replies = await resp.json()
    console.log(replies)

    return replies
  } catch (error) {
    console.log(error)
    throw new Error('Error posting question')
  }
}
