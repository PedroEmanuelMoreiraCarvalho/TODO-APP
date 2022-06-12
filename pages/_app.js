import ThemeProvider from '../contexts/theme_context'
import TasksProvider from '../contexts/tasks_context'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <TasksProvider><ThemeProvider><Component {...pageProps} /></ThemeProvider></TasksProvider>
}

export default MyApp
