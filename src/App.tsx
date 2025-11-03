import { useEffect, useState } from 'react';
import Actions from './components/Actions';
import Stats from './components/Stats';
import Panel from './components/Panel';
import People from './components/People';
import type { HireFunction } from './types';
import useGameStorage from './hooks/gameStorage';
import './styles/App.css';

function App() {
  const [money, setMoney] = useState(10000);
  const [websites, setWebsites] = useState(0);
  const [websitesPerSecond, setWebsitesPerSecond] = useState(0);
  const [moneyPerSecond, setMoneyPerSecond] = useState(0);
  const [people, setPeople] = useState(0);
  const [maxPeople, setMaxPeople] = useState(10);

  const gameState = {
    websites,
    money,
    websitesPerSecond,
    moneyPerSecond,
    people,
    maxPeople
  };

  const { load } = useGameStorage(gameState);

  useEffect(() => {
    const init = async () => {
      const savedData = await load();
      if (savedData) {
        setWebsites(savedData.websites);
        setMoney(savedData.money);
      }
    };
    init();
  }, []);

  // ToDo: Alert if moneyPerSecond is not viable
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

  // TODO: Move these functions away

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
    if (money >= cost && people < maxPeople) {
      setMoney(money - cost);
      setWebsitesPerSecond(websitesPerSecond + increment);
      setPeople(people + 1);
    }
  };

  const hireSeller: HireFunction = (cost, increment) => {
    if (money >= cost && people < maxPeople) {
      setMoney(money - cost);
      setMoneyPerSecond(moneyPerSecond + increment);
      setPeople(people + 1);
    }
  };

  const buyBuilding: HireFunction = (cost, increment) => {
    if (money >= cost) {
      setMoney(money - cost);
      setMaxPeople(maxPeople + increment);
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
        <People people={people} maxPeople={maxPeople} />
      </section>
      <section className="main">
        <Panel hireDev={hireDev} hireSeller={hireSeller} buyBuilding={buyBuilding} />
      </section>
    </div>
  );
}

export default App;
