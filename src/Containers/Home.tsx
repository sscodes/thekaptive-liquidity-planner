import { useQuery } from '@tanstack/react-query';
import Table from '../Components/Table';

const Home = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['data-query'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/data`);
      return await res.json();
    },
  });

  return (
    <div>
      {!isLoading && !isError && <Table data={data} />}
    </div>
  );
};

export default Home;
