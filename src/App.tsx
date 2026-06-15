import Actions from './components/Actions';
import Stats from './components/Stats';
import Panel from './components/Panel';
import People from './components/People';
import Footer from './components/Footer';
import { useGameLogic } from './hooks/useGameLogic';
import './styles/App.css';
import { Toaster } from 'react-hot-toast';

function App() {
  const {
    websites,
    money,
    websitesPerSecond,
    sellsPerSecond,
    quality,
    people,
    maxPeople,
    agencyUnlocked,
    agencyPurchased,
    linkedInBros,
    buyAgency,
    createWebsite,
    sellWebsite,
    hireDev,
    hireSeller,
    buyBuilding,
    removeState,
    removeStorage,
    achievements
  } = useGameLogic();

  return (
    <div className="layout">
      <section className="sidebar">
        <Stats
          money={money}
          websites={websites}
          websitesPerSecond={websitesPerSecond}
          sellsPerSecond={sellsPerSecond}
          quality={quality}
        />
        <Actions
          sellWebsite={sellWebsite}
          createWebsite={createWebsite}
          isDisabled={websites < 1}
        />
      </section>
      <section className="main flex flex-col gap-5">
        <People people={people} maxPeople={maxPeople} quality={quality} />
        <Panel
          money={money}
          hireDev={hireDev}
          hireSeller={hireSeller}
          buyBuilding={buyBuilding}
          achievements={achievements}
          agencyUnlocked={agencyUnlocked}
          agencyPurchased={agencyPurchased}
          linkedInBros={linkedInBros}
          buyAgency={buyAgency}
        />
      </section>
      <Footer removeState={removeState} removeStorage={removeStorage} />
      <div>
        <Toaster position="bottom-right" />
      </div>
    </div>
  );
}

export default App;
