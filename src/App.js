import { useRef } from 'react';
import './App.css';
import Header from './components/Header';
import Naivgation from './components/Navigation';
import Skills from './components/Skills';

function App() {
  const skillsRef = useRef(null);

  const executeScroll = (ref) => ref.current.scrollIntoView({ behaviour: 'smooth', block: 'end' });

  return (
    <div className="App">
      <Naivgation>
        <Header executeScroll={() => executeScroll(skillsRef)} />
        <Skills skillsRef={skillsRef} />
      </Naivgation>
    </div>
  );
}

export default App;
