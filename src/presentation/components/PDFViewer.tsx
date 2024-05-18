import { useState } from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { uploadFileUseCase } from '../../core/use-cases'
import Spinner from './Spinner'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const PDFViewer = () => {
  const [pdfFile, setPdfFile] = useState(null)
  const [pdfView, setPdfView] = useState(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fileType = ['application/pdf']

  const handleChange = (e) => {
    const selectedFile = e.target.files[0]
    setPdfFile(selectedFile)
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader()
        reader.readAsDataURL(selectedFile)
        reader.onload = (e) => {
          setPdfView(e.target.result)
        }
      } else {
        setPdfView(null)
      }
    } else {
      console.log('please select pdf')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const resp = await uploadFileUseCase(pdfFile, setIsLoading)
    if (!resp.success) toast.error(resp.message)
    else toast.success(resp.message)
  }

  return (
    <div className='h-[95%]'>
      <form onSubmit={handleSubmit}>
        <input
          type='file'
          className='form-control'
          onChange={handleChange}
          accept='application/pdf'
        />
        <button className='btn-primary block mt-2' type='submit'>
          <span className='mr-2'>Añadir</span>
          <i className='fa-regular fa-paper-plane'></i>
        </button>
      </form>

      <div className='pdf-container'>
        {isLoading ? (
          <Spinner slow />
        ) : (
          <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js'>
            {pdfView && (
              <>
                <Viewer fileUrl={pdfView} defaultScale={1.5} />
              </>
            )}
          </Worker>
        )}
      </div>
      <ToastContainer position='bottom-right' theme='colored' />
    </div>
  )
}
