import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Capsules from './Pages/Capsules';
import Cores from './Pages/Cores';
import Crew from './Pages/Crew';
import CrewCard from './Pages/CrewCard';
import Dragons from './Pages/Dragons';
import DragonsCard from './Pages/DragonsCard';
import Home from './Pages/Home';
import LandPads from './Pages/LandPads';
import LandPadsCard from './Pages/LandPadsCard';
import LaunchCard from './Pages/LaunchCard';
import Launches from './Pages/Launches';
import LaunchPads from './Pages/LaunchPads';
import LaunchPadsCard from './Pages/LaunchPadsCard';
import PayLoads from './Pages/PayLoads';
import Roadster from './Pages/Roadster';
import Rockets from './Pages/Rockets';
import RocketsCard from './Pages/RocketsCard';
import Ships from './Pages/Ships';
import ShipsCard from './Pages/ShipsCard';
import StarLink from './Pages/StarLink';
import PageNotFound from './Pages/PageNotFound';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/capsules' element={<Capsules />} />
        <Route path='/cores' element={<Cores />} />
        <Route path='/crew' element={<Crew />} />
        <Route path='/crew/:id' element={<CrewCard />} />
        <Route path='/dragons' element={<Dragons />} />
        <Route path='/dragons/:id' element={<DragonsCard />} />
        <Route path='/landpads' element={<LandPads />} />
        <Route path='/landpads/:id' element={<LandPadsCard />} />
        <Route path='/launches' element={<Launches />} />
        <Route path='/launches/:id' element={<LaunchCard />} />
        <Route path='/launchpads' element={<LaunchPads />} />
        <Route path='/launchpads/:id' element={<LaunchPadsCard />} />
        <Route path='/payloads' element={<PayLoads />} />
        <Route path='/roadster' element={<Roadster />} /> 
        <Route path='rockets' element={<Rockets />} />
        <Route path='/rockets/:id' element={<RocketsCard />} />
        <Route path='/ships' element={<Ships />} />
        <Route path='/ships/:id' element={<ShipsCard />} />
        <Route path='/starlink' element={<StarLink />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
