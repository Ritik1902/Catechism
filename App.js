import 'react-native-gesture-handler';
import React, { useState } from 'react'
import Router from './src/Route';
import { UserContext } from './src/Utils/ContextRouter';



const App = () => {
  const [SelectedMenuItem, setSelectedMenuItem] = useState('')
  return (

    <UserContext.Provider value={{ SelectedMenuItem, setSelectedMenuItem }}>
      
        <Router />
      
    </UserContext.Provider>

  );
}
export default App;



