import Login from './components/Login'
import React from 'react'
import useLocalStorage from './Hooks/localStorage'
import { ContactsProvider } from './Contexts/ContactsProvider'
import { ConversationsProvider } from './Contexts/ConversationsProvider'

import Dashboard from './components/Dashboard'
import {SocketProvider} from './Contexts/SocketProvider'


function App() {
  const [id, setID] = useLocalStorage('id')

  // Definir o filho do context
  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider >
      </ContactsProvider>
    </SocketProvider>

  )

  return (
    id ? dashboard : <Login submitID={setID} />
  );
}

export default App;
