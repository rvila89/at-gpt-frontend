import { useState } from 'react'
import { generatePdfUseCase } from '../../core/use-cases/assistant/generate-pdf.use-case'
import Spinner from './Spinner'
import { ToastContainer, toast } from 'react-toastify'

interface DataType {
  id_persona: number
  nombre: string
  apellidos: string
  email: string
  telefono: string
}

interface TableComponentProps {
  data: DataType[]
}

const TableComponent: React.FC<TableComponentProps> = ({ data }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const headers = Object.keys(data[0]).filter((key) => key !== 'id_persona')
  const rows = data.map((item) => Object.values(item))

  const handleGeneratePdf = async (idPersona: number, namePersona: string) => {
    console.log('idP', idPersona)
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

  return (
    <>
      {isLoading && <Spinner />}
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
          {rows.map((row, index) => (
            <tr key={index} className='cursor-pointer'>
              {row.map((cell, index) => {
                if (index !== 1) {
                  return (
                    <td key={index} className='text-center p-3'>
                      {cell}
                    </td>
                  )
                }
              })}
              <td>
                <button
                  className='btn-primary block mt-2 opacity-80 hover:bg-black'
                  onClick={() => handleGeneratePdf(row[0], row[1])}
                >
                  <span className='mr-2'>Generar CV </span>
                  <i className='fa-regular fa-paper-plane'></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer position='bottom-right' theme='colored' />
    </>
  )
}

export default TableComponent
