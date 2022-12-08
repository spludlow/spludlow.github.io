import { createTheme, ThemeProvider } from '@mui/material';
import './App.css';
import About from './components/About';
import Header from './components/Header';
import Naivgation from './components/Navigation';
import Skills from './components/Skills';

const theme = createTheme({
  typography: {
    fontFamily: ['Montserrat']
  },
  palette: {
    mode: 'dark',
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
          backgroundColor: '#05051099',
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

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Naivgation>
          <Header />
          <About />
          <Skills />
        </Naivgation>
      </div>
    </ThemeProvider>
  );
}

export default App;
