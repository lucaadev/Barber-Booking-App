/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';

import { updateCliente } from '../../store/modules/cliente/actions';
import { getSalao } from '../../store/modules/salao/actions';
import api from '../../services/api';

import logo from '../../assets/icon.png';

export default function Index() {
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();
	const Navigation = useNavigate();

	const { cliente } = useSelector((state) => state.clienteReducer);

	const setCliente = (key, value) => {
		dispatch(updateCliente({ cliente: { ...cliente, [key]: value } }));
	};

	const submitLogin = async () => {
		try {
			setIsLoading(true);
			if (cliente.telefone === '') {
				alert(
					'Campo vazio',
					'Preencha o campo telefone!',
					[
						{
							text: 'Ok',
						},
					],
					{ cancelable: true }
				);
			} else if (cliente.telefone.length < 14) {
				alert(
					'Telefone inválido.',
					'Preencha o campo telefone corretamente!',
					[
						{
							text: 'Ok',
						},
					],
					{ cancelable: true }
				);
			} else {
				const response = await api.post('/login', {
					telefone: cliente.telefone,
				});

				dispatch(
					updateCliente({
						cliente: {
							...cliente,
							id: response.data.id,
							nome: response.data.nome,
							token: response.data.token,
						},
					}),
					dispatch(getSalao())
				);
				Navigation('Home');
			}
		} catch (error) {
			if (error.response.status === 502) {
				alert(
					'Erro no servidor',
					`No momento nosso servidor está fora do ar,
tente novamente mais tarde.`,
					[
						{
							text: 'Ok',
						},
					],
					{ cancelable: true }
				);
			} else {
				alert(
					'Usuário não cadastrado',
					'Esse telefone não está cadastrado, deseja cadastrar?',
					[
						{
							text: 'Sim',
							onPress: () => Navigation('Cadastro'),
						},
						{
							text: 'Não',
							style: 'cancel',
						},
					],
					{ cancelable: true }
				);
			}
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		setCliente('telefone', '');
	}, []);

	return (
		<div className='wrapper'>
			<div className='container main'>
				<div className='row'>
					<div className='col-md-6 side-image'>
						<img src={logo} alt='' />
						<div className='text'></div>
					</div>
					<div className='col-md-6 right'>
						<div className='input-box'>
							<h1 className='text-center p-3'>Barbearia Lisboa</h1>
							<header>Bem Vindo(a)!</header>
							<div className='input-field'>
								<InputMask
									className='input'
									autoComplete='on'
									mask='(99)99999-9999'
									value={cliente.telefone}
									onChange={(e) => setCliente('telefone', e.target.value)}
								/>
								<label htmlFor='telefone'>Telefone</label>
							</div>
							<div className='input-field'>
								<button
									className='submit'
									onClick={submitLogin}
									disabled={isLoading}
								>
									{isLoading ? 'Carregando...' : 'Entrar'}
								</button>
							</div>
							<div className='signin'>
								<span>
									Ainda não cortou com a gente?
									<button
										className='btn custom-btn text-primary'
										onClick={() => Navigation('Cadastro')}
									>
										Cadastre-se
									</button>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
