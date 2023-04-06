import React, { useState, useEffect, FormEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { API_UTENTE } from "../../API/api";
import axios from "axios";
interface Props {
    key: number;
    valore: string;
}


const Componente1= (): JSX.Element => {
    const [nome, setNome] = useState<string>("");
    const [cognome, setCognome] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [eta, setEta] = useState<number>(0);
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");


    
    interface DatiUtente{
        idUtente:number,
        nome:string,
        cognome:string,
        eta:number,
        email:string,
        password:string
    }
    const [json, setJson] = useState<any[]>([]) //dati ricevuti da axios registrazione
    function GestisciRegistrazione(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        // validazioni bl
        if(eta<18){
            toast.error("Devi essere maggiorenne", {
                position: toast.POSITION.TOP_CENTER
            });
            return false
        }
        if(password.includes(":")){
            toast.error("La password non deve avere un :", {
                position: toast.POSITION.TOP_CENTER
            });
            return false
        }
        if(password !== confirmPassword){
            toast.error("Le password devono coincidere", {
                position: toast.POSITION.TOP_CENTER
            });
            return false
        }
        
        // TO-DO controllo passwords corrette...

        // axios registrazione

        const dati:DatiUtente={
            idUtente:0,
            nome:nome,
            cognome:cognome,
            eta:eta,
            email:email,
            password:password
        }
        axios.post(API_UTENTE, dati)
            .then(r => {
                if(r.data.success)
                toast.success(r.data.messaggio, {
                    position: toast.POSITION.TOP_CENTER
                });
                else{
                    toast.error(r.data.messaggio, {
                        position: toast.POSITION.TOP_CENTER
                    });
                }
                setJson(r.data)
            })
            .catch(err => {
                toast.error("Qualcosa è andato storto", {
                    position: toast.POSITION.TOP_CENTER
                });
                console.log(err)}
                )
        
                //   async function getDati() {
                //       try {              
                //           const response = await axios.get(API_PRODOTTI);                
                //           setJson(response.data);                
                //       } catch (error) {
                //           if (error instanceof Error)
                //               console.error(error);
                //       }
                //   }
                //   getDati()
 

        alert("ok")
    }

    return (
        <>
            <form>
                <input type="text" 
                       value={nome} 
                       onChange={(e) => setNome(e.currentTarget.value)} 
                       placeholder="nome"
                       />
                <input type="text" 
                       value={cognome}
                       onChange={(e) => setCognome(e.currentTarget.value)} 
                       placeholder="cognome"
                />
                <input type="email" 
                       value={email}
                       onChange={(e) => setEmail(e.currentTarget.value)} 
                       placeholder="email"

                />
                <input type="number" 
                       value={eta}
                       min={18}
                       onChange={(e) => setEta(Number(e.currentTarget.value))} 
                       placeholder="età"
                />
                <input type="password" 
                       value={password}
                       onChange={(e) => setPassword(e.currentTarget.value)} 
                       placeholder="password"
                       pattern="^[^:]*$"
                />
                <input type="password" 
                       value={confirmPassword}
                       onChange={(e) => setConfirmPassword(e.currentTarget.value)} 
                       placeholder="conferma password"
                       pattern="^[^:]*$"

                />
                
                <button onClick={GestisciRegistrazione} >Registrati</button>
            </form>
            <ToastContainer/>
            
        </>
    )
}

export default Componente1;

