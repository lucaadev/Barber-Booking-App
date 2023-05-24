import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Agendamentos = () => {
	return (
		<div className='p-5 overflow-auto h-100'>
			<div className='row'>
				<div className='col-12'>
					<h2 className='mb-4 mt-0'>Agendamentos</h2>
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
						style={{ height: 600 }}
					/>
				</div>
			</div>
		</div>
	);
};

export default Agendamentos;
