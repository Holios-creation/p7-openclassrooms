import { Link } from 'react-router-dom'
import '../styles/Header.css';
import logo from '../assets/icon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import auth from '../functions/auth';

function Header() {
    return (
        <div className="Header">
            <header className="Header-header">
                <Link to="/" style={{
                    textDecoration: "none",
                    cursor: "pointer"
                }}>
                    <div className="left">
                        <img src={logo} alt='Groupomania' className='logo' />
                        <h1 className='title'>Groupomania</h1>
                    </div>
                </Link>
                <div className="right">
                    <Link to={auth() ? "/compte" : "/"}>
                        <FontAwesomeIcon icon={faCircleUser} className="icons"/>
                    </Link>
                </div>
            </header>
        </div>
    );
}

export default Header;