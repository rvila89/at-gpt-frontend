import { useEffect, useState } from 'react'
import { consultPartnersUseCase } from '../../../core/use-cases/assistant/consult-partners.use-case'
import Spinner from '../../components/Spinner'
import { ToastContainer, toast } from 'react-toastify'
import TableComponent from '../../components/TableComponent'

export const ConsultPartner = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [partners, setParners] = useState(null)

  useEffect(() => {
    const fetchPartners = async () => {
      const resp = await consultPartnersUseCase(setIsLoading)
      if (!resp.success) toast.error(resp.message)
      else {
        setParners(resp.data)
      }
    }

    fetchPartners()
  }, [])

  return (
    <div className='chat-container overflow-auto'>
      {isLoading && <Spinner />}
      {partners && <TableComponent data={partners} />}
      <ToastContainer position='bottom-right' theme='colored' />
    </div>
  )
}
