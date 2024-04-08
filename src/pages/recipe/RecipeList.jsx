import { Button, LinkButton } from "@components/Button/Button";
import Search from "@components/Search/Search";
import Title from "@components/Title/Title";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { useQuery } from "@tanstack/react-query";

function RcpList() {
  // crud 테스트
  const axios = useCustomAxios(true);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["list"],
    queryFn: () => axios.get("/1/100", {}),
    select: (response) => response.data.COOKRCP01.row,
  });
  // console.log(data);
  return (
    <>
      <Title>해머거 레시피</Title>
      <Search></Search>
    </>
  );
}

export default RcpList;
