import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { fetchData } from '../API/API';
import ColourPicker from '../Components/ColourPicker/ColourPicker';
import FinancialLiquidityTable from '../Components/FinancialLiquidityTable/FinancialLiquidityTable';
import Graph from '../Components/Graph/Graph';
import { useColourPickerModalStore, useDataStore } from '../Zustand/Store';

const Home = () => {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['data-query'],
    queryFn: fetchData,
  });

  const setData = useDataStore((state) => state.setData);

  useEffect(() => {
    if (!isLoading && !isError) setData(data.data);
  }, [data, isLoading, isError]);

  const colourPickerVisible = useColourPickerModalStore(
    (state) => state.visible
  );

  return (
    <div>
      {colourPickerVisible && <ColourPicker />}
      <div className='home'>
        {!isLoading && !isError && <Graph />}
        {!isLoading && !isError && <FinancialLiquidityTable />}
      </div>
      {isError && error.message}
    </div>
  );
};

export default Home;
