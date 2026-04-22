import { useContext, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { ThemeContext } from '../../context/ThemeContext';
import type { UsableThemes } from '../../context/ThemeContext';

const navLinkClass = ({ isActive }) =>
  isActive ? `underline underline-offset-2` : ``;

const NavBar = () => {
  const navigate = useNavigate();

  const anchoredValue = useRef([1, 2, 3]);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const { changeTheme, theme } = useContext(ThemeContext);

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <button
        onClick={() => {
          // document.querySelector('dialog').showModal();
          dialogRef.current.showModal();
        }}
      >
        Open modal
      </button>
      <dialog
        ref={dialogRef}
        className="inset-1/2 border-cyan-500 bg-indigo-700 p-3"
      >
        Hallo vom Dialog
      </dialog>

      <div className="flex-1">
        <a className="btn btn-ghost text-xl" href="/">
          Travel Agency
        </a>
        <button className="text-2xl" onClick={() => navigate(-1)}>
          &larr;
        </button>
        <button className="text-2xl" onClick={() => navigate(1)}>
          &rarr;
        </button>
        <select
          defaultValue={'halloween'}
          className="select"
          onChange={(e) => changeTheme(e.target.value as UsableThemes)}
        >
          <option value="halloween">Halloween</option>
          <option value="retro">Retro</option>
          <option value="cyberpunk">Cyberpunk</option>
          <option value="dim">Dim</option>
        </select>
      </div>
      <nav className="flex-none">
        <ul className="menu menu-horizontal gap-2.5 px-1">
          <li>
            <NavLink to={'/'} className={navLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={'/about'} className={navLinkClass}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to={'/destinations'} className={navLinkClass}>
              Destinations
            </NavLink>
          </li>
          <li>
            <NavLink to={'/contact'} className={navLinkClass}>
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
