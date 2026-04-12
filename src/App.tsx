import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { PermissionsProvider } from './context/PermissionsContext'
import LoginPage from './pages/LoginPage'
import { PrivateRoute } from './components/routes/PrivateRoute'
import { AdminRoute } from './components/routes/AdminRoute'
import NotesPage from './pages/NotesPage'
import AdminPage from './pages/AdminPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60_000, retry: 1 },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <PermissionsProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />

              <Route element={<PrivateRoute />}>
                <Route path="/notes" element={<NotesPage />} />

                <Route element={<AdminRoute />}>
                  <Route path="/admin" element={<AdminPage />} />
                </Route>
              </Route>
            </Routes>
          </PermissionsProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}