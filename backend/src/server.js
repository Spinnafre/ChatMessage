// const { Socket } = require('socket.io')

const io=require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  })
const cors=require('cors')



io.on('connection',socket=>{
    // Pegando o meu socket da URL
    const id=socket.handshake.query.id
    // Join é usado para escrever um socket em um determinado canal
    // Irá criar um canal
    socket.join(id)

    socket.on('send-message',({recipients,text})=>{
        recipients.forEach(recipient => {
            // cada um do receptor irá receber os outros receptores diferente dele
            //  ou seja se recipients for [1,2,3] então 1 irá receber 2,3 e continua
            const newRecipients=recipients.filter(r=>r != recipient)
            // recebe o canal
            newRecipients.push(id)
            socket.broadcast.to(recipient).emit('receive-message',{
                recipients:newRecipients,sender:id,text
            })

        });
    })
})