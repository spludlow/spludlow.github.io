import { createTheme, ThemeProvider } from '@mui/material';
import { useRef } from 'react';
import './App.css';
import Header from './components/Header';
import Naivgation from './components/Navigation';
import Skills from './components/Skills';

const theme = createTheme({
  typography: {
    fontFamily: ['Montserrat']
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#98fadf'
    },
    text: {
      primary: '#FFFFFF90'
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#12192388',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        text: {
          color: '#FFFFFF90 !important',
          '&:hover': {
            color: '#FFF !important',
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#121923',
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            color: '#FFF !important',
          }
        }
      }
    }
  }
});

function App() {
  const skillsRef = useRef(null);

  const executeScroll = (ref) => ref.current.scrollIntoView({ behaviour: 'smooth', block: 'end' });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Naivgation>
          <Header executeScroll={() => executeScroll(skillsRef)} />
          <Skills skillsRef={skillsRef} />
        </Naivgation>
      </div>
    </ThemeProvider>
  );
}

export default App;
