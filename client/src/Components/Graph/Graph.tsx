import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useDataStore } from '../../Zustand/Store';
import { getGraphData } from '../../Helpers/Helper';
import { useEffect, useState } from 'react';

type CombinedDataType = {
  name: string;
  inflow: string | number;
  outflow: string | number;
  'Cashbox/bank': any;
  'Credit line overdraft': any;
}[] | null;

function Graph() {
  const data = useDataStore((state) => state.data);
  const [combinedData, setCombinedData] = useState<CombinedDataType>();

  useEffect(() => {
    if (data) {
      let cleanData = getGraphData(data);
      let combo = cleanData[2].map((entry, index) => ({
        name: entry.name,
        inflow: entry.inflow,
        outflow: entry.outflow,
        // @ts-ignore
        'Cashbox/bank': cleanData[0][index]['Cashbox/bank'],
        // @ts-ignore
        'Credit line overdraft': cleanData[1][index]['Credit line overdraft'],
      }));
      setCombinedData(combo);
    }
  }, [data]);
  return (
    <>
      {combinedData !== null && (
        <ResponsiveContainer width='100%' aspect={4.7}>
          <ComposedChart
            width={500}
            height={300}
            data={combinedData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <ReferenceLine y={0} stroke='#000' />
            <Bar dataKey='inflow' fill='#8884d8' />
            <Bar dataKey='outflow' fill='#82ca9d' />
            <Line type='monotone' dataKey='Cashbox/bank' stroke='#ff7300' />
            <Line
              type='monotone'
              dataKey='Credit line overdraft'
              stroke='#387908'
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </>
  );
}

export default Graph;
