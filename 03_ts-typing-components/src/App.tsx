import Container from './layouts/Container';
import Greeting from './components/Greeting';
import Counter from './components/Counter';
import Status from './components/Status';
import ProfileCard from './components/ProfileCard';
import Alert from './components/Alert';
import ProductList from './components/ProductList';
import Toggle from './components/Toggle';
import Avatar from './components/Avatar';
import { useState } from 'react';

const App = () => {
  const [isOn, setIsOn] = useState(false);

  function onToggle() {
    setIsOn((on) => !on);
  }

  return (
    <Container style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Greeting name={'William'} />
      <Greeting />
      <Status status="loading" />
      <ProfileCard user={{ name: 'Ada', age: 20 }} />
      <Alert message={'Fetch failed'} type="info" />
      <ProductList
        products={[
          { id: 1, title: 'Book' },
          { id: 123, title: 'Pen' },
        ]}
      />
      <Avatar url={'https://placeholderimage'} />
      <Counter initialCount={13} />
      <Toggle isOn={isOn} onToggle={onToggle} setIsOn={setIsOn} />
    </Container>
  );
};

export default App;
