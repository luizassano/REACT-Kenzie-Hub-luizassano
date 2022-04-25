import { useHistory } from "react-router-dom";
import { useState } from "react";
import Card from "../Card";
import PopUpPatch from "../PopUpPatch";
import PopUpCreate from "../PopUpCreate";
import "./index.css"

function Dashboard({authentication, data, setData}){
   
    const [popatch, setPopatch] = useState()
    const [infoCard, setInfoCard] = useState()
    const [popcreate, setpopcreate] = useState()
    const history = useHistory()

    if(!authentication){
       history.push("/")
    }

    return(
       <>
       {
           data &&
           
            <div className="dashboard">
            <header className="sup">
                <h1>Kenzie Hub</h1>
                <button onClick={()=> history.push("/")}>Sair</button>
            </header>
            <div className="user">
                <h2>Olá, {data.name}</h2>
                <p>{data.course_module}</p>
            </div>
            <div className="register-tech">
                <p>Tecnologias</p>
                <button onClick={()=>setpopcreate(true)} >+</button>
            </div>
            <div className="popUp">
                {   popatch &&
                        <PopUpPatch setPopatch = {setPopatch} infoCard = {infoCard} data = {data} setData = {setData} />
                }
                {
                    popcreate &&
                        <PopUpCreate setpopcreate = {setpopcreate} data = {data} setData = {setData} />
                }
            </div>
            <section className="flex">
                <div className="roll">
                    <ul className="listCard">
                        { data.techs &&
                            data.techs.map(tech => {
                            return <Card tech = {tech} key = {tech.id}  setPopatch = {setPopatch} setInfoCard = {setInfoCard} />
                        } )}
                    </ul>
                </div>
            </section>
        </div>
       }
       </>
        
    );
}
export default Dashboard;

