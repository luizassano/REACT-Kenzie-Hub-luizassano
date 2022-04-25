import * as yup from "yup"
import axios from "axios"
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import "./index.css"

function  Login({setAuthentication, setData}){

    const history = useHistory()

     const formSchema = yup.object().shape({
        email: yup.string().required("Email Obrigatorio").email("Formato de email invalido"),
        password: yup.string().required("Senha obrigatoria")
    })

    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(formSchema)
    })

    const api = (data) => {
        axios.post("https://kenziehub.herokuapp.com/sessions", data).then( resp => {
        setData(resp.data.user)  
        localStorage.clear()
        localStorage.setItem('token', resp.data.token);
        setAuthentication(true)
        history.push(`/${resp.data.user.name}`)

            toast.success('Logado com sucesso!');
        }).catch(()=>{
            toast.error('Informações incorretas!');
        })
    }

    return(
        <>
        <header className="top">
            <h1>Kenzie Hub</h1>
        </header>
        <form className="login" onSubmit={handleSubmit(api)} >
            <section className="form">
            <h2>Login</h2>
                <div>
                    <span>Email</span>
                    <input type="text" {...register("email")} / >
                    <span className="error"> {errors.email?.message}</span>
                </div>
                <div>
                    <span>Senha</span>
                    <input type="password" {...register("password")} />
                    <span className="error"> {errors.password?.message}</span>
                </div>
            </section>
            <button className="Entrar" type="submit" >Entrar</button>
            <span className="info">Ainda não possui uma conta?</span>
            <button className="Cadastrar" onClick={()=>history.push("/signup")} >Cadastre-se</button>
        </form>
        </>
    );
}
export default Login;