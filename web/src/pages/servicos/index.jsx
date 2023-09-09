import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Button,
	Drawer,
	IconButton,
	Modal,
	DatePicker,
	Tag,
	Uploader,
} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import {
	addServico,
	removeServico,
	fetchServicos,
	updateServico,
  removeArquivo,
  resetServico,
} from '../../store/modules/servico/actions';
import moment from 'moment';

import Table from '../../components/Table';

const Servicos = () => {
	const dispatch = useDispatch();

	const { servicos, servico, behavior, form, components } = useSelector(
		(state) => state.servicoReducer
	);

	const setComponent = (component, state) => {
		dispatch(
			updateServico({ components: { ...components, [component]: state } })
		);
	};

	const setServico = (key, value) => {
		dispatch(updateServico({ servico: { ...servico, [key]: value } }));
	};

	const save = () => {
		dispatch(addServico());
	};

	const remove = () => {
		dispatch(removeServico());
	};

	useEffect(() => {
		dispatch(fetchServicos());
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
						{behavior === 'create' ? 'Novo servico' : 'Atualizar servico'}
					</h3>
					<div className='row mt-3'>
						<div className='form-group col-6'>
							<label>Nome</label>
							<input
								type='text'
								className='form-control rounded-0'
								placeholder='Nome do servico'
								value={servico.nome}
								onChange={(e) => setServico('nome', e.target.value)}
							/>
						</div>
						<div className='form-group col-6'>
							<label>Valor</label>
							<input
								type='number'
								className='form-control rounded-0'
								placeholder='Valor do servico'
								value={servico.valor}
								onChange={(e) => setServico('valor', e.target.value)}
							/>
						</div>
						<div className='form-group col-6'>
							<label className='d-block'>Duração</label>
							<DatePicker
								block
								format='HH:mm'
								className='rounded-0'
								value={moment(servico.duracao).toDate()}
								hideMinutes={(min) => ![0, 20, 40].includes(min)}
								onChange={(value) => setServico('duracao', value)}
							/>
						</div>
						<div className='form-group col-6'>
							<label>Status</label>
							<select
								className='form-control rounded-0'
								value={servico.status}
								onChange={(e) => setServico('status', e.target.value)}
							>
								<option value=''>Selecione</option>
								<option value='A'>Ativo</option>
								<option value='I'>Inativo</option>
							</select>
						</div>
						<div className='form-group col-12'>
							<label>Descrição</label>
							<textarea
								rows={5}
								className='form-control rounded-0'
								placeholder='Descrição do servico'
								value={servico.descricao}
								onChange={(e) => setServico('descricao', e.target.value)}
							/>
						</div>
						<div className='form-group col-12'>
							<label className='d-block mt-2'>Imagens do serviço</label>
							<Uploader
								action='/upload'
								multiple
								autoUpload={false}
								listType='picture'
								defaultFileList={servico.arquivos.map((servico, index) => ({
									name: servico?.caminho,
									fileKey: index,
									url: `${process.env.BUCKET_URL}/${servico?.caminho}`,
								}))}
								onChange={(files) => {
									const arquivos = files
										.filter((file) => file.blobFile)
										.map((file) => file.blobFile);

									setServico('arquivos', arquivos);
								}}
								onRemove={(file) => {
									if (behavior === 'update' && file.url) {
										dispatch(removeArquivo(file.name));
									}
								}}
							>
								<button className='btn btn-primary btn-lg custom-btn'>
									<span className='mdi mdi-image'> Importar imagem</span>
								</button>
							</Uploader>
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
							appearance='ghost'
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
						Tem certeza que deseja remover o serviço: {servico.nome}?<br />
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
								dispatch(resetServico());
								dispatch(updateServico({ behavior: 'create' }));
								setComponent('drawer', true);
							}}
						>
							<span className='mdi mdi-plus'>Novo Servico</span>
						</Button>
					</div>
					<div className='w-100 d-flex justify-content-between'>
						<h2 className='mb-4 mt-0'>Servicos</h2>
					</div>
					<Table
						loading={form.filtering}
						data={servicos.filter((servico) => servico.status === 'A')}
						tableName={'servicos'}
						config={[
							{
								label: 'Nome',
								key: 'nome',
								width: 200,
								fixed: true,
							},
							{
								label: 'R$ Valor',
								content: (servico) => `R$ ${servico.valor.toFixed(2)}`,
								width: 200,
								fixed: true,
							},
							{
								label: 'Duração',
								content: (servico) => moment(servico.duracao).format('HH:mm'),
								width: 150,
								fixed: true,
							},
							{
								label: 'Status',
								key: 'status',
								content: (servico) => (
									<Tag color={servico.status === 'A' ? 'green' : 'red'}>
										{servico.status === 'A' ? 'Ativo' : 'Inativo'}
									</Tag>
								),
								width: 100,
								fixed: true,
							},
							{
								label: 'DataCadastro',
								content: (servico) =>
									moment(servico.dataCadastro).format('DD/MM/YYYY'),
								width: 200,
								fixed: true,
							},
						]}
						actions={(servico) => (
							<Button
								className='rounded-0'
								style={{ color: 'white', backgroundColor: '#353D87' }}
								size='xs'
							>
								Ver informações
							</Button>
						)}
						onRowClick={(servico) => {
							dispatch(updateServico({ behavior: 'update' }));
							dispatch(updateServico({ servico }));
							setComponent('drawer', true);
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Servicos;
