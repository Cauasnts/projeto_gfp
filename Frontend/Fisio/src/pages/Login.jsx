import React, { useState, useContext, useEffect } from 'react';
import { UsuarioContext } from '../UsuarioContext'
import styles from './Login.module.css';
// import logo from '../assets/logo-fisio.png'; // Use your physiotherapy logo
import { enderecoServidor } from '../utils'
import { useNavigate } from 'react-router-dom';

import { MdEmail, MdLock, MdVisibility, MdVisibilityOff, MdEvent, MdNotifications, MdSchedule } from 'react-icons/md';

function Login() {
	const { dadosUsuario, setDadosUsuario} = useContext(UsuarioContext);

	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [lembrar, setLembrar] = useState(false);

	const navigate = useNavigate();

	const botaoLogin = async (e) => {
		e.preventDefault();
		try {
			if (email === '' || senha === '') {
				throw new Error('Preencha todos os campos');
			}
			const resposta = await fetch(`${enderecoServidor}/usuarios/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, senha }),
			});
			const dados = await resposta.json();
			if (resposta.ok) {
				localStorage.setItem('UsuarioLogado', JSON.stringify({ ...dados, lembrar }));
				setDadosUsuario(dados);
				navigate("/agenda"); // Redirect to agenda page
			} else {
				throw new Error(dados.message || 'Erro ao fazer login');
			}
		} catch (error) {
			alert(error.message);
		}
	};

	const togglePasswordVisibility = () => setShowPassword(!showPassword);

	useEffect(() => {
		const buscarUsuarioLogado = async () => {
			const usuarioLogado = await localStorage.getItem('UsuarioLogado');
			if (usuarioLogado){
				const usuario = JSON.parse(usuarioLogado);
				if (usuario.lembrar === true){
					setDadosUsuario(usuario);
					navigate('/agenda');
				}
			}    
		}
		buscarUsuarioLogado()
	}, [])

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<img src='https://attachments.office.net/owa/caua.paula3%40portalsesisp.org.br/service.svc/s/GetAttachmentThumbnail?id=AAkALgAAAAAAHYQDEapmEc2byACqAC%2FEWg0AHxpYohtZc0yR68GwiBrv0wAH7DX4zAAAARIAEADd4muwOjL0RLOrPmgBRkXq&thumbnailType=2&token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik9hMUwrbEJtV29tOTVJenpJVzA2ZU5jaVlNMD0iLCJ4NXQiOiJPYTFMK2xCbVdvbTk1SXp6SVcwNmVOY2lZTTA9Iiwibm9uY2UiOiJPc2g4WW91dGNucmVfMkhnajVvWXlGZVhiNU4yWGI2a29FYXBvcmNtQzVxSkpnV2VFU0ZZRnJxZkhFWGtReWdQQlRvTllNYXYtUmxMMlFiWk9xVW1JNUdhemN4TTRLcjcwRk5GU2VOUTV5djgyZ3lvTHpxSVQySXBiYVQyQW44ZXljX3BBN0FxQndNVXhwa096U3FBcFZJNWNsN3k1QTZ0d3NybXNaVEs5M1EiLCJpc3Nsb2MiOiJSTzJQUjgwTUI2ODIzIiwic3JzbiI6NjM4OTE3NzMxMTk4NTA0ODk3fQ.eyJzYXAtdmVyc2lvbiI6IjMzIiwiYXBwaWQiOiJhZjNlYmJiYS1jMjNmLTQ5MmEtYWE5My04MzQyMTY5NmVjNGIiLCJpc3NyaW5nIjoiV1ciLCJhcHBpZGFjciI6IjIiLCJhcHBfZGlzcGxheW5hbWUiOiIiLCJ1dGkiOiI5ZmVhNjJjMi0wNTkzLTQyOGItYTJmYy1kMzQzMjgxNGFhNDciLCJpYXQiOjE3NTYzODkxMzMsInZlciI6IlNUSS5Vc2VyLkNhbGxiYWNrVG9rZW4uVjEiLCJ0aWQiOiJiMTA1MWM0YjNiOTQ0MWFiOTQ0MWU3M2E3MjM0MmZkZCIsInRydXN0ZWRmb3JkZWxlZ2F0aW9uIjoiZmFsc2UiLCJ0b3BvbG9neSI6IntcIlR5cGVcIjpcIk1hY2hpbmVcIixcIlZhbHVlXCI6XCJSTzJQUjgwTUI2ODIzLmxhbXByZDgwLnByb2Qub3V0bG9vay5jb21cIn0iLCJyZXF1ZXN0b3JfYXBwaWQiOiIxNTdjZGZiZi03Mzk4LTRhNTYtOTZjMy1lOTNlOWFiMzA5YjUiLCJyZXF1ZXN0b3JfYXBwX2Rpc3BsYXluYW1lIjoiT2ZmaWNlIDM2NSBFeGNoYW5nZSBNaWNyb3NlcnZpY2UiLCJzY3AiOiJPd2FBdHRhY2htZW50cy5SZWFkIiwib2lkIjoiNWQzMWFlYWMtOGVlZi00ZGFiLTkxOWUtMzNhY2MxZWI1MzM3IiwicHVpZCI6IjEwMDM3RkZFOTZBNkFGNkYiLCJzbXRwIjoiY2F1YS5wYXVsYTNAcG9ydGFsc2VzaXNwLm9yZy5iciIsInVwbiI6ImNhdWEucGF1bGEzQHBvcnRhbHNlc2lzcC5vcmcuYnIiLCJ1c2VyY2FsbGJhY2t1c2VyY29udGV4dGlkIjoiNzYwOTZhMDRhZTcwNGZjYmJiMzIzZjNkOGVlODMyY2UiLCJzaWduaW5fc3RhdGUiOiJrbXNpIiwiZXBrIjoie1wia3R5XCI6XCJSU0FcIixcIm5cIjpcIndLeXJuVjdxQ1RUUjhldmFrTk5Uck44bXNmbnh0cnh4T3RpQUJhRm9QS1dXMVhGOGZSN00wVFVjNUNpYUhSdHZLM3BEa19tRlR1LVdZZHp0cFBsaGFvTHMxUm0ybjdPNHp6c3NMNkJZWjJoM2RxV0RFcF9jNEtnOVlzY3ZFU2xPWDJ3NlV4OHY0dUoxVTRDT2JQUkx2OC1QTVQ3a2k1d2pxNnFrNW1QeVpPRk9QcUVYajJBQUFrUThtTURfbXRGblRZLWxvNkdESDQ3Wk9RZEVpSE1sUFZCLWxtdW9SMXlGMnlscU1USzQtUjQ0aXVfclR1bFJmeEY5SlBjMkd0TmpDeHJoLXZ3bjBFbDBvYUNscUNiY05vOXBKQWZ6b1ZlelNSaDdSM05zM3lXdlotWk1sZEIwc0czN1BoUGNWX29TczFjdnlwUW1UTmZNSF9rTWtQelNYUVwiLFwiZVwiOlwiQVFBQlwiLFwiYWxnXCI6XCJSUzI1NlwiLFwiZXhwXCI6XCIxNzU2NDc4MzI4XCIsXCJleHBfZGlmZlwiOlwiODY0MDBcIixcImtpZFwiOlwiel9rRkF2M1haRWhDX3FmVVhmbm5Nckl1R1BzXCJ9LkhBZE5YZFVEOERvN3RVQXFHalZrd1FBZHFLNWlnbTRPdzBReFc5ejg2MXo1SG55Tnh3dVh3TlFQUW5BemlvSWdPZTlIQUFuMEthRVJlU2dwd1ZIajJoNDFzbmw2V1pmelIwR2lPc1F6ZUJUeDVBMGJ5S1VnMGlSRDdiUTQvZkZaTmlTMUk3WGtFMCs0RlBuMHJua01IdmhuYjhBeEFzVXVGS2FtZngrQjhCNldWYTNzZ1oyZEI3NlpiRW1lWTVjSUNMNjN1dVdHaEhWYzYzUTNXSWMyTjNEZmpXZG4yLzFFdUNjRnlveEV1UEVCRnpxaGhLV0pBSVpwUUQ2NGVpeUh1bkkxcHVaOUIzVm9MTTlmWXZzNW5QMnNibXpmWWd4MERwdWtUMS82TE1heWM0aHR1ZGhvdFVQbUl6MGl0eEhzZDRoRUF6THBRVnF0eVBDbWhCUmZHZz09IiwibmJmIjoxNzU2Mzg5MTMzLCJleHAiOjE3NTYzODk0MzMsImlzcyI6Imh0dHBzOi8vc3Vic3RyYXRlLm9mZmljZS5jb20vc3RzLyIsImF1ZCI6Imh0dHBzOi8vb3V0bG9vay5vZmZpY2UuY29tIiwic3NlYyI6IkU3ZjNMbFVhOVlTL3FKanMiLCJlc3NlYyI6ImFydGlmYWN0LWF1dG8tcHJvZHxNMzY1MjAyNS0wNy0yNFQwOTo0NDo1OC4wNDYwOTg0WnxSNXYvRDBMOXFGMWlHeCJ9.CxSGeAGuVBBkjpu5dSr1m2jDyLRhSUBmsemx-tQGXfVpWjl78BHY7U1TKS54zFIJrilwqiFdhLC3UPES8_8XLDCkXkNX7WIZhg7m7bCozUy7Atr19NZuLJjRn0_H64gPCSgQGDVVzvA2UXdYretjRgsLugQd7LlDq7R1WC_woEGSEbmg5Mj3soiCH1WnZ2m-wrbNMQ6vBwk_j0wlPviv2t7fHm_0ZIQb3Z-Iq5l-ygUvQDI4sJ2R1fqVvR1HkesELBSbcru6uzJ5Ye5ugU1k3tMvWYu0nGBqWYU0U-VSHwfkmFsjr-tRT-fCWBtpARBahgyOO48RghUtrTh1RFu_oQ&X-OWA-CANARY=X-OWA-CANARY_cookie_is_null_or_empty&owa=outlook.office.com&scriptVer=20250808005.18&clientId=69F3E6B982CC4D698B8664EB918216FB&animation=true' alt="Logo" className={styles.logoIcon} style={{ width: '50px', height: '50px' }} />
				<div>
					<h1 className={styles.appName}>Agenda Digital Fisioterapia</h1>
					<p className={styles.appSubtitle}>Organize seus atendimentos e pacientes</p>
				</div>
			</header>

			<main className={styles.mainContent}>
				<div className={styles.loginForm}>
					<h2 className={styles.title}>Acesse sua agenda</h2>
					<div className={styles.inputGroup}>
						<MdEmail className={styles.inputIcon} />
						<input
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className={styles.input}
							aria-label="Email"
						/>
					</div>
					<div className={styles.inputGroup}>
						<MdLock className={styles.inputIcon} />
						<input
							type={showPassword ? 'text' : 'password'}
							placeholder="Senha"
							value={senha}
							onChange={(e) => setSenha(e.target.value)}
							className={styles.input}
							aria-label="Senha"
						/>
						<button
							type="button"
							onClick={togglePasswordVisibility}
							className={styles.visibilityToggle}
							aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
						>
							{showPassword ? <MdVisibilityOff /> : <MdVisibility />}
						</button>
					</div>
					<div className={styles.between}>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<input type="checkbox" style={{ marginRight: '5px' }} 
								checked={lembrar} onChange={(e) => setLembrar(e.target.checked)}/>
							<label > Lembrar-me</label>
						</div>
						<a href="#" className={styles.forgotPassword}>Esqueceu a senha?</a>
					</div>
					<button type="submit" className={styles.submitButton} onClick={botaoLogin}>
						Entrar
					</button>
					<p className={styles.signupText}>
						Não tem uma conta? <a href="#" className={styles.signupLink}>Cadastre-se</a>
					</p>
				</div>
				<div className={styles.infoBoxes}>
					<div className={styles.infoBox}>
						<MdSchedule className={styles.infoIcon} />
						<span>Gerencie seus horários de atendimento</span>
					</div>
					<div className={styles.infoBox}>
						<MdEvent className={styles.infoIcon} />
						<span>Agende consultas facilmente</span>
					</div>
					<div className={styles.infoBox}>
						<MdNotifications className={styles.infoIcon} />
						<span>Receba lembretes de sessões</span>
					</div>
				</div>
			</main>
		</div>
	);
}

export default Login;
