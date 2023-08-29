import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Button,
	Drawer,
	IconButton,
	Modal,
	DatePicker,
	Tag,
} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import {
	fetchAdicionais,
  updateAdicional,
  createAdicional,
  deleteAdicional,
  resetAdicional,
} from '../../store/modules/adicional/actions';
import moment from 'moment';

import Table from '../../components/Table';

const Adicionais = () => {
	const dispatch = useDispatch();

	const { adicionais, form, components, adicional, behavior } = useSelector(
		(state) => state.adicionalReducer
	);

  const setComponent = (component, state) => {
		dispatch(
			updateAdicional({ components: { ...components, [component]: state } })
		);
	};

	const setAdicional = (key, value) => {
		dispatch(updateAdicional({ adicional: { ...adicional, [key]: value } }));
	};

	const save = () => {
		dispatch(createAdicional());
	};

	const remove = () => {
		dispatch(deleteAdicional());
	};

	useEffect(() => {
		dispatch(fetchAdicionais());
	}, [dispatch, components.drawer]);

	return (
		<div className='p-5 mt-1 overflow-auto h-100'>
			<Drawer
				open={components.drawer}
				size='sm'
				onClose={() => {
					setComponent('drawer', false);
				}}
				className={`responsive-drawer ${components.drawer ? 'open' : ''}`}
			>
				<Drawer.Body>
					<h3>
						{behavior === 'create' ? 'Novo adicional' : 'Atualizar adicional'}
					</h3>
					<div className='row mt-3'>
						<div className='form-group col-6'>
							<label>Nome</label>
							<input
								type='text'
								className='form-control rounded-0'
								placeholder='Nome do adicional'
								value={adicional.nome}
								onChange={(e) => setAdicional('nome', e.target.value)}
							/>
						</div>
						<div className='form-group col-6'>
							<label>Valor</label>
							<input
								type='number'
								className='form-control rounded-0'
								placeholder='Valor do adicional'
								value={adicional.valor}
								onChange={(e) => setAdicional('valor', e.target.value)}
							/>
						</div>
						<div className='form-group col-6'>
							<label className='d-block'>Duração</label>
							<DatePicker
								block
								format='HH:mm'
								className='rounded-0'
								value={moment(adicional.duracao).toDate()}
								hideMinutes={(min) => ![0, 20, 40].includes(min)}
								onChange={(value) => setAdicional('duracao', value)}
							/>
						</div>
						<div className='form-group col-6'>
							<label>Status</label>
							<select
								className='form-control rounded-0'
								value={adicional.status}
								onChange={(e) => setAdicional('status', e.target.value)}
							>
								<option value=''>Selecione</option>
								<option value='A'>Ativo</option>
								<option value='I'>Inativo</option>
							</select>
						</div>
					</div>
					<Button
						loading={form.saving}
						appearance='ghost'
						color={behavior === 'create' ? 'green' : 'blue'}
						size='lg'
						block
						onClick={() => save()}
						className='mt-3 rounded-0'
					>
						{behavior === 'create' ? 'Salvar' : 'Atualizar'}
					</Button>
					{behavior === 'update' && (
						<Button
							loading={form.saving}
							color='red'
							size='lg'
							block
							onClick={() => setComponent('confirmDelete', true)}
							className='mt-3'
						>
							Remover
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
						Tem certeza que deseja remover o adicional: {adicional.nome}?<br />
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
								dispatch(resetAdicional());
								dispatch(updateAdicional({ behavior: 'create' }));
								setComponent('drawer', true);
							}}
						>
							<span className='mdi mdi-plus'>Novo adicional</span>
						</Button>
					</div>
					<div className='w-100 d-flex justify-content-between'>
						<h2 className='mb-4 mt-0'>Adicionais</h2>
					</div>
					<Table
						loading={form.filtering}
						data={adicionais?.filter((adicional) => adicional.status === 'A')}
						tableName={'adicionais'}
						config={[
							{
								label: 'Nome',
								key: 'nome',
								width: 200,
								fixed: true,
							},
							{
								label: 'R$ Valor',
								content: (adicional) => `R$ ${adicional.valor.toFixed(2)}`,
								width: 200,
								fixed: true,
							},
							{
								label: 'Duração',
								content: (adicional) =>
									moment(adicional.duracao).format('HH:mm'),
								width: 150,
								fixed: true,
							},
							{
								label: 'Status',
								key: 'status',
								content: (adicional) => (
									<Tag color={adicional.status === 'A' ? 'green' : 'red'}>
										{adicional.status === 'A' ? 'Ativo' : 'Inativo'}
									</Tag>
								),
								width: 100,
								fixed: true,
							},
							{
								label: 'DataCadastro',
								content: (adicional) =>
									moment(adicional.dataCadastro).format('DD/MM/YYYY'),
								width: 200,
								fixed: true,
							},
						]}
						actions={(adicional) => (
							<Button
								className='rounded-0'
								style={{ color: 'white', backgroundColor: '#353D87' }}
								size='xs'
							>
								Ver informações
							</Button>
						)}
						onRowClick={(adicional) => {
							dispatch(updateAdicional({ behavior: 'update' }));
							dispatch(updateAdicional({ adicional }));
							setComponent('drawer', true);
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Adicionais;
