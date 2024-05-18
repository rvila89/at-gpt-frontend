import { useEffect, useState } from 'react'

import {
  GptMessage,
  MyMessage,
  TypingLoader,
  TextMessageBox,
} from '../../components'
import {
  createThreadUseCase,
  postQuestionUseCase,
} from '../../../core/use-cases'

interface Message {
  text: string
  isGpt: boolean
}

export const AssistantPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const [threadId, setThreadId] = useState<string>()

  // obtener el thread y si no existe crearlo

  useEffect(() => {
    const threadId = localStorage.getItem('threadId')
    if (threadId) {
      setThreadId(threadId)
    } else {
      createThreadUseCase().then((id) => {
        setThreadId(id)
        localStorage.setItem('threadId', id)
      })
    }
  }, [])

  const handlePost = async (text: string) => {
    if (!threadId) return

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

    // for (const reply of replies) {
    //   for (const message of reply.content) {
    //     setMessages((prev) => [
    //       ...prev,
    //       { text: message, isGpt: reply.role === 'assistant', info: reply },
    //     ])
    //   }
    // }
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
