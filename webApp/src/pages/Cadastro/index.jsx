/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';

import { updateCliente } from '../../store/modules/cliente/actions';
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

const handleRegister = async () => {
	try {
		setIsLoading(true);
		if (cliente.telefone === '' || cliente.nome === '') {
			alert(
				'Campo(s) vazio(s)',
				'Preencha todos os campos',
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
			const response = await api.post('/cliente', {
				salaoId: import.meta.env.VITE_USER_SALAO_ID,
				cliente: {
					nome: cliente.nome,
					telefone: cliente.telefone,
				},
			});

			if (response.data === 'Conta atualizada com sucesso.') {
				alert(
					'Sucesso',
					response.data,
					[
						{
							text: 'Ok',
						},
					],
					{ cancelable: true }
				);
			} else {
				alert(
					'Sucesso',
					response.data,
					[
						{
							text: 'Ok',
						},
					],
					{ cancelable: true }
				);
			}
			Navigation('/');
		}
	} catch (error) {
		alert(
			'Erro ao cadastrar',
			'Você já possui cadastro, deseja fazer login?',
			[
				{
					text: 'Sim',
					onPress: () => Navigation('/Cadastro'),
				},
				{
					text: 'Não',
					style: 'cancel',
				},
			],
			{ cancelable: true }
		);
	} finally {
		setIsLoading(false);
	}
};

useEffect(() => {
	setCliente('telefone', '');
	setCliente('nome', '');
}, []);

	return (
		<div className='wrapper'>
			<div className='container main'>
				<div className='row'>
					<div className='go-back'>
						<button
							className='btn btn-outline-primary'
							onClick={() => Navigation('/')}
						>
							Voltar
						</button>
					</div>
					<div className='col-md-12 right'>
						<div className='input-box'>
							<h1 className='text-center p-3'>
								<img className='register-logo' src={logo} alt='logo' />
							</h1>
							<div className='input-field'>
								<input
									className='input'
									autoComplete='off'
									value={cliente.nome}
									onChange={(e) => setCliente('nome', e.target.value)}
								/>
								<label htmlFor='nome'>Nome</label>
							</div>
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
									onClick={handleRegister}
									disabled={isLoading}
								>
									{isLoading ? 'Carregando...' : 'Criar conta'}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
