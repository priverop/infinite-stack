import { useState } from 'react';
import Actions from './components/Actions';
import Stats from './components/Stats';
import Panel from './components/Panel';
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
  console.log('websites:', websites, 'isDisabled:', websites < 1);
  return (
    <div className="wrapper">
      <section className="sidebar">
        <Stats money={money} websites={websites} />
        <Actions
          sellWebsite={sellWebsite}
          createWebsite={createWebsite}
          isDisabled={websites < 1}
        />
      </section>
      <section className="main">
        <Panel />
      </section>
    </div>
  );
}

export default App;
