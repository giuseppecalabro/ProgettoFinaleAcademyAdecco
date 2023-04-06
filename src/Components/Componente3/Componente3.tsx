import axios from "axios";
import React, { useState, useEffect, FormEvent } from "react";
import { API_CARRELLO, API_LOGIN } from "../../API/api";
import { Prodotto, ProdottoCarrello } from "../Componente2/Componente2";
interface Props {
    key: number;
    valore: string;
}


const Componente3= (): JSX.Element => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // AXIOS LOGIN
    const [token, setToken] = useState<string[]>([])
    function gestisciLogin(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        alert("ok")
        axios.get(API_LOGIN, {
            headers:{
                Authorization: "Basic "+email+":"+password 
            }
        })
            .then(r => setToken(r.data))
            .catch(err => console.log(err))
    }
    console.log(token);
    
    // AXIOS RECUPERO DATI CARRELLO
    const [carrello, setCarrello] = useState<any[]>([])
    useEffect(() => {
        axios.get(API_CARRELLO,{
            headers:{
                Authorization: "Bearer "+token[0]
            }
        })
        .then(r => setCarrello(r.data))
        .catch(err => console.log(err))
        }, [token]);

    // calcolo sommaTotale
    const [prezzoTotale, setPrezzoTotale] = useState<number>()
    let sommaOrdine:number = 0
    for(let i = 0; i<carrello.length; i++){
        sommaOrdine += carrello[i].prezzo*carrello[i].quantita
    }
    useEffect(()=>{
        setPrezzoTotale(sommaOrdine)
    },[sommaOrdine])
    

    // GESTIONE ELIMINAZIONE CLIENT
    function gestisciEliminazione(event: React.MouseEvent<HTMLButtonElement>){
        event.preventDefault();
        // const prodottoSelezionato:Prodotto = (carrello.filter(prodotto=>prodotto.idProdotto === idProdottoRecuperato))
        const idProdottoRecuperato:number = Number(event.currentTarget.id);
        const idDaEliminare:number = carrello.findIndex(prodotto => prodotto.idProdotto === idProdottoRecuperato);
        const nuovoCarrello = [...carrello.slice(0, idDaEliminare), ...carrello.slice(idDaEliminare + 1)];
        setCarrello(nuovoCarrello);


        // axios.delete(API_CARRELLO+"/"+idProdottoRecuperato,{
        //     headers:{
        //         Authorization: "Bearer "+token[0]
        //     }
        // })
        //     .then(r => console.log(r.data))
        //     .catch(err => console.log(err))
    }
    

    // GESTIONE MODIFICA QUANTITA' CLIENT
    const [quantita, setQuantita] = useState<number>(1)

    function gestisciModifica(event: React.MouseEvent<HTMLButtonElement>){
        event.preventDefault();
        const idProdottoRecuperato:number = Number(event.currentTarget.id);
        // const prodottoSelezionato:Prodotto = (carrello.filter(prodotto=>prodotto.idProdotto === idProdottoRecuperato))
        setCarrello(carrello.map((prodotto)=>{
                if(prodotto.idProdotto === idProdottoRecuperato){
                    return{...prodotto, quantita: quantita}
                }else{
                    return prodotto
                }
            })
        )



        

        // axios.put(API_CARRELLO+"/"+idProdottoRecuperato,{
        //     headers:{
        //         Authorization: "Bearer "+token[0]
        //     }
        // })
        //     .then(r => console.log(r.data))
        //     .catch(err => console.log(err))
    }

    // FUNZIONE INVIA ORDINE
    function inviaOrdine(event: React.MouseEvent<HTMLButtonElement>){
        event.preventDefault();
        console.log(carrello);

        for(let i=0; i<carrello.length; i++){
            
                    axios.put(API_CARRELLO+"/"+i, {
                        data:carrello[i],
                        headers:{
                            Authorization: "Bearer "+token[0]
                        }
                    })
                        .then(r => console.log(r.data))
                        .catch(err => console.log(err))
            
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
        }
  
        // axios.put(API_CARRELLO, carrello,{
        //     headers:{
        //         Authorization: "Basic "+token[0]
        //     }
        // })
        //     .then(r => console.log(r.data))
        //     .catch(err => console.log(err))

    }



    // function VisualizzaForm(){
    //     return(
    //         <>
    //         <form>
    //             <input type="email" 
    //                    value={email} 
    //                    onChange={(e) => setEmail(e.currentTarget.value)} 
                       
    //                    />
    //             <input type="password" 
    //                    value={password} 
    //                    onChange={(e) => setPassword(e.currentTarget.value)} 
                       
    //                    />
    //             <button onClick={gestisciLogin} >Accedi</button>
    //         </form>
    //         </>
    //     )
    // }
    return (
        <>
            { token[0] ? "" : <form>
                <input type="email" 
                       value={email} 
                       onChange={(e) => setEmail(e.currentTarget.value)} 
                       
                       />
                <input type="password" 
                       value={password} 
                       onChange={(e) => setPassword(e.currentTarget.value)} 
                       
                       />
                <button onClick={gestisciLogin} >Accedi</button>
            </form>
            }
            {/* elementi nel carrello */}
                {carrello.map((p, i)=>
                    <div className="card mt-5" style={{width: "18rem"}}>
                        <img src={`/img/${i%6+1}.jpg`} className="card-img-top" alt="prodotto"/>
                        <div className="card-body">
                            <h5 className="card-title">{p.prodotto}</h5>
                            <p className="card-text">Prezzo: {p.prezzo}</p>
                            Quantità:
                            <p className="card-text">{p.quantita}</p>
                            <label>Modifica quantità</label>
                            <input type="number" 
                                   value={quantita}
                                   onChange={(e)=>setQuantita(Number(e.currentTarget.value))}
                            />
                            <button id={p.idProdotto} className="btn btn-warning my-1"
                                    onClick={gestisciModifica}
                            >Modifica quantità</button>
                            <button id={p.idProdotto} className="btn btn-danger"
                                    onClick={gestisciEliminazione}
                            >Elimina dal carrello</button>

                        </div>
                    </div>
                   )}
                   
                    <p>Prezzo Totale: {sommaOrdine} €</p> 
                    <button className="btn btn-success"
                            onClick={inviaOrdine}
                        >Conferma Ordine
                    </button>
               
        </>
    )
}

export default Componente3;

