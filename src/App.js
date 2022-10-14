import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import  React  from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginSignupContainer from './components/AuthenticationComponents/LoginSignupContainer';
import  Layout  from "./components/Layout";
import PageNotFoundComponent from './components/PageNotFoundComponent';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRouteComponent/ProtectedRoute';
import { QueryCache, QueryClient, QueryClientProvider} from 'react-query'
import { handleApiError } from './utils/libs/handleApiError';

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat"
  },
  palette: {
    background: {
      default: "#f9f9f9"
    }
  }
})


const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      handleApiError(error);
    }
  })
});


function App() {

  return (

    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <div><Toaster position="top-right" reverseOrder={false}/></div>
        <Router>
            <Switch>
              <Route exact path="/login">
                < LoginSignupContainer />
              </Route>
              <Route exact path="/signup">
                < LoginSignupContainer signup={true}/>
              </Route>
              
              <ProtectedRoute path="/app" component={Layout} />
              {/* <Route path="/app" component={Layout} /> */}

              <Route exact path="/" render={() => (
                "sdsd" ? (
                  <Redirect to="/app"/>
                ) : (
                  <div>You are not logged in.</div>
                )
              )}/>

              {/** 404 route */}
              <Route component={PageNotFoundComponent} />

              {/** 500 route */}
              

            </Switch>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
   
  );
}

export default App;
