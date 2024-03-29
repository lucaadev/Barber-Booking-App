import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/pt-br';
import {
	Button,
	DatePicker,
	Drawer,
	IconButton,
	Modal,
	TagPicker,
} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import {
	addHorario,
	allServicos,
	removeHorario,
	updateHorario,
	fetchHorarios,
	filterColaboradores,
} from '../../store/modules/horario/actions';

moment.locale('pt-br');

const localizer = momentLocalizer(moment);

const Horarios = () => {
	const dispatch = useDispatch();

	const {
		horarios,
		horario,
		servicos,
		colaboradores,
		form,
		behavior,
		components,
	} = useSelector((state) => state.horarioReducer);

	const semana = [
		new Date(2023, 5, 4, 0, 0, 0, 0),
		new Date(2023, 5, 5, 0, 0, 0, 0),
		new Date(2023, 5, 6, 0, 0, 0, 0),
		new Date(2023, 5, 7, 0, 0, 0, 0),
		new Date(2023, 5, 8, 0, 0, 0, 0),
		new Date(2023, 5, 9, 0, 0, 0, 0),
		new Date(2023, 5, 10, 0, 0, 0, 0),
	];

	const diasDaSemana = [
		'Domingo',
		'Segunda-feira',
		'Terça-feira',
		'Quarta-feira',
		'Quinta-feira',
		'Sexta-feira',
		'Sábado',
	];

	const formatEvents = horarios.flatMap((horario) => {
		return horario.dias.map((dia) => {
			const startDate = new Date(semana[dia]);
			startDate.setHours(
				parseInt(moment(horario.inicio).format('HH')),
				parseInt(moment(horario.inicio).format('mm'))
			);

			startDate.setHours(startDate.getHours() + 3);

			const endDate = new Date(semana[dia]);
			endDate.setHours(
				parseInt(moment(horario.fim).format('HH')),
				parseInt(moment(horario.fim).format('mm'))
			);

			const especialidades = horario.especialidadesNames.map(
				(especialidade) => especialidade
			);

			const colaboradores = horario.colaboradoresNames.map(
				(colaborador) => colaborador
			);

			return {
				resource: horario,
				title: (
					<div>
						Especialidades: <br />
						{especialidades.join(', ')}
						<br />
						<br />
						Colaboradores: <br />
						{colaboradores.join(', ')}
					</div>
				),
				start: startDate,
				end: endDate,
			};
		});
	});

	const setComponents = (component, state) => {
		dispatch(
			updateHorario({ components: { ...components, [component]: state } })
		);
	};

	const setHorario = (key, value) => {
		dispatch(updateHorario({ horario: { ...horario, [key]: value } }));
	};

	const save = () => {
		dispatch(addHorario());
	};

	const remove = () => {
		dispatch(removeHorario());
	};

	useEffect(() => {
		dispatch(fetchHorarios());
		dispatch(allServicos());
	}, [dispatch]);

	useEffect(() => {
		dispatch(filterColaboradores());
	}, [dispatch, horario.especialidades]);

	return (
		<div className='p-5 mt-1 overflow-auto h-100'>
			<Drawer
				open={components.drawer}
				size='sm'
				onClose={() => {
					setComponents('drawer', false);
					dispatch(allServicos());
				}}
				className={`responsive-drawer ${components.drawer ? 'open' : ''}`}
			>
				<Drawer.Body>
					<h3>{behavior === 'create' ? 'Novo ' : 'Atualizar '}Horário</h3>
					<div className='row mt-3'>
						<div className='col-12'>
							<h3>Dias da Semana</h3>
							<TagPicker
								size='lg'
								block
								value={horario.dias}
								data={diasDaSemana
									.map((label, value) => ({ label, value }))
									.slice(1)}
								onChange={(value) => setHorario('dias', value)}
								className='rounded-0'
							/>
						</div>
						<div className='col-6 mt-3'>
							<h3 className='d-block'>Início</h3>
							<DatePicker
								block
								format='HH:mm'
								hideMinutes={(min) => ![0, 20].includes(min)}
								value={
									horario.inicio ? moment(horario.inicio).toDate() : new Date()
								}
								onChange={(value) => setHorario('inicio', value)}
							/>
						</div>
						<div className='col-6 mt-3'>
							<h3 className='d-block'>Fim</h3>
							<DatePicker
								block
								format='HH:mm'
								hideMinutes={(min) => ![0, 20].includes(min)}
								value={horario.fim ? moment(horario.fim).toDate() : new Date()}
								onChange={(value) => setHorario('fim', value)}
							/>
						</div>
						<div className='col-12 mt-3'>
							<h3 className='d-block'>Especialidades disponíveis</h3>
							<TagPicker
								size='lg'
								block
								data={servicos}
								value={horario.especialidades}
								onChange={(value) => setHorario('especialidades', value)}
								className='rounded-0'
							/>
						</div>
						<div className='col-12 mt-3'>
							<h3 className='d-block'>Colaboradores disponíveis</h3>
							<TagPicker
								size='lg'
								block
								data={colaboradores}
								value={horario.colaboradores}
								onChange={(value) => setHorario('colaboradores', value)}
								className='rounded-0'
							/>
						</div>
					</div>
					<Button
						loading={form.saving}
						appearance='primary'
						color={behavior === 'create' ? 'green' : 'blue'}
						size='lg'
						block
						onClick={() => save()}
						className='mt-3 rounded-0'
					>
						{behavior === 'create' ? 'Criar' : 'Atualizar'} Horário
					</Button>
					{behavior === 'update' && (
						<Button
							loading={form.saving}
							appearance='primary'
							color='red'
							size='lg'
							block
							onClick={() => setComponents('confirmDelete', true)}
							className='mt-3'
						>
							Remover Horário
						</Button>
					)}
				</Drawer.Body>
			</Drawer>
			<Modal
				open={components.confirmDelete}
				onClose={() => setComponents('confirmDelete', false)}
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
						Tem certeza que deseja remover esse horário?
						<br />
						Essa ação é irreversível!
					</p>
				</Modal.Body>
				<Modal.Footer>
					<Button
						loading={form.saving}
						onClick={() => {
							remove();
						}}
						color='red'
						appearance='primary'
					>
						Remover
					</Button>
					<Button
						onClick={() => setComponents('confirmDelete', false)}
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
								dispatch(updateHorario({ behavior: 'create' }));
								dispatch(filterColaboradores());
								dispatch(allServicos());
								setComponents('drawer', true);
							}}
						>
							<span className='mdi mdi-plus'>Novo Horário</span>
						</Button>
					</div>
					<div className='w-100 d-flex justify-content-between align-items-center'>
						<h2 className='mb-4 mt-0 text-dark'>Horários</h2>
					</div>
					<Calendar
						localizer={localizer}
						toolbar={false}
						formats={{
							dateFormat: 'dd',
							dayFormat: (date, culture, localizer) =>
								localizer.format(date, 'dddd', culture),
						}}
						events={formatEvents}
						popup
						selectable
						defaultDate={semana[moment().day()]}
						defaultView='week'
						min={moment().startOf('day').add(8, 'hours').toDate()}
						max={moment().startOf('day').add(20, 'hours').toDate()}
						style={{ height: 600, zIndex: 0, position: 'relative' }}
						onSelectEvent={(event) => {
							dispatch(allServicos());
							dispatch(updateHorario({ behavior: 'update' }));
							dispatch(updateHorario({ horario: event.resource }));
							setComponents('drawer', true);
						}}
						onSelectSlot={(slot) => {
							const { start, end } = slot;
							dispatch(allServicos());
							dispatch(
								updateHorario({
									behavior: 'create',
									horario: {
										...horario,
										dias: [moment(start).day()],
										inicio: start,
										fim: end,
									},
								})
							);
							setComponents('drawer', true);
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Horarios;
