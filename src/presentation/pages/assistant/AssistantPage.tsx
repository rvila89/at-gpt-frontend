import { useState } from 'react'

import {
  GptMessage,
  MyMessage,
  TypingLoader,
  TextMessageBox,
} from '../../components'
import { postQuestionUseCase } from '../../../core/use-cases'

interface Message {
  text: string
  isGpt: boolean
}

export const AssistantPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (text: string) => {
    setIsLoading(true)
    setMessages((prev) => [...prev, { text: text, isGpt: false }])

    //TODO: UseCase
    const replies = await postQuestionUseCase(text)
    setIsLoading(false)

    setMessages((prev) => [
      ...prev,
      {
        text: replies.success
          ? replies.data
          : typeof replies.messageError === 'string'
          ? replies.messageError
          : 'Algo ha ido mal, prueba mas tarde',
        isGpt: true,
      },
    ])
  }

  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'>
          <GptMessage text='Buenos días, soy AT-GPT, ¿en qué puedo ayudarte?' />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text={message.text} />
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
        placeholder='Escribe aquí...'
        disableCorrections
      />
    </div>
  )
}
