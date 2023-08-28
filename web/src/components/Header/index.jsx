import { Link, useLocation } from 'react-router-dom';

import { useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../../styles.css'

function Header() {
  const location = useLocation();
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle('responsive_nav');
	};

	return (
		<header>
			<img
				src={process.env.REACT_APP_LOGO}
				alt='logo'
				className='img-fluid mt-3 h-auto rounded-circle'
			/>
			<nav style={{ zIndex: 2 }} ref={navRef}>
				<Link
					to='/'
					className={location.pathname === '/' ? 'active' : ''}
					onClick={showNavbar}
				>
					<span className='mdi mdi-calendar-check m-1'></span>
					<span>Agendamentos</span>
				</Link>
				<Link
					to='/clientes'
					className={location.pathname === '/clientes' ? 'active' : ''}
					onClick={showNavbar}
				>
					<span className='mdi mdi-account-multiple m-1'></span>
					<span>Clientes</span>
				</Link>
				<Link
					to='/colaboradores'
					className={location.pathname === '/colaboradores' ? 'active' : ''}
					onClick={showNavbar}
				>
					<span className='mdi mdi-card-account-details-outline m-1'></span>
					<span>Colaboradores</span>
				</Link>
				<Link
					to='/servicos'
					className={location.pathname === '/servicos' ? 'active' : ''}
					onClick={showNavbar}
				>
					<span className='mdi mdi-content-cut m-1'></span>
					<span>Servicos</span>
				</Link>
				<Link
					to='/adicionais'
					className={location.pathname === '/adicionais' ? 'active' : ''}
					onClick={showNavbar}
				>
					<span className='mdi mdi-plus m-1'></span>
					<span>Adicionais</span>
				</Link>
				<Link
					to='/horarios'
					className={location.pathname === '/horarios' ? 'active' : ''}
					onClick={showNavbar}
				>
					<span className='mdi mdi-clock-check-outline m-1'></span>
					<span>Horários</span>
				</Link>
				<button className='nav-btn nav-close-btn' onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button className='nav-btn' onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Header;