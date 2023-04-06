import React, { useState, useEffect, FormEvent } from "react";
interface Props {
    key: number;
    valore: string;
}
// export default function MyComponent(props: Props): JSX.Element {
// const MyComponent: React.FC<Props> = (props): JSX.Element => {
// function MyComponent(props: { key: number, item: string; }) {
// function MyComponent(): JSX.Element{
const Componente1= (): JSX.Element => {
    const [state, setState] = useState<string>("")

    useEffect(() => {
        setState("test")
    }, []);

    function gestisciClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        alert("ok")
    }
    return (
        <>
            Componente1
            {/* <form>
                <input type="text" value={state} onChange={(e) => setState(e.currentTarget.value)} />
                <button onClick={gestisciClick} >Clicca</button>
            </form>
            <br />
            Stai digitando:{state}
            <br /> */}
        </>
    )
}

export default Componente1

