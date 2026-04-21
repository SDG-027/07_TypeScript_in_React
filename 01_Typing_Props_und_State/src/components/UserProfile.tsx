export type UserProfileProps = {
  username: string;
  img: string;
  info?: string;
  status: boolean;
};

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

//
// export default function UserProfile({ username, img}: {username: string; img: string; }) {
//   return (
//     <article>
//       <h2>{username}</h2>
//       <img src={img} alt="" />
//       {/*{info && <p>{info}</p>}
//       {status ? <p>Online</p> : <p>Offline</p>}*/}
//     </article>
//   );
// }
// export default function UserProfile(props:UserProfileProps) {
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
