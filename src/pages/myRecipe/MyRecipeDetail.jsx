import styles from "./MyRecipeDetail.module.css";
import Sidebar from "@components/Recipe/Detail/Sidebar/Sidebar";
import Banner from "@components/Recipe/Detail/Banner/Banner";
import SubTitle from "@components/Recipe/Detail/SubTitle/SubTitle";
import Content from "@components/Recipe/Detail/Content/Content";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "@components/Loading/Loading";

function MyRecipeDetail() {
  const axios = useCustomAxios();
  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);
  const [totalCount, setTotalCount] = useState(1125);
  const { myRCPimage, myRCPdetail } = styles;
  const limit = import.meta.env.VITE_PAGINATION_LIMIT;
  const RCP_PARTS_DTLS = searchParams.get("RCP_PARTS_DTLS");
  const { _id } = useParams();

  /*   const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["list", currentPage, RCP_PARTS_DTLS],
    queryFn: () => axios.get(`/posts/${_id}`),
    select: (response) => response.data,
    suspense: true, 
  }); */

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleData = async () => {
    const res = await axios.get(`/posts/${_id}`);
    setData(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    handleData();
  }, []);

  console.log(data);

  const handleOnLoad = () => {
    setIsImageLoading(false);
  };

  return (
    <>
      {/* id값에 따라 어떻게 받아올지... */}
      {isLoading ? (
        <Loading />
      ) : (
        data && (
          <>
            <Sidebar id={_id} />
            <Banner type="myRcpRegister" name={data.item["title"]} />
            <Content>
              <div className={myRCPdetail}>{data.item["content"]}</div>
              <img
                className={myRCPimage}
                src={`${import.meta.env.VITE_API_SERVER}/files/${import.meta.env.VITE_CLIENT_ID}/${data.item.image}`}
                alt={data.item["title"]}
                onLoad={handleOnLoad}
              />
              {isImageLoading && <Loading />}
            </Content>
          </>
        )
      )}
    </>
  );
}

export default MyRecipeDetail;
