import Actions from './components/Actions';
import Stats from './components/Stats';
import Panel from './components/Panel';
import People from './components/People';
import Footer from './components/Footer';
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
    buyBuilding,
    achievements
  } = useGameLogic();

  return (
    <div className="layout">
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
        <p className="italic mt-5">The game is auto saved after each 10 seconds.</p>
      </section>
      <section className="main">
        <Panel
          hireDev={hireDev}
          hireSeller={hireSeller}
          buyBuilding={buyBuilding}
          achievements={achievements}
        />
      </section>
      <Footer />
    </div>
  );
}

export default App;
