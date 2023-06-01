import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Drawer, IconButton, Modal } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import {
	fetchClientes,
	updateCliente,
	filterClientes,
	addCliente,
	dissassociateCliente,
} from '../../store/modules/cliente/actions';
import moment from 'moment';

import Table from '../../components/Table';

const Clientes = () => {
	const dispatch = useDispatch();

	const option = [/^[(][1-9]\d{1,2}[)] \d{5}-\d{4}$/];

	const { clientes, cliente, behavior, form, components } = useSelector(
		(state) => state.clienteReducer
	);

	const setComponent = (component, state) => {
		dispatch(
			updateCliente({ components: { ...components, [component]: state } })
		);
	};

	const setCliente = (key, value) => {
		dispatch(updateCliente({ cliente: { ...cliente, [key]: value } }));
	};

	const save = () => {
		dispatch(addCliente());
	};

	const remove = () => {
		dispatch(dissassociateCliente());
	};

	useEffect(() => {
		dispatch(fetchClientes());
	}, [dispatch]);

	return (
		<div className='p-5 mt-5 overflow-auto h-100'>
			<Drawer
				open={components.drawer}
				size='sm'
				onClose={() => setComponent('drawer', false)}
			>
				<Drawer.Body>
					<h3>
						{behavior === 'create' ? 'Novo Cliente' : 'Atualizar Cliente'}
					</h3>
					<div className='row mt-3'>
						<div className='form-group col-12 mb-3'>
							<b>Nome</b>
							<div className='input-group'>
								<input
									disabled={behavior === 'update'}
									type='text'
									className='form-control'
									placeholder='Nome do cliente'
									value={cliente.nome}
									onChange={(e) => {
										setCliente('nome', e.target.value);
									}}
								/>
								{behavior === 'create' && (
									<div className='input-group-append'>
										<Button
											appearance='primary'
											loading={form.filtering}
											disabled={form.filtering}
											onClick={() => {
												dispatch(filterClientes());
											}}
										>
											Buscar
										</Button>
									</div>
								)}
							</div>
						</div>
						<div className='form-group col-6'>
							<b className=''>Nome</b>
							<input
								type='text'
								className='form-control'
								placeholder='Nome do Cliente'
								disabled={form.disabled}
								value={cliente.nome}
								onChange={(e) => setCliente('nome', e.target.value)}
							/>
						</div>
						{/* --- */}
						<div className='form-group col-6'>
							<b className=''>Telefone / Whatsapp</b>
							<input
								type='text'
								className='form-control phone-input'
								mask={option}
								maxLength={11}
								placeholder='Telefone / Whatsapp'
								disabled={form.disabled}
								value={cliente.telefone}
								onChange={(e) =>
									setCliente(
										'telefone',
										e.target.value
											.replace(/\D/g, '')
											.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1)$2-$3')
									)
								}
							/>
						</div>
					</div>
					<Button
						disabled={cliente.telefone === ''}
						block
						className='btn-lg mt-3'
						color={behavior === 'create' ? 'green' : 'red'}
						appearance='ghost'
						loading={form.saving}
						onClick={() => {
							behavior === 'create'
								? save()
								: setComponent('confirmDelete', true);
						}}
					>
						{behavior === 'create' ? 'Salvar' : 'Remover'}
					</Button>
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
					{'  '} Tem certeza que deseja remover {cliente.nome}? Essa ação é
					irreversível!{' '}
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
					<div className='w-100 d-flex justify-content-between'>
						<h2 className='mb-4 mt-0'>Clientes</h2>
						<div>
							<button
								className='btn btn-primary btn-lg custom-btn'
								onClick={() => {
									dispatch(updateCliente({ behavior: 'create' }));
									setComponent('drawer', true);
								}}
							>
								<span className='mdi mdi-plus'>Novo Cliente</span>
							</button>
						</div>
					</div>
					<Table
						loading={form.filtering}
						data={clientes}
						tableName={'Clientes'}
						config={[
							{
								label: 'Nome',
								key: 'nome',
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
								content: (cliente) =>
									moment(cliente.dataCadastro).format('DD/MM/YYYY'),
								width: 200,
								fixed: true,
							},
						]}
						actions={(data) => (
							<Button
								style={{ color: 'white', backgroundColor: '#353D87' }}
								size='xs'
							>
								Ver informações
							</Button>
						)}
						onRowClick={(cliente) => {
							dispatch(updateCliente({ behavior: 'update' }));
							dispatch(updateCliente({ cliente }));
							setComponent('drawer', true);
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Clientes;
