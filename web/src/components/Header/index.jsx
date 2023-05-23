const Header = () => {
  return (
    <header className="container-fluid d-flex justify-content-end" >
      <div className="d-flex align-items-center">
      <div className="text-end me-3">
        <span className="d-block m-0 p-0 text-white">Barbearia Lisboa</span>
        <small className="m-0 p-0">Plano Gold</small>  
      </div>
      <img src="https://i.pinimg.com/736x/58/e4/ed/58e4edebd8fd1f52b82809e522735d20.jpg" alt="logo"/>
      <span className="mdi mdi-chevron-down text-white"></span>
      </div>
    </header>
  );
};

export default Header;