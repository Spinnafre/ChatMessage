import React, { useContext, useState, useEffect } from 'react'

import io from 'socket.io-client'

const SocketContext = React.createContext()

export function useSocket() {
    return useContext(SocketContext)
}

export function SocketProvider({ id, children }) {
    const [socket, setSocket] = useState()

    useEffect(() => {
        // Conectando ao meu servidor socket
        const newSocket = io('http://localhost:8000', { query: { id } })
        // Passando a conexão do socket
        setSocket(newSocket)

        return () => newSocket.close()
    }, [id])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}
