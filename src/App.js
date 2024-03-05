import { Container} from '@mui/system';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { MovieProvider } from './components/Context/MovieContext';
import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/MainNav';
import Edit from './Pages/Edit/Edit';
import Home from './Pages/Home/Home';
import Search from './Pages/Search/Search';
// eslint-disable-next-line
import Sort from './Pages/Sort/Sort';




function App() {

  

  return (
    <MovieProvider>
    <BrowserRouter>
      <Header />
      <div className='app'>
        <Container>
          <Routes >
            <Route path='/home' element={<Home />} />
            <Route path='/edit' element={<Edit />} />
            {/* <Route path='/sort' element={<Sort />} /> */}
            <Route path='/search' element={<Search />} />
          </Routes>
        </Container>

      </div>

      <SimpleBottomNavigation />
    </BrowserRouter>
    </MovieProvider>
    

  )
}


export default App;
