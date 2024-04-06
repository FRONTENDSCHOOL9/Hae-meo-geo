import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { useQuery } from "@tanstack/react-query";

function Home() {
  // crud 테스트
  const axios = useCustomAxios();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () => axios.get("/products", {}),
    select: (response) => response.data,
  });
  console.log(data);

  return <div>Home</div>;
}

export default Home;
