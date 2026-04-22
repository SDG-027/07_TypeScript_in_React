import { useContext, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router';
// Context-Wert und Typ kommen aus derselben Datei — `import type` ist ein
// reiner Typ-Import, der im kompilierten JS komplett verschwindet.
import { ThemeContext } from '../../context/ThemeContext';
import type { UsableThemes } from '../../context/ThemeContext';

const navLinkClass = ({ isActive }) =>
  isActive ? `underline underline-offset-2` : ``;

const NavBar = () => {
  const navigate = useNavigate();

  // useRef ohne Generic: TypeScript leitet den Typ automatisch aus dem
  // Initialwert ab — hier `React.RefObject<number[]>`.
  const anchoredValue = useRef([1, 2, 3]);

  // useRef mit DOM-Generic: <HTMLDialogElement> sagt TypeScript, welches
  // Element `ref.current` zur Laufzeit halten wird. `null` als Initialwert
  // ist nötig, weil das Element beim ersten Render noch nicht im DOM existiert.
  const dialogRef = useRef<HTMLDialogElement>(null);

  // useContext liest den aktuellen Wert des ThemeContext.
  // TypeScript kennt den Typ dank createContext<ThemeContextType> bereits —
  // kein zusätzliches Casting nötig.
  const { changeTheme, theme } = useContext(ThemeContext);

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <button
        onClick={() => {
          // `dialogRef.current` ist hier `HTMLDialogElement | null`.
          // Da wir sicher sind, dass das Element gemountet ist, greifen wir
          // direkt zu — TypeScript würde ohne Non-null-Assertion (`!`) oder
          // optionalem Chaining (`?.`) einen Fehler werfen.
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
          // e.target.value ist immer `string` — mit `as UsableThemes` wird er
          // auf den engeren Union-Typ gecastet. Das ist ein Type Assertion,
          // kein echtes Laufzeit-Check: Werte aus dem DOM sind für TypeScript
          // nicht automatisch typsicher.
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
