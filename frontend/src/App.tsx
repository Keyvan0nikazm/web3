import './App.css'
import { useState, createContext } from 'react'
import Home from './pages/home'
import Welcome from './pages/Welcome'
import List from './pages/List'
import Add from './pages/Add'

// eslint-disable-next-line react-refresh/only-export-components
export const PageContext = createContext<{
    currentPage: string;
    setCurrentPage: (page: string) => void;
}>({
    currentPage: 'Welcome',
    setCurrentPage: () => {},
})

function App() {
  const [currentPage, setCurrentPage] = useState<string>('Welcome')

  function handlePageChange(page: string) {
    window.history.pushState(null, page, `/${page.toLowerCase()}`);
    setCurrentPage(page);
  }

  const pages: { [key: string]: React.FunctionComponent } = {
    "Welcome": Welcome,
    "List": List,
    "Add": Add,
    "Home": Home
  }

  const CurrentPageComponent = pages[currentPage] || Welcome;

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage: handlePageChange }}>
      <CurrentPageComponent />
    </PageContext.Provider>
  );
}

export default App
