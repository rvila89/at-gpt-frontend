import { useState } from 'react'
import {
  GptMessage,
  GptOrthographyMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from '../../components'
import { orthographyUseCase } from '../../../core/use-cases'

interface Message {
  text: string
  isGpt: boolean
  info?: {
    userScore: number
    errors: string[]
    message: string
  }
}

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (text: string) => {
    setIsLoading(true)
    setMessages((prev) => [...prev, { text: text, isGpt: false }])

    const { ok, errors, message, userScore } = await orthographyUseCase(text)

    console.log({ ok, errors, message, userScore })
    if (!ok) {
      setMessages((prev) => [
        ...prev,
        { text: 'No se pudo realizar la conexión', isGpt: true },
      ])
    } else {
      setMessages((prev) => [
        ...prev,
        {
          text: message,
          isGpt: true,
          info: {
            userScore,
            errors,
            message,
          },
        },
      ])
    }

    setIsLoading(false)

    // Todo: Añadir el mensaje de isGPT en true
  }

  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'>
          <GptMessage text='Hola, puedes escribir tu texto en español, y te ayudo con las correcciones' />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptOrthographyMessage
                key={index}
                errors={message.info!.errors}
                message={message.info!.message}
                userScore={message.info!.userScore}
              />
            ) : (
              <MyMessage key={index} text={message.text} />
            )
          )}

          {isLoading && (
            <div className='col-start-1 col-end-12 fade-in'>
              <TypingLoader />
            </div>
          )}
        </div>
      </div>

      <TextMessageBox
        onSendMessage={handlePost}
        placeholder='Escribe aquí lo que deseas'
        disableCorrections
      />
    </div>
  )
}
