import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Head } from './components/Head';
import { Body } from './components/Body';
import { WatchPage } from './components/WatchPage'
import { Provider } from 'react-redux';
import store from './utils/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Head />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/watch/:videoId" element={<WatchPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;