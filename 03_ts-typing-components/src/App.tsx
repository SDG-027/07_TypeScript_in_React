import Container from './layouts/Container';
import Greeting from './components/Greeting';
import Counter from './components/Counter';
import Status from './components/Status';
import ProfileCard from './components/ProfileCard';
import Alert from './components/Alert';
import ProductList from './components/ProductList';
import Toggle from './components/Toggle';
import Avatar from './components/Avatar';

const App = () => {
  return (
    <Container style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Greeting name={123} />
      <Counter initialCount='0' />
      <Status status='idle' />
      <ProfileCard user={{ name: 'Ada' }} />
      <Alert message={false} type='info' />
      <ProductList products={[{ id: 1, title: 'Book' }, { title: 'Pen' }]} />
      <Toggle isOn='yes' onToggle={'not a function'} />
      <Avatar url={1234} altText={false} />
    </Container>
  );
};

export default App;
