import React from 'react'

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

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  personData: DataType | null
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, personData }) => {
  if (!isOpen || !personData) return null

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
      <div className='bg-white p-8 rounded-3xl shadow-lg max-w-3xl w-full '>
        <h2 className='text-2xl mb-4'>Detalles de la Persona</h2>
        <p>
          <strong>Nombre:</strong> {personData.nombre}
        </p>
        <p>
          <strong>Apellidos:</strong> {personData.apellidos}
        </p>
        <p>
          <strong>Email:</strong> {personData.email}
        </p>
        <p>
          <strong>Teléfono:</strong> {personData.telefono}
        </p>
        <p>
          <strong>Summary:</strong> {personData.summary}
        </p>
        <p>
          <strong>Habilidades:</strong>
          <div className='flex flex-wrap gap-2 mt-2'>
            {personData.skills.map((skill: any) => (
              <span
                key={skill.id_skill}
                className='bg-atmira-pink text-white rounded-full px-3 py-1 text-sm cursor-pointer'
              >
                {skill.nombre}
              </span>
            ))}
          </div>
        </p>
        <p>
          <strong>Idiomas:</strong>{' '}
          {personData.idiomas.map((idioma: any) => (
            <div key={idioma.id_idioma}>
              {idioma.idioma} ({idioma.nivel})
            </div>
          ))}
        </p>
        <p>
          <strong>Educación:</strong>{' '}
          {personData.educaciones.map((educacion: any) => (
            <div key={educacion.id_educacion}>
              {educacion.institucion} ({educacion.fechaini} -{' '}
              {educacion.fechafin})
            </div>
          ))}
        </p>

        <button className='mt-4 btn-primary' onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  )
}

export default Modal
