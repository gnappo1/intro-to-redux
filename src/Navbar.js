import { NavLink } from 'react-router-dom';

const link = {
  width: '100px',
  padding: '12px',
  margin: '1em',
  background: 'blue',
  textDecoration: 'none',
  color: 'white',
}

const Navbar = (props) => {
    return (
        <div>
            <NavLink
            to="/"
            exact
            style={link}
            activeStyle={{
                background: 'darkblue'
            }}
            >Home</NavLink>
            <NavLink
            to="/todos"
            exact
            style={link}
            activeStyle={{
                background: 'darkblue'
            }}
            >Todos</NavLink>
        </div>
    )
}

export default Navbar;