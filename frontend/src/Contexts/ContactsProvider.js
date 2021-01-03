import React,{useContext} from 'react'
import useLocalStorage from '../Hooks/localStorage'

const ContactContext=React.createContext()

export function useContacts(){
    return useContext(ContactContext)
}

export function ContactsProvider({children}) {
    const [contacts,setContacts]=useLocalStorage('contacts',[])

    function createContact(id,name){
        setContacts(prevContact=>{
            // Pego a minha antiga lista e adiciono um novo contato
            return [...prevContact,{id,name}]
        })
    }

    return (
        // ESTOU PASSANDO A TODOS OS MEUS FILHOS O contacts e createContact
        <ContactContext.Provider value={{contacts,createContact}}>
            {children}
        </ContactContext.Provider>
    )
}
