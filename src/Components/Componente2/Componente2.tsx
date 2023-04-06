import axios from "axios";
import React, { useState, useEffect, FormEvent } from "react";
import { API_CARRELLO, API_LOGIN, API_PRODOTTI } from "../../API/api";
import { toast } from "react-toastify";
interface Props {
    key: number;
    valore: string;
}
export type Prodotto={
    productId:number,
    productName:string,
    unitPrice:number,
    unitsInStock:number,
}[]

export interface ProdottoCarrello{
    idCarrello:number,
    idProdotto:number,
    prodotto:string,
    quantita:number,
    prezzo:number,
    tokenCliente:string
}

const Componente2= (): JSX.Element => {
    const [cercaPerNome, setCercaPerNome] = useState<string>("");

    const [prodotti, setProdotti] = useState<any[]>([])
        useEffect(() => {
            // axios.get(API_PRODOTTI)
            //     .then(r => setProdotti(r.data))
            //     .catch(err => console.log(err))
    
              async function getProdotti() {
                  try {              
                      const response = await axios.get(API_PRODOTTI);                
                      setProdotti(response.data);                
                  } catch (error) {
                      if (error instanceof Error)
                          console.error(error);
                  }
              }
              getProdotti()
        }, []);

        // filtro prodotti giacenza non nulla
        const prodottiFiltratiSoloGiacenza = prodotti.filter(prodotto=> prodotto.unitsInStock !== null && prodotto.unitsInStock !== 0)    
        
        
       

        // AXIOS login fisso
        const [token, setToken] = useState<any[]>([])
        useEffect(() => {
        
            axios.get(API_LOGIN,{
                headers:{
                    Authorization: "Basic giuclb@hotmail.it:ciao" 
                }
            })
                .then(r => {
                    setToken(r.data)
                    console.log(r.data);
                        
                })
                .catch(err => console.log(err))
        }, []);

        // AXIOS AGGIUNGI AL CARRELLO
        

        const [prodottoDaInviare, setProdottoDaInviare] = useState<ProdottoCarrello[]>();
        function recuperoProdotto(event:React.MouseEvent<HTMLButtonElement>){
            event.preventDefault();
            const idProdottoRecuperato:number = Number(event.currentTarget.id);
            const prodottoSelezionato:Prodotto = (prodotti.filter(prodotto=>prodotto.productId === idProdottoRecuperato))

            console.log(prodottoSelezionato);
            
            const prodottoDaInviare:ProdottoCarrello = {
                idCarrello:0,
                idProdotto: prodottoSelezionato[0].productId,
                prodotto: prodottoSelezionato[0].productName,
                quantita: 1,
                prezzo: prodottoSelezionato[0].unitPrice,
                tokenCliente: String(token)
            }

            axios.post(API_CARRELLO, prodottoDaInviare)
                .then(r => {
                    console.log(r.data);
                    if(r.data.success)
                    toast.success(r.data.messaggio, {
                        position: toast.POSITION.TOP_CENTER
                    });
                    else{
                        toast.error(r.data.messaggio, {
                            position: toast.POSITION.TOP_CENTER
                        });
                    }
                })
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
         
        



        
        interface propsProdotti{
            prodotti:Prodotto
        }
        function VisualizzaProdotti(props:propsProdotti){
            return (
                <>
                {props.prodotti.filter(prodotto=> prodotto.productName.startsWith(cercaPerNome))
                .map((p, i)=> 
                    <div className="card mt-5" style={{width: "18rem"}}>
                        <img src={`/img/${i%6+1}.jpg`} className="card-img-top" alt="prodotto"/>
                        <div className="card-body">
                            <h5 className="card-title">{p.productName}</h5>
                            <p className="card-text">Prezzo: {p.unitPrice}</p>
                            <p className="card-text">Quantità: {p.unitsInStock}</p>
                            <button id={String(p.productId)} 
                                    className="btn btn-primary"
                                    onClick={recuperoProdotto}
                                    
                                    >Aggiungi al carrello</button>
                        </div>
                    </div>
                   )}</> 
            )
        }
    return (
        <>
            <form>
                <label>Cerca</label>
                <input type="text" 
                       value={cercaPerNome} 
                       onChange={(e) => setCercaPerNome(e.currentTarget.value)} />
            </form>
            {cercaPerNome.length>=3 && <VisualizzaProdotti prodotti={prodottiFiltratiSoloGiacenza}/>}
            {cercaPerNome.length<3 && <VisualizzaProdotti prodotti={prodottiFiltratiSoloGiacenza}/>}



            <div>
            {/* visualizzazione card (componente) */}
            </div>
        </>
    )
}

export default Componente2;

