import React,{useEffect,useState} from 'react'


const PREFIX="message-socket-"

// KEY, init= default value
export default function LocalStorage(key,init) {
    // Montar a minha chave
    const prefixed=PREFIX+key

    const [value,setValue]=useState(()=>{
        
        const jsonV=localStorage.getItem(prefixed)
        // SE EXISTIR UMA VALOR NO LOCALSTORAGE IRÁ ADICIOAR AO VALUE
        // O VALOR DO LOCALSTORAGE
        if(jsonV !== null)return JSON.parse(jsonV)
        
        // CASO NÃO EXISTA, IRÁ VERIFICAR SE O SEGUNDO PARÂMETRO É UMA FUNÇÃO
        // PARA PODER RETORNAR AO VALUE O VALOR QUE ESSA FUNÇÃO RETORNA
        if(typeof init === 'function'){
            return init()
        }
        // CASO NÃO FOR UMA FUNÇÃO ENTÃO IRÁ RETORNAR O VALOR QUE ESTÁ DEFINIDO
        else{
            return init
        }
    })
    // SEMPRE QUE USAR O "setID" o useEffect IRÁ SER ACIONADO, IRÁ ADICIONAR
    // AO LOCALSTORAGE O VALOR QUE ESTOU DEFININDO.
    useEffect(()=>{
        localStorage.setItem(prefixed,JSON.stringify(value))
    },[prefixed,value])
    
    // QUANDO USAR ESSA FUNÇÃO EM ALGUM LOCAL, IRÁ PASSAR O value E O setValue
    // PARA O COMPONENTE. COM ISSO SEMPRE QUE USAR O SET PARA ALTERAR O VALUE IRÁ CAIR
    // NO useEffect
    return [value,setValue]
}
