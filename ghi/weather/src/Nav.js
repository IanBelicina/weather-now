import { NavLink } from 'react-router-dom';
function Nav(){
    return(
        <nav className="navbar navbar-expand-lg navbar-dark nav-color">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Weather</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ flexWrap: 'wrap' }} >


          </ul>
        </div>
      </div>
    </nav>
    )
}

export default Nav;
