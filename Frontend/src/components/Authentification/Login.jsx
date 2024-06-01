import React, { useState } from 'react'
import Validation from './LoginValidation'
import ValidationRegister from './RegisterValidation'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer, Zoom, Flip, Bounce, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate();
    // For Login
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
        email: '',
        pswd: ''
    })

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));

        // condition

        const Email = values.email
        const Password = values.pswd

        if (Email === "" || Password === "") {
            toast.error("Tous les champs doivent être remplis😥.");
        } else {
            const formData = new FormData();
            formData.append("Email", Email);
            formData.append("Password", Password);
            console.log(Email);
            console.log(Password);

            axios.post(`http://127.0.0.1:8000/api/login`, formData).then(res => {
                if (res.data.status === 200) {
                    toast.success(res.data.message)
                    navigate('/admin');
                }
                else if (res.data.status === 404) {
                    toast.error(res.data.message)
                }
                else if (res.data.status === 500) {
                    toast.error(res.data.message)
                }
            });
        }
    }


    // For Register
    const [valeur, setValeur] = useState({
        name: '',
        email: '',
        pswd: ''
    })
    const [erreurs, setErreurs] = useState({})

    const resetForm = () => {
        setValeur({
            name: "",
            email: "",
            pswd: ""
        })
    }

    const handleInput_2 = (event) => {
        setValeur(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }

    const handleSubmit_2 = (event) => {
        event.preventDefault();
        setErreurs(ValidationRegister(valeur));


        if (valeur.name === "") {
            toast.error("Tous les champs nom doivent être remplis😥.");
        }
        else if (valeur.email === "") {
            toast.error("Tous les champs email doivent être remplis😥.");
        }
        else if (valeur.pswd === "") {
            toast.error("Tous les champs mot de passe doivent être remplis😥.");
        } else {
            const formData = new FormData();
            formData.append("UserName", valeur.name);
            formData.append("Email", valeur.email);
            formData.append("Password", valeur.pswd);
            // console.log(valeur.name);
            // console.log(valeur.email);
            // console.log(valeur.pswd);
            axios.post(`http://127.0.0.1:8000/api/register`, formData).then(res => {
                if (res.data.status === 200) {
                    toast.success(res.data.message)
                    resetForm()
                }
                else if (res.data.status === 404) {
                    toast.error(res.data.message)
                }
                else if (res.data.status === 500) {
                    toast.error(res.data.message)
                }
            });



        }
    }


    return (
        <>
            <div className="container">
                <div className="main">
                    <input type="checkbox" id="chk" aria-hidden="true"></input>


                    {/* Login */}
                    <div className="login">
                        <form action="" className="form" onSubmit={handleSubmit}>
                            <label htmlFor="chk" aria-hidden="true">Se connecter</label>
                            <input className="input" type="email" name="email" placeholder="Adresse électronique" onChange={handleInput}></input>
                            {/* {errors.email && <span className='rouge'>{errors.email}</span>} */}
                            <input className="input" type="password" name="pswd" placeholder="Mot de passe" onChange={handleInput}></input>
                            {/* {errors.pswd && <span className='rouge'>{errors.pswd}</span>} */}
                            <button type='submit'>Se connecter</button>
                        </form>
                    </div>

                    <ToastContainer position='top-center' theme='dark' transition={Zoom} />
                    {/* Register */}
                    <div className="register">
                        <form action="" className="form" onSubmit={handleSubmit_2}>
                            <label htmlFor="chk" aria-hidden="true">Créer un compte</label>
                            <input className="input" type="text" name="name" value={valeur.name} placeholder="Nom" onChange={handleInput_2}></input>
                            {/* {erreurs.name && <span className='rouge'>{erreurs.name}</span>} */}
                            <input className="input" type="email" name="email" value={valeur.email} placeholder="Adresse électronique" onChange={handleInput_2}></input>
                            {/* {erreurs.email && <span className='rouge'>{erreurs.email}</span>} */}
                            <input className="input" type="password" name="pswd" value={valeur.pswd} placeholder="Mot de passe" onChange={handleInput_2}></input>
                            {/* {erreurs.pswd && <span className='rouge'>{erreurs.pswd}</span>} */}
                            <button type='submit'>Créer un compte</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Login
