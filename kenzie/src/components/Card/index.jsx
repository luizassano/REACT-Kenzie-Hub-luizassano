import "./style.css"
function Card({tech, setPopatch, setInfoCard}){
    return(
        <div className="card" onClick={() => {setPopatch(true); setInfoCard(tech)}}>
            <p>{tech.title}</p>
            <p>{tech.status}</p>
        </div>
    );
}
export default Card;