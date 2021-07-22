import { NavLink } from 'react-router-dom';

const link = {
  width: '100px',
  height: '64px',
  padding: '12px',
  margin: '1em 0 2em',
  background: 'blue',
  textDecoration: 'none',
  color: 'white',
}

const Navbar = (props) => {
    return (
        <div  class="mb-3">
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
            <NavLink
            to="/todos/new"
            exact
            style={link}
            activeStyle={{
                background: 'darkblue'
            }}
            >New Todo</NavLink>
        </div>
    )
}

export default Navbar;