import React,{useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from './components/Navbar'
import "./App.css"
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import Signin from './components/screens/Signin'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import CreatePost from './components/screens/CreatePost'
import {reducer,initialstate} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
import Createpost from './components/screens/CreatePost'
import SubscribesUserPost from './components/screens/SubscribesUserpost'
export const UserContext = createContext()


const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
      const user = JSON.parse(localStorage.getItem("user"))
      if(user){
        dispatch({type:"USER",payload:user})
      //  history.push('/')
      }else{
        history.push('/signin')
      }
  },[])
  return(
    <Switch>
    <Route exact path="/" >
    <Home/>
  </Route>
  <Route path="/signin">
    <Signin />
  </Route>
  <Route exact path="/profile">
    <Profile />
  </Route>
  <Route  path="/signup">
    <Signup />
  </Route>
  <Route path="/createpost">
    <Createpost />
  </Route>
  <Route path="/profile/:userid">
    <UserProfile />
  </Route>
  <Route path="/myfollowerpost">
    <SubscribesUserPost />
  </Route>
  </Switch>
  )
}
function App() {
  const [state,dispatch] = useReducer(reducer,initialstate)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <NavBar/>
    <Routing />
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
