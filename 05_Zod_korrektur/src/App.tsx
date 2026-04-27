import './App.css';
import { CatFactSchema } from './schemas/catFacts';
import ProductsList from './components/ProductsList';
import useFetch from './hooks/useFetch';

function App() {
  const { data, loading, error } = useFetch(
    'https://catfact.ninja/fact',
    CatFactSchema
  );

  return (
    <>
      <h1>Zod Runtime Validation</h1>

      <p>{data?.fact || 'Loading'}</p>
      {error && <p>{error}</p>}

      <ProductsList />
    </>
  );
}

export default App;

// const [fact, setFact] = useState<null | CatFact>(null);
// const [error, setError] = useState<null | string>(null);

// useEffect(() => {
//   async function fetchData() {
//     try {
//       const res = await fetch('https://catfact.ninja/fact');
//       if (!res) throw new Error(`Fetch failed; Status Code: ${res.status}`);
//       const data = await res.json();

//       const { success, data: zd, error } = CatFactSchema.safeParse(data);

//       if (success) {
//         setFact(zd);
//       } else {
//         setError(z.prettifyError(error));
//       }
//     } catch (err) {
//       console.log('Im catch-Block: ', err);
//     }
//   }

//   fetchData();

//   return () => console.log('Aufraumen nicht vergessen!');
// }, []);
