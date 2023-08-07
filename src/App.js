import Home from './components/Home';
import './App.css';
// import Category from './components/Category';
// import Navbar from './components/Navbar';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./utils/store";
import Details from './components/Details';
import Cart from './components/Cart';
import UserContext from './utils/UserContext';


function AppLayout(){
  return(
    <>
   <Provider store={store}>
      <UserContext.Provider value={{}}>
   
        <Outlet />
      </UserContext.Provider>
    </Provider>
  
    </>
  )
}

const appRouter=createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
      {
        path:"/",
        element:<Home/>,
       
      },
      // {
      //   path:"/category/:id",
      //   element:<Category />
      // },
      {
        path:"/items/:id",
        element:<Details />
      },
      {
        path:"/cart",
        element:<Cart />
      }
    ]
  }

])
function App() {
  return (
    <div className="App">
     
      <RouterProvider router={appRouter}>

      </RouterProvider>
     
    </div>
  );
}

export default App;
