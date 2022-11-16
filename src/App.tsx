import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stage } from './views/public/Stage'
import AppHeader from './views/_partials/AppHeader'

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppHeader />
      <Stage />
    </QueryClientProvider>
  )
}

export default App
