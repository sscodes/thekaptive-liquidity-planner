export const fetchData = async () => {
  const res = await fetch(`https://thekaptive-liquidity-planner-api.onrender.com/api/data`);
  return await res.json();
};
