import React, { useState } from 'react';
import './styles.css';
import '../../global.css';

import { FiLogIn } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

import api from "../../services/api";

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const res = await api.post('sessions', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', res.data.name);
            history.push('/profile');  
        } catch (error) {
            alert('Error while you are trying to login. Please try again')
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" /> 
            
                <form onSubmit={handleLogin}>
                    <h1> Login </h1>
                    <input 
                        placeholder="Your ID"
                        value={id}
                        onChange={ e => setId(e.target.value) } 
                    />
                    <button className="button" type="submit">Enter</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Create Account
                    </Link>

                </form>
            
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
        
    );
}