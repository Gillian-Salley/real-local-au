import { createBrowserRouter } from 'react-router'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ToursPage from './pages/ToursPage'
import TourDetailPage from './pages/TourDetailPage'
import AboutPage from './pages/AboutPage'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: 'tours', Component: ToursPage },
      { path: 'tour/:id', Component: TourDetailPage },
      { path: 'about', Component: AboutPage },
    ],
  },
])
