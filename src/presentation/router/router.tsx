import { createBrowserRouter } from 'react-router-dom'
import { AssistantPage } from '../pages'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { Home } from '../pages'
import { NewPartner } from '../pages/new-partner/newPartner'
import { ConsultPartner } from '../pages/consult-partner/ConsultPartner'
import Reports from '../pages/reports/Reports'

export const menuRoutes = [
  // {
  //   to: '/orthography',
  //   icon: 'fa-solid fa-spell-check',
  //   title: 'Ortografía',
  //   description: 'Corregir ortografía',
  //   component: <OrthographyPage />,
  // },
  // {
  //   to: '/pros-cons',
  //   icon: 'fa-solid fa-code-compare',
  //   title: 'Pros & Cons',
  //   description: 'Comparar pros y contras',
  //   component: <ProsConsPage />,
  // },
  // {
  //   to: '/pros-cons-stream',
  //   icon: 'fa-solid fa-water',
  //   title: 'Como stream',
  //   description: 'Con stream de mensajes',
  //   component: <ProsConsStreamPage />,
  // },
  // {
  //   to: '/translate',
  //   icon: 'fa-solid fa-language',
  //   title: 'Traducir',
  //   description: 'Textos a otros idiomas',
  //   component: <TranslatePage />,
  // },
  // {
  //   to: '/text-to-audio',
  //   icon: 'fa-solid fa-podcast',
  //   title: 'Texto a audio',
  //   description: 'Convertir texto a audio',
  //   component: <TextToAudioPage />,
  // },
  // {
  //   to: '/audio-to-text',
  //   icon: 'fa-solid fa-comment-dots',
  //   title: 'Audio a texto',
  //   description: 'Convertir audio a texto',
  //   component: <AudioToTextPage />,
  // },
  // {
  //   to: '/image-generation',
  //   icon: 'fa-solid fa-image',
  //   title: 'Imágenes',
  //   description: 'Generar imágenes',
  //   component: <ImageGenerationPage />,
  // },
  // {
  //   to: '/image-tunning',
  //   icon: 'fa-solid fa-wand-magic',
  //   title: 'Editar imagen',
  //   description: 'Generación continua',
  //   component: <ImageTunningPage />,
  // },

  {
    to: '/chat',
    icon: 'fa-solid fa-user',
    title: 'ChatBot',
    component: <AssistantPage />,
  },
  {
    to: '/nuevo-socio',
    icon: 'fa-solid fa-plus',
    title: 'Añadir soci@',
    component: <NewPartner />,
  },
  {
    to: '/socios',
    icon: 'fa-solid fa-eye',
    title: 'Consultar soci@s',
    component: <ConsultPartner />,
  },
  {
    to: '/informes',
    icon: 'fa-solid fa-circle-info',
    title: 'Consultar informes',
    component: <Reports />,
  },
]

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    element: <DashboardLayout />,
    children: [
      ...menuRoutes.map((route) => ({
        path: route.to,
        element: route.component,
      })),
    ],
  },
])
