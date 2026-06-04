import { AuthProvider } from './context/AuthContext'
import { ReviewsProvider } from './context/ReviewsContext'
import AppRouter from './router/AppRouter'

export default function App() {
  return (
    <AuthProvider>
      <ReviewsProvider>
        <AppRouter />
      </ReviewsProvider>
    </AuthProvider>
  )
}
