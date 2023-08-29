import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import {
	Button,
	IconButton,
	Modal,
} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

import { filterAgendamento, updateModal, updateEvent } from '../../store/modules/agendamento/actions';

const localizer = momentLocalizer(moment);

const Agendamentos = () => {
	const dispatch = useDispatch();
	const start = moment().weekday(0).format('YYYY-MM-DD');
	const end = moment().weekday(6).format('YYYY-MM-DD');

	const { agendamentos, modal, selectedEvent } = useSelector(
		(state) => state.agendamentoReducer
	);

const formatedEvents = agendamentos.map((agendamento) => {
	const duracaoMoment = moment(agendamento.servicoId.duracao);
	const duracaoEmMinutos = duracaoMoment.hours() * 60 + duracaoMoment.minutes();

	return {
		title: `${agendamento.servicoId.nome} - ${agendamento.clienteId.nome} - ${agendamento.colaboradorId.nome}`,
		start: moment(agendamento.data).add(3, 'hours').toDate(),
		end: moment(agendamento.data)
			.add(3, 'hours')
			.add(duracaoEmMinutos, 'minutes')
			.toDate(),
	};
});

	const formatRange = (range) => {
		let finalRange = {};
		if (Array.isArray(range)) {
			finalRange = {
				start: moment(range[0]).format('YYYY-MM-DD'),
				end: moment(range[range.length - 1]).format('YYYY-MM-DD'),
			};
		} else {
			finalRange = {
				start: moment(range.start).format('YYYY-MM-DD'),
				end: moment(range.end).format('YYYY-MM-DD'),
			};
		}

		return finalRange;
	};

	const setModal = (key, state) => {
		dispatch(
			updateModal({ ...modal, [key]: state })
		);
	};

	const setEvent = (event) => {
		dispatch(updateEvent(event));
	};

		const infoModal = selectedEvent.split(' - ');

	useEffect(() => {
		dispatch(filterAgendamento(start, end));
	}, [dispatch, start, end]);

	return (
		<div className='p-5 mt-1 overflow-auto h-100'>
			<div className='row'>
				<Modal
					open={modal.modal}
					onClose={() => setModal('modal', false)}
					backdrop='static'
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
							{`Serviço: ${infoModal[0]}`}
							<br />
							{`Cliente: ${infoModal[1]}`}
							<br />
							{`Colaborador: ${infoModal[2]}`}
						</p>
					</Modal.Body>
					<Modal.Footer>
						<Button
							onClick={() => setModal('modal', false)}
							appearance='subtle'
						>
							Ok
						</Button>
					</Modal.Footer>
				</Modal>
				<div className='col-12'>
					<h2 className='mb-4 mt-0 text-center'>Agendamentos</h2>
					<Calendar
						localizer={localizer}
						onRangeChange={(range) => {
							const { start, end } = formatRange(range);
							dispatch(filterAgendamento(start, end));
						}}
						formats={{
							dateFormat: 'dd',
							dayFormat: (date, culture, localizer) =>
								localizer.format(date, 'dddd', culture),
						}}
						events={formatedEvents}
						selectable
						popup
						defaultView={Views.DAY}
						views={['day', 'week', 'month', 'agenda', 'work_week']}
						step={20}
						timeslots={3}
						onSelectEvent={(event) => {
							setEvent(event.title);
							setModal('modal', true);
						}}
						min={moment().startOf('day').add(8, 'hours').toDate()}
						max={moment().startOf('day').add(20, 'hours').toDate()}
						style={{ height: 600, zIndex: 1, position: 'relative' }}
					/>
				</div>
			</div>
		</div>
	);
};

export default Agendamentos;