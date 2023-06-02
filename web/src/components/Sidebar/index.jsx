import { Link, useLocation } from 'react-router-dom';

import logoPrincipal from '../../assets/logo-principal.png';

const Sidebar = () => {
	const location = useLocation();

	return (
		<aside className='col-2 h-100'>
			<img src={logoPrincipal} alt='logo' className='img-fluid mt-3' />
			<ul className='p-0 m-0'>
				<li>
					<Link to='/' className={location.pathname === '/' ? 'active' : ''}>
						<span className='mdi mdi-calendar-check'></span>
						<span>Agendamentos</span>
					</Link>
				</li>
				<li>
					<Link
						to='/clientes'
						className={location.pathname === '/clientes' ? 'active' : ''}
					>
						<span className='mdi mdi-account-multiple'></span>
						<span>Clientes</span>
					</Link>
				</li>
				<li>
					<Link
						to='/colaboradores'
						className={location.pathname === '/colaboradores' ? 'active' : ''}
					>
						<span className='mdi mdi-card-account-details-outline'></span>
						<span>Colaboradores</span>
					</Link>
				</li>
				<li>
					<Link
						to='/servicos'
						className={location.pathname === '/servicos' ? 'active' : ''}
					>
						<span className='mdi mdi-content-cut'></span>
						<span>Servicos</span>
					</Link>
				</li>
			</ul>
		</aside>
	);
};

export default Sidebar;
