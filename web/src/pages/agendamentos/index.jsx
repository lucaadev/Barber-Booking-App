import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

import { filterAgendamento } from '../../store/modules/agendamento/actions';

const localizer = momentLocalizer(moment);

const Agendamentos = () => {
	const dispatch = useDispatch();
  const start = moment().weekday(0).format('YYYY-MM-DD');
	const end = moment().weekday(6).format('YYYY-MM-DD');



	useEffect(() => {
		dispatch(filterAgendamento(start, end));
	}, [dispatch, start, end]);

	return (
		<div className='p-5 mt-5 overflow-auto h-100'>
			<div className='row'>
				<div className='col-12'>
					<h2 className='mb-4 mt-0 text-center'>Agendamentos</h2>
					<Calendar
						localizer={localizer}
						events={[
							{
								title: 'My event',
								start: moment().toDate(),
								end: moment().add(20, 'minutes').toDate(),
							},
						]}
						selectable
						popup
						defaultView='week'
						style={{ height: 600, zIndex: 0, position: 'relative' }}
					/>
				</div>
			</div>
		</div>
	);
};

export default Agendamentos;
