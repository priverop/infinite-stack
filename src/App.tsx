import { useEffect, useState } from 'react';
import Actions from './components/Actions';
import Stats from './components/Stats';
import Panel from './components/Panel';
import type { HireFunction } from './types';
import './styles/App.css';

function App() {
  const [money, setMoney] = useState(10000);
  const [websites, setWebsites] = useState(0);
  const [websitesPerSecond, setWebsitesPerSecond] = useState(0);
  const [moneyPerSecond, setMoneyPerSecond] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setWebsites((prevWebsites) => {
        const newWebsites = prevWebsites + websitesPerSecond;

        // We need to update the money here to get the actual updated newWebsites value
        // This happens because in the same second we need to update two values
        if (moneyPerSecond > 0 && moneyPerSecond <= newWebsites) {
          setMoney((prevMoney) => prevMoney + moneyPerSecond);
          return newWebsites - moneyPerSecond;
        }

        return newWebsites;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [websitesPerSecond, moneyPerSecond]);

  function createWebsite(): void {
    setWebsites(websites + 1);
  }

  function sellWebsite(): void {
    if (websites > 0) {
      setWebsites(websites - 1);
      setMoney(money + 1);
    }
  }

  const hireDev: HireFunction = (cost, increment) => {
    if (money >= cost) {
      setMoney(money - cost);
      setWebsitesPerSecond(websitesPerSecond + increment);
    }
  };

  const hireSeller: HireFunction = (cost, increment) => {
    if (money >= cost) {
      setMoney(money - cost);
      setMoneyPerSecond(moneyPerSecond + increment);
    }
  };

  return (
    <div className="wrapper">
      <section className="sidebar">
        <Stats
          money={money}
          websites={websites}
          websitesPerSecond={websitesPerSecond}
          moneyPerSecond={moneyPerSecond}
        />
        <Actions
          sellWebsite={sellWebsite}
          createWebsite={createWebsite}
          isDisabled={websites < 1}
        />
      </section>
      <section className="main">
        <Panel money={money} hireDev={hireDev} hireSeller={hireSeller} />
      </section>
    </div>
  );
}

export default App;
