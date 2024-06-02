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

interface PropType {
  data: (
    | {
        [x: string]: string | number;
        name: string;
      }[]
    | {
        name: string;
        inflow: number;
        outflow: number;
      }[]
  )[];
}

function Graph({ data }: PropType) {
  const combinedData = data[2].map((entry, index) => ({
    name: entry.name,
    inflow: entry.inflow,
    outflow: entry.outflow,
    'Cashbox/bank': data[0][index]['Cashbox/bank'],
    'Credit line overdraft': data[1][index]['Credit line overdraft'],
  }));
  console.log(combinedData);  
  return (
    <>
      <ResponsiveContainer width='100%' aspect={3}>
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
          <Line type='monotone' dataKey='Credit line overdraft' stroke='#387908' />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
}

export default Graph;
