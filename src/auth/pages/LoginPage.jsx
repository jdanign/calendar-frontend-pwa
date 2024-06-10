import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import '../css/LoginPage.css';
import Swal from 'sweetalert2';


const loginFormFields = {
	loginEmail: '',
	loginPassword: '',
}
const registerFormFields = {
	registerEmail: '',
	registerName: '',
	registerPassword: '',
	registerPassword2: '',
}


export const LoginPage = () => {
	const {errorMessage, startLogin, startRegister} = useAuthStore();


	const {loginEmail, loginPassword, onInputChange:onLoginInputChange} = useForm(loginFormFields);

	const loginSubmit = (e)=>{
		e.preventDefault();
		startLogin({email:loginEmail, password:loginPassword});
	}


	const {registerEmail, registerName, registerPassword, registerPassword2, onInputChange:onRegisterInputChange} = useForm(registerFormFields);

	const registerSubmit = (e)=>{
		e.preventDefault();

		if (registerPassword !== registerPassword2)
			Swal.fire('Las contraseñas no son iguales', '', 'error');
		else
			startRegister({email:registerEmail, name:registerName, password:registerPassword});
	}


	useEffect(() => {
		if (errorMessage?.length)
			Swal.fire(errorMessage, '', 'error');
	
	}, [errorMessage])
	


	return (
		<div className="container login-container">
			<div className="row">
				<div className="col-md-6 login-form-1">
					<h3>Ingreso</h3>
					<form onSubmit={loginSubmit}>
						<div className="form-group mb-2">
							<input 
								type="text"
								name='loginEmail'
								value={loginEmail}
								onChange={onLoginInputChange}
								placeholder="Correo"
								className="form-control"
							/>
						</div>
						<div className="form-group mb-2">
							<input
								type="password"
								name='loginPassword'
								value={loginPassword}
								onChange={onLoginInputChange}
								placeholder="Contraseña"
								className="form-control"
							/>
						</div>
						<div className="form-group mb-2 text-center">
							<input 
								type="submit"
								className="btnSubmit"
								value="Login" 
							/>
						</div>
					</form>
				</div>

				<div className="col-md-6 login-form-2">
					<h3>Registro</h3>
					<form onSubmit={registerSubmit}>
						<div className="form-group mb-2">
							<input
								type="text"
								name='registerName'
								value={registerName}
								onChange={onRegisterInputChange}
								className="form-control"
								placeholder="Nombre"
							/>
						</div>
						<div className="form-group mb-2">
							<input
								type="email"
								name='registerEmail'
								value={registerEmail}
								onChange={onRegisterInputChange}
								className="form-control"
								placeholder="Correo"
							/>
						</div>
						<div className="form-group mb-2">
							<input
								type="password"
								name='registerPassword'
								value={registerPassword}
								onChange={onRegisterInputChange}
								className="form-control"
								placeholder="Contraseña" 
							/>
						</div>

						<div className="form-group mb-2">
							<input
								type="password"
								name='registerPassword2'
								value={registerPassword2}
								onChange={onRegisterInputChange}
								className="form-control"
								placeholder="Repita la contraseña" 
							/>
						</div>

						<div className="form-group mb-2 text-center">
							<input 
								type="submit" 
								className="btnSubmit" 
								value="Crear cuenta" />
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}