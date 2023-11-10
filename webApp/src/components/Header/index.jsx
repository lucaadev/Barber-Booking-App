import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
	getSalao,
	allServicos,
	updateAgendamento,
} from '../../store/modules/salao/actions';

export default function Index() {
	const navigation = useNavigate();
	const dispatch = useDispatch();

	const { salao, servicosSalao, form } = useSelector(
		(state) => state.salaoReducer
	);

	const { cliente } = useSelector((state) => state.clienteReducer);

	const { servicos } = servicosSalao;

	const finalServicos =
		form.inputFiltro?.length > 0
			? servicos.filter((servico) => {
					const nome = servico.nome.toLowerCase();
					const filtro = form.inputFiltro.toLowerCase().trim().split(' ');
					return filtro.every((palavra) => nome.includes(palavra));
			})
			: servicos;

	const barberShopTitle = salao?.nome?.toUpperCase();

	const openInNewTab = (url) => {
		window.open(url, '_blank', 'noreferrer');
	};

	useEffect(() => {
		dispatch(getSalao());
		dispatch(allServicos());
		dispatch(updateAgendamento({ clienteId: cliente.id }));
	}, []);

	return (
		<div className='wrapper-header'>
			<div className='container'>
				<div className='col-md-12 col-header'>
					<div className='gradiente'>
						<div className='capa-header'></div>
					</div>
					<div>
						<div className='lb'>
							<img src={salao?.foto} alt='logo' className='logo-header' />
							<img
								src={salao?.images?.[0]}
								alt='logo'
								className='capa-header-2'
							/>
							<div className='title-header'>
								<h1 className='barber-shop-title'>{barberShopTitle}</h1>
								<h2 className='schecule-text'>Agende seu horário online</h2>
							</div>
						</div>
						<div className='button-and-lisboa-text'>
							<div className='button-agende-ja'>
								<button
									className='button-agende-ja'
									onClick={() => navigation('/Agendamento')}
								>
									Agende já
								</button>
							</div>
							<div className='lisboa-text'>
								<p className='lisboa-text-p'>Já é membro do Lisboa Club?</p>
								<button
									className='button-lisboa-club'
									onClick={() => navigation('/Login')}
								>
									Lisboa Club
								</button>
							</div>
						</div>
					</div>
					<div className='propaganda-div'>
						<button
							className='propaganda-button'
							onClick={() =>
								openInNewTab(
									'https://wa.me/5503182667330?text=Olá, gostaria de fazer parte do Lisboa Club!'
								)
							}
						>
							<img
								src={salao?.images?.[1]}
								alt='propaganda'
								className='propaganda'
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
