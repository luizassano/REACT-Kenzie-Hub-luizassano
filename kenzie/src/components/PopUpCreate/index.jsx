import "./index.css"
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from 'react-toastify';

function PopUpCreate({setpopcreate, setData, data, user}){

    const {register, handleSubmit} = useForm({
    })
    
    function update(){
        axios.get(`https://kenziehub.herokuapp.com/users/${data.id}`).then(
            resp => {
                setData(resp.data)
            })
            setpopcreate(false)
    }

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };

    const api = (date) => {
        axios.post("https://kenziehub.herokuapp.com/users/techs", date, config).then( () =>{
            update()
            setpopcreate(false)
        })
        .catch(()=>{
            toast.error('Ops! aconteceu um erro');
        })
    }

    return(
        <form className="PopUpCreate" onSubmit={handleSubmit(api)} >
            <div className="head">
                <h2>Tecnologia</h2>
                <button onClick={()=>{setpopcreate(false); update()}} >X</button>
            </div>
            <div>
                <span >Nome do projeto</span>
                <input className="title" type="text" {...register("title")} />
                <span>Status</span>
                <select className="title" {...register("status")}>
                    <option value="Iniciante">Iniciante</option>
                    <option value="Intermediário">Intermediário</option>
                    <option value="Avançado">Avançado</option>
                </select>
                <button className="register" type="submit">Cadastrar</button>
            </div>
        </form>
    );
}
export default PopUpCreate;