import { useState } from 'react';
import Actions from './components/Actions';
import Stats from './components/Stats';
import Panel from './components/Panel';
import People from './components/People';
import Footer from './components/Footer';
import StatsPage from './components/StatsPage';
import { useGameLogic } from './hooks/useGameLogic';
import './styles/App.css';
import { Toaster } from 'react-hot-toast';

function App() {
  const [view, setView] = useState<'game' | 'stats'>('game');
  const {
    websites,
    money,
    maxMoney,
    websitesPerSecond,
    sellsPerSecond,
    quality,
    people,
    maxPeople,
    staff,
    agencyUnlocked,
    agencyPurchased,
    agencyUpgraded,
    linkedInBros,
    buyAgency,
    buyAgencyUpgrade,
    createWebsite,
    sellWebsite,
    hireDev,
    hireSeller,
    buyBuilding,
    removeState,
    removeStorage,
    achievements
  } = useGameLogic();

  if (view === 'stats') {
    return <StatsPage onBack={() => setView('game')} />;
  }

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
          maxMoney={maxMoney}
          people={people}
          maxPeople={maxPeople}
          staff={staff}
          hireDev={hireDev}
          hireSeller={hireSeller}
          buyBuilding={buyBuilding}
          achievements={achievements}
          agencyUnlocked={agencyUnlocked}
          agencyPurchased={agencyPurchased}
          agencyUpgraded={agencyUpgraded}
          linkedInBros={linkedInBros}
          buyAgency={buyAgency}
          buyAgencyUpgrade={buyAgencyUpgrade}
        />
      </section>
      <Footer
        removeState={removeState}
        removeStorage={removeStorage}
        onToggleStats={() => setView('stats')}
      />
      <div>
        <Toaster position="bottom-right" />
      </div>
    </div>
  );
}

export default App;
