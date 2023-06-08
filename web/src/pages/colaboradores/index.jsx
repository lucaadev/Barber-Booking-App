import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Drawer, IconButton, Modal, TagPicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import {
	addColaborador,
	allServicos,
	dissassociateColaborador,
	fetchColaboradores,
	filterColaboradores,
	updateColaborador,
} from '../../store/modules/colaborador/actions';
import moment from 'moment';

import Table from '../../components/Table';

const Colaboradores = () => {
	const dispatch = useDispatch();

	const option = [/^[(][1-9]\d{1,2}[)] \d{5}-\d{4}$/];

	const { colaboradores, colaborador, behavior, form, components, servicos } =
		useSelector((state) => state.colaboradorReducer);

	const setComponent = (component, state) => {
		dispatch(
			updateColaborador({ components: { ...components, [component]: state } })
		);
	};

	const setColaborador = (key, value) => {
		dispatch(
			updateColaborador({ colaborador: { ...colaborador, [key]: value } })
		);
	};

	const save = () => {
		dispatch(addColaborador());
	};

	const remove = () => {
		dispatch(dissassociateColaborador());
	};

	useEffect(() => {
		dispatch(fetchColaboradores());
		dispatch(allServicos());
	}, [dispatch, components.drawer]);


	return (
		<div className='p-5 mt-1 overflow-auto h-100'>
			<Drawer
				open={components.drawer}
				size='sm'
				onClose={() => {
					setComponent('drawer', false);
					dispatch(allServicos());
				}}
				className={`responsive-drawer ${components.drawer ? 'open' : ''}`}
			>
				<Drawer.Body>
					<h3>
						{behavior === 'create'
							? 'Novo Colaborador'
							: 'Atualizar Colaborador'}
					</h3>
					<div className='row mt-3'>
						<div className='form-group col-12'>
							<b>Email</b>
							<div className='input-group mb-3'>
								<input
									disabled={behavior === 'update'}
									type='text'
									placeholder='Email do colaborador'
									className='form-control rounded-0'
									value={colaborador.email}
									onChange={(e) => setColaborador('email', e.target.value)}
								/>
								{behavior === 'create' && (
									<div className='input-group-append'>
										<Button
											appearance='primary'
											className='rounded-0'
											loading={form.saving}
											disabled={form.saving}
											onClick={() => dispatch(filterColaboradores())}
										>
											Pesquisar
										</Button>
									</div>
								)}
							</div>
						</div>
						<div className='form-group col-6'>
							<b>Nome</b>
							<div className='input-group mb-3'>
								<input
									type='text'
									className='form-control rounded-0'
									placeholder='Nome do colaborador'
									disabled={behavior === 'update'}
									value={colaborador.nome}
									onChange={(e) => setColaborador('nome', e.target.value)}
								/>
							</div>
						</div>
						<div className='form-group col-6'>
							<b>Status</b>
							<select
								className='form-control rounded-0'
								value={colaborador.status}
								onChange={(e) => setColaborador('status', e.target.value)}
							>
								<option value=''>Selecione</option>
								<option value='A'>Ativo</option>
								<option value='I'>Inativo</option>
							</select>
						</div>
						<div className='form-group col-4'>
							<b>Telefone / Whatsapp</b>
							<input
								type='text'
								className='form-control phone-input rounded-0'
								mask={option}
								maxLength={11}
								placeholder='Telefone / Whatsapp'
								disabled={behavior === 'update'}
								value={colaborador.telefone}
								onChange={(e) =>
									setColaborador(
										'telefone',
										e.target.value
											.replace(/\D/g, '')
											.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1)$2-$3')
									)
								}
							/>
						</div>
						<div className='form-group col-4'>
							<b>Data de Nascimento</b>
							<input
								disabled={behavior === 'update'}
								type='date'
								className='form-control rounded-0'
								placeholder='Data de Nascimento do colaborador'
								value={colaborador.dataNascimento}
								onChange={(e) =>
									setColaborador('dataNascimento', e.target.value)
								}
							/>
						</div>
						<div className='form-group col-4'>
							<b>Sexo</b>
							<select
								className='form-control rounded-0'
								disabled={behavior === 'update'}
								value={colaborador.sexo}
								onChange={(e) => setColaborador('sexo', e.target.value)}
							>
								<option value=''>Selecione</option>
								<option value='M'>Masculino</option>
								<option value='F'>Feminino</option>
							</select>
						</div>
						<div className='col-12'>
							<b>Especialidades</b>
							<TagPicker
								block
								size='lg'
								data={servicos}
								className='rounded-0'
								disabled={form.disabled && behavior === 'create'}
								value={colaborador.servicos}
								onChange={(value) => setColaborador('servicos', value)}
							/>
						</div>
					</div>
					<Button
						block
						className='btn-lg mt-3 rounded-0'
						color={behavior === 'create' ? 'green' : 'blue'}
						appearance='ghost'
						loading={form.saving}
						onClick={() => save()}
					>
						{behavior === 'create' ? 'Salvar' : 'Atualizar'} Colaborador
					</Button>
					{behavior === 'update' && (
						<Button
							block
							className='btn-lg mt-3'
							color='red'
							appearance='ghost'
							loading={form.saving}
							size='lg'
							onClick={() => setComponent('confirmDelete', true)}
						>
							Remover Colaborador
						</Button>
					)}
				</Drawer.Body>
			</Drawer>
			<Modal
				open={components.confirmDelete}
				onClose={() => setComponent('confirmDelete', false)}
				size='xs'
			>
				<Modal.Body>
					<IconButton
						iconbutton='remind'
						style={{
							color: '#ffb300',
							fontSize: 24,
						}}
					/>
					<p className='text-center'>
						Tem certeza que deseja remover {colaborador.nome}?<br />
						Essa ação é irreversível!
					</p>
				</Modal.Body>
				<Modal.Footer>
					<Button
						loading={form.saving}
						onClick={() => {
							remove();
							setComponent('confirmDelete', false);
						}}
						color='red'
						appearance='primary'
					>
						Remover
					</Button>
					<Button
						onClick={() => setComponent('confirmDelete', false)}
						appearance='subtle'
					>
						Cancelar
					</Button>
				</Modal.Footer>
			</Modal>
			<div className='row'>
				<div className='col-12'>
					<div className='d-flex justify-content-end'>
						<Button
							className='bg-primary text-white rounded-0 mb-2 mt-0'
							onClick={() => {
								dispatch(updateColaborador({ behavior: 'create' }));
								setComponent('drawer', true);
							}}
						>
							<span className='mdi mdi-plus'>Novo Colaborador</span>
						</Button>
					</div>
					<div className='w-100 d-flex'>
						<h2 className='mb-4 mt-0'>Colaboradores</h2>
					</div>
					<Table
						loading={form.filtering}
						data={colaboradores.filter(
							(colaborador) => colaborador.status === 'A'
						)}
						tableName={'Colaboradores'}
						config={[
							{
								label: 'Nome',
								key: 'nome',
								width: 200,
								fixed: true,
							},
							{
								label: 'Email',
								key: 'email',
								width: 200,
								fixed: true,
							},
							{
								label: 'Telefone',
								key: 'telefone',
								width: 200,
								fixed: true,
							},
							{
								label: 'DataCadastro',
								content: (colaborador) =>
									moment(colaborador.dataCadastro).format('DD/MM/YYYY'),
								width: 200,
								fixed: true,
							},
						]}
						actions={() => (
							<Button
								className='rounded-0'
								style={{ color: 'white', backgroundColor: '#353D87' }}
								size='xs'
							>
								Ver informações
							</Button>
						)}
						onRowClick={(colaborador) => {
							dispatch(updateColaborador({ behavior: 'update' }));
							dispatch(updateColaborador({ colaborador }));
							setComponent('drawer', true);
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Colaboradores;
