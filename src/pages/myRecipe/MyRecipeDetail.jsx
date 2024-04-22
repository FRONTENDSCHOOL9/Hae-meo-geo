import styles from "./MyRecipeDetail.module.css"
import Sidebar from "@components/Recipe/Detail/Sidebar/Sidebar";
import Banner from "@components/Recipe/Detail/Banner/Banner";
import SubTitle from "@components/Recipe/Detail/SubTitle/SubTitle";
import Content from "@components/Recipe/Detail/Content/Content";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";


function MyRecipeDetail() {
  const axios = useCustomAxios();
  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);
  const [totalCount, setTotalCount] = useState(1125);
  const {myRCPimage} = styles;
  const limit = import.meta.env.VITE_PAGINATION_LIMIT;
  const RCP_PARTS_DTLS = searchParams.get("RCP_PARTS_DTLS");
  const { _id } = useParams();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["list", currentPage, RCP_PARTS_DTLS],
    queryFn: () => axios.get(`/posts/${_id}`),
    select: (response) => response.data,
    suspense: false,
  });

  console.log(data);

  const {} = styles;

  return(
    <>
    {/* id값에 따라 어떻게 받아올지... */}
    {data&&
      <>
        <Sidebar id="1" />
        <Banner type="myRcpRegister" name={data.item["title"]}/>
        <Content>
          <SubTitle>이미지</SubTitle>
          <img className={myRCPimage} src={`${import.meta.env.VITE_API_SERVER}/files/${import.meta.env.VITE_CLIENT_ID}/${data.item.image}`} alt={data.item["title"]} />
          <SubTitle>내용</SubTitle>
          <div>{data.item["content"]}</div>
        </Content>
      </>
    }
    </>
  )
}

export default MyRecipeDetail;