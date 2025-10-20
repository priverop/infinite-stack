import { useState } from 'react';
import Actions from './components/Actions';
import Stats from './components/Stats';
import './styles/App.css';

function App() {
  const [money, setMoney] = useState(0);
  const [websites, setWebsites] = useState(0);

  function createWebsite() {
    setWebsites(websites + 1);
  }

  function sellWebsite() {
    if (websites > 0) {
      setWebsites(websites - 1);
      setMoney(money + 1);
    }
  }

  return (
    <div className="wrapper">
      <section className="sidebar">
        <Stats money={money} websites={websites} />
        <Actions sellWebsite={sellWebsite} createWebsite={createWebsite} />
      </section>
      <section className="main">Main section</section>
    </div>
  );
}

export default App;
