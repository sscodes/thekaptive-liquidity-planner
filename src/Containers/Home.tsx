import { useEffect, useState } from 'react';
import Table from '../Components/Table';

const Home = () => {
  const [data, setData] = useState();
  useEffect(() => {
    fetch(`http://localhost:3000/data`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Table data={data} />
    </div>
  );
};

export default Home;
