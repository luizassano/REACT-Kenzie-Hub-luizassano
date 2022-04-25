import * as yup from "yup"
import axios from "axios"
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import "./index.css"

function Signup({setData, setAuthentication}){

    const history = useHistory()
     const formSchema = yup.object().shape({
        name: yup.string().required("Nome Obrigatorio"),
        email: yup.string().required("Email Obrigatorio").email("Formato de email invalido"),
        password: yup.string().required("Senha obrigatoria").min(6, "É necessario 6 caracteres ou mais"),
        valPassword: yup.string().required("Confirme sua senha").oneOf([yup.ref('password'), null],'Senhas não coincidem')
    })

    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(formSchema)
    })


    function userlogin(data){
        axios.post("https://kenziehub.herokuapp.com/sessions", data).then( resp => {
        setData(resp.data.user)  
        localStorage.clear()
        localStorage.setItem('token', resp.data.token);
        setAuthentication(true)
        history.push(`/${resp.data.user.name}`)
        })
    }

    const api = (data) => {
        
        const datas = {
            ...data,
            bio : "n/a",
            contact : "n/a"
        }

        const login = {
            email: data.email,
            password: data.password
        }

        axios.post("https://kenziehub.herokuapp.com/users", datas).then( (resp) => {
            toast.success('Conta criada com sucesso!');
                userlogin(login)
        }).catch((error) => {
            toast.error('Email já cadastrado!');
        })
    }

    return(
        <div className="signup">
            <header className="topsignup">
                <h1>Kenzie Hub</h1>
                <button onClick={()=> history.push("/")} >Voltar</button>
            </header>
            <form className="register" onSubmit={handleSubmit(api)} >
                <div className="form">
                    <h2>Crie sua conta</h2>
                    <span className="sub" >Rapido e grátis, vamos nessa</span>
                    <div> 
                        <span>Nome</span>
                        <input type="text" placeholder="Digite aqui seu nome" {...register("name")}/>
                        <span className="error"> {errors.name?.message}</span>
                    </div>
                    <div>
                        <span>Email</span>
                        <input type="text" placeholder="Digite aqui seu email" {...register("email")}/>
                        <span className="error"> {errors.email?.message}</span>
                    </div>
                    <div>
                        <span>Senha</span>
                        <input type="password" placeholder="Digite aqui sua senha" {...register("password")}/>
                        <span className="error"> {errors.password?.message}</span>
                    </div>
                    <div>
                        <span>Confirme a senha</span>
                        <input type="password" placeholder="Digite aqui sua senha" {...register("valPassword")}/>
                        <span className="error"> {errors.valPassword?.message}</span>
                    </div>
                    <div>
                    <span>Selecione seu modulo</span>
                    <select name="menu" {...register("course_module")}>
                        <option value="Primeiro módulo (Introdução ao Frontend)">Primeiro modulo</option>
                        <option value="Segundo módulo (Frontend Avançado)">Segundo modulo</option>
                        <option value="Terceiro módulo (Introdução ao Backend)">Terceiro modulo</option>
                        <option value="Quarto módulo (Backend Avançado)">Quarto modulo</option>
                    </select>
                    </div>
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
        </div>
    );
}
export default Signup;