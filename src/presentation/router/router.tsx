import { createBrowserRouter } from 'react-router-dom'
import { AssistantPage } from '../pages'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { Home } from '../pages'
import { NewPartner } from '../pages/new-partner/NewPartner'
import { ConsultPartner } from '../pages/consult-partner/ConsultPartner'
import Reports from '../pages/reports/Reports'

export const menuRoutes = [
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
