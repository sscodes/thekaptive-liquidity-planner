import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ColourPicker from '../Components/ColourPicker/ColourPicker';
import FinancialLiquidityTable from '../Components/FinancialLiquidityTable/FinancialLiquidityTable';
import Graph from '../Components/Graph/Graph';
import { getGraphData } from '../Helpers/Helper';

const Home = () => {
  const [showColourPickerModal, setShowColourPickerModal] = useState(false);
  const [colour, setColour] = useState('black');
  const [background, setBackground] = useState('gray');
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['data-query'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/data`);
      return await res.json();
    },
  });

  return (
    <div className='home'>
      {showColourPickerModal && (
        <ColourPicker
          showColourPickerModal={showColourPickerModal}
          setShowColourPickerModal={setShowColourPickerModal}
          setColour={setColour}
          setBackground={setBackground}
        />
      )}
      {!isLoading && !isError && <Graph data={getGraphData(data)} />}
      {!isLoading && !isError && (
        <FinancialLiquidityTable
          headerColour={colour}
          headerBackground={background}
          setShowColourPickerModal={setShowColourPickerModal}
          data={data}
        />
      )}
    </div>
  );
};

export default Home;
