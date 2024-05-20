import { useState } from 'react'
import { generatePdfUseCase } from '../../core/use-cases/assistant/generate-pdf.use-case'
import Spinner from './Spinner'
import { ToastContainer, toast } from 'react-toastify'
import Modal from './Modal'

interface DataType {
  id_persona: number
  nombre: string
  apellidos: string
  email: string
  telefono: string
  summary?: string
  idiomas: { id_idioma: number; idioma: string; nivel: string }[]
  skills: { id_skill: number; skill: string }[]
  educaciones: {
    id_educacion: number
    institucion: string
    fechaini: string
    fechafin: string
    area: string
    tipo: string
  }[]
}

interface TableComponentProps {
  data: DataType[]
}

const TableComponent: React.FC<TableComponentProps> = ({ data }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedPerson, setSelectedPerson] = useState<DataType | null>(null)

  const headers = Object.keys(data[0]).filter(
    (key) =>
      key !== 'id_persona' &&
      key !== 'summary' &&
      key !== 'idiomas' &&
      key !== 'skills' &&
      key !== 'educaciones'
  )

  const handleGeneratePdf = async (idPersona: number, namePersona: string) => {
    setIsLoading(true)
    const resp = await generatePdfUseCase(idPersona, setIsLoading)
    if (!resp.success) toast.error(resp.message)
    else {
      const pdfUrl = URL.createObjectURL(resp.data)
      const a = document.createElement('a')
      a.href = pdfUrl
      a.download = `${namePersona}-cv.pdf`
      document.body.appendChild(a)
      a.click()
    }
  }

  const handleRowClick = (person: DataType) => {
    setSelectedPerson(person)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedPerson(null)
  }

  return (
    <>
      {isLoading ? (
        <Spinner slow />
      ) : (
        <table>
          <thead>
            <tr className='bg-atmira-pink text-white font-bold p-4'>
              {headers.map((header) => (
                <th
                  key={header}
                  className='text-center p-2 first:rounded-l-2xl last:rounded-r-2xl'
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className='cursor-pointer'
                onClick={() => handleRowClick(item)}
              >
                {Object.entries(item).map(([key, value], cellIndex) => {
                  if (
                    key !== 'id_persona' &&
                    key !== 'summary' &&
                    key !== 'idiomas' &&
                    key !== 'skills' &&
                    key !== 'educaciones'
                  ) {
                    return (
                      <td key={cellIndex} className='text-center p-3'>
                        {value}
                      </td>
                    )
                  }

                  return null
                })}
                <td>
                  <button
                    className='btn-primary block mt-2 opacity-80 hover:bg-black'
                    onClick={(e) => {
                      e.stopPropagation() // Evita que el clic en el botón abra el modal
                      handleGeneratePdf(item.id_persona, item.nombre)
                    }}
                  >
                    <span className='mr-2'>Generar CV </span>
                    <i className='fa-regular fa-paper-plane'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        personData={selectedPerson}
      />
      <ToastContainer position='bottom-right' theme='colored' />
    </>
  )
}

export default TableComponent
