import Actions from './components/Actions';
import Stats from './components/Stats';
import Panel from './components/Panel';
import People from './components/People';
import { useGameLogic } from './hooks/useGameLogic';
import './styles/App.css';

function App() {
  const {
    websites,
    money,
    websitesPerSecond,
    moneyPerSecond,
    people,
    maxPeople,
    createWebsite,
    sellWebsite,
    hireDev,
    hireSeller,
    buyBuilding
  } = useGameLogic();

  return (
    <div>
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
      <footer className="border w-100">Test</footer>
    </div>
  );
}

export default App;
