// Ein eigener Typ für die Props dieser Komponente – so können wir ihn auch in anderen
// Dateien wiederverwenden.
export type UserProfileProps = {
  username: string; // Pflichtfeld – muss immer übergeben werden
  img: string; // Pflichtfeld – die URL zum Profilbild
  info?: string; // Optionales Feld – das '?' bedeutet: darf auch fehlen (undefined)
  status: boolean; // Pflichtfeld – true = online, false = offline
};

// Die Komponente nimmt ein Props-Objekt entgegen, das dem Typ 'UserProfileProps' entspricht.
export default function UserProfile({
  username,
  img,
  info,
  status,
}: UserProfileProps) {
  return (
    <article>
      <h2>{username}</h2>
      <img src={img} alt="" />
      {info && <p>{info}</p>}
      {status ? <p>Online</p> : <p>Offline</p>}
    </article>
  );
}

// ─── Auskommentierte Alternativvarianten ────────────────────────────────────────

// Variante 1: Props-Typ direkt im Funktionsparameter definieren (Inline-Typ).
// Praktisch für sehr einfache Komponenten, aber schlecht wiederverwendbar.
//
// export default function UserProfile({ username, img}: {username: string; img: string; }) {
//   return (
//     <article>
//       <h2>{username}</h2>
//       <img src={img} alt="" />
//     </article>
//   );
// }

// Variante 2: Props als ganzes Objekt entgegennehmen und erst im Funktionskörper destructuren.
// Manchmal nützlich, wenn man das gesamte props-Objekt weitergeben möchte.
//
// export default function UserProfile(props: UserProfileProps) {
//   const { username, img, info, status } = props;
//   return (
//     <article>
//       <h2>{username}</h2>
//       <img src={img} alt="" />
//       {info && <p>{info}</p>}
//       {status ? <p>Online</p> : <p>Offline</p>}
//     </article>
//   );
// }
