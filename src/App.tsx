import { useState } from 'react';
import Actions from './components/Actions';
import Stats from './components/Stats';
import Panel from './components/Panel';
import People from './components/People';
import Footer from './components/Footer';
import StatsPage from './components/StatsPage';
import EmailHint from './components/EmailHint';
import PyramidEmail from './components/PyramidEmail';
import { useGameLogic } from './hooks/useGameLogic';
import './styles/App.css';
import { Toaster } from 'react-hot-toast';

function App() {
  const [view, setView] = useState<'game' | 'stats'>('game');
  const {
    websites,
    money,
    websitesPerSecond,
    sellsPerSecond,
    quality,
    people,
    maxPeople,
    staff,
    agencyUnlocked,
    agencyPurchased,
    agencyUpgraded,
    pyramidEmailVisible,
    pyramidRetry,
    pyramidCanTry,
    pyramidCooldownLeft,
    flipUnlocked,
    flipPurchased,
    emailHintAvailable,
    linkedInBros,
    agiAchieved,
    agiElapsedMs,
    buyAgency,
    buyAgencyUpgrade,
    buyPyramidScheme,
    buyFlip,
    dismissEmailHint,
    createWebsite,
    sellWebsite,
    hireDev,
    hireSeller,
    buyBuilding,
    removeState,
    removeStorage,
    saveCheckpoint,
    listCheckpoints,
    loadCheckpointState,
    deleteCheckpoint,
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
          agiAchieved={agiAchieved}
          flipPurchased={flipPurchased}
        />
      </section>
      <section className="main flex flex-col gap-5">
        <People people={people} maxPeople={maxPeople} quality={quality} />
        <Panel
          money={money}
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
          flipUnlocked={flipUnlocked}
          flipPurchased={flipPurchased}
          buyFlip={buyFlip}
          agiAchieved={agiAchieved}
          agiElapsedMs={agiElapsedMs}
        />
      </section>
      <Footer
        removeState={removeState}
        removeStorage={removeStorage}
        saveCheckpoint={saveCheckpoint}
        listCheckpoints={listCheckpoints}
        loadCheckpointState={loadCheckpointState}
        deleteCheckpoint={deleteCheckpoint}
        onToggleStats={() => setView('stats')}
      />
      <div>
        <Toaster
          position="bottom-right"
          containerStyle={{ bottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
        />
      </div>
      <EmailHint
        visible={emailHintAvailable}
        raised={pyramidEmailVisible}
        onDismiss={dismissEmailHint}
      />
      <PyramidEmail
        visible={pyramidEmailVisible}
        retry={pyramidRetry}
        canTry={pyramidCanTry}
        cooldownLeft={pyramidCooldownLeft}
        onJoin={buyPyramidScheme}
      />
    </div>
  );
}

export default App;
