import React, { useState } from 'react';
import './styles.css';
import '../../global.css';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";

export default function Register() {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const histoty = useHistory();
    
    async function handleRegister(e) {
        e.preventDefault();
        const data = { name, email, whatsapp, city, uf };
        
        try {
            const res = await api.post('ongs', data);
            alert(`Seu ID de acesso: ${res.data.id}`);

            histoty.push('/');
        } catch (error) {
            alert('Erro ao cadastrar, tente novamente');
        }

    }
    
    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" /> 
                    <h1>Register</h1>
                    <p>Create your profile, and access Be The Hero platform to help people find incidents of your NGO.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Back
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="NGO name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                     />
                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)} 
                    />
                    <input 
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)} 
                    />
                    <div className="input-group">
                        <input 
                            placeholder="City"
                            value={city}
                            onChange={e => setCity(e.target.value)} 
                        />
                        <input 
                            placeholder="Estate" 
                            style={{ width:115 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)} 
                        />
                    </div>
                    <button className="button" type="submit">Register</button>
                </form>
            </div>
        </div>
    );
} 