import "./index.css"
import { useState} from "react";
import axios from "axios";

function PopUpPatch({setPopatch, infoCard, data, setData}){

    const [status, setStatus] = useState("Iniciante")

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };

    function update(){
        axios.get(`https://kenziehub.herokuapp.com/users/${data.id}`).then(
            resp => {
                setData(resp.data)
            })
    }

    const patch = (date) => {
        const datas = {status}
        axios.put(`https://kenziehub.herokuapp.com/users/techs/${date}` , datas, config).then( () =>{
            update()
            setPopatch(false)
        })
    }

    const del = (date) => {
        axios.delete(`https://kenziehub.herokuapp.com/users/techs/${date}`, config).then( () =>{
            update()
            setPopatch(false)
        })
    }

    return(
        <form className="PopUpPatch">
            <div className="head">
                <h2>Detalhes da tecnologia</h2>
                <button onClick={()=>{setPopatch(false);}} >X</button>
            </div>
            <div>
                <span>Nome do projeto</span>
                <span className="title"> {infoCard.title} </span>
                <span>Status</span>
                <select className="title" onClick={(evt) => {evt.preventDefault(); setStatus(evt.target.value)}}>
                    <option value="Iniciante">Iniciante</option>
                    <option value="Intermediário">Intermediário</option>
                    <option value="Avançado">Avançado</option>
                </select>
                <div className="button">
                    <button className="register" onClick={(evt) => {evt.preventDefault(); patch(infoCard.id)}} >Salvar</button>
                    <button className="cancel" onClick={(evt) =>{evt.preventDefault(); del(infoCard.id)}} >Excluir</button>
                </div>
            </div>
        </form>
    );
}
export default PopUpPatch;