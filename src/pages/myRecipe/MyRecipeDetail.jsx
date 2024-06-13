import styles from "./MyRecipeDetail.module.css";
import Sidebar from "@components/Recipe/Detail/Sidebar/Sidebar";
import Banner from "@components/Recipe/Detail/Banner/Banner";
import Content from "@components/Recipe/Detail/Content/Content";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "@components/Loading/Loading";

function MyRecipeDetail() {
  const axios = useCustomAxios();
  const { myRCPimage, myRCPdetail, container } = styles;
  const { _id } = useParams();
  const [data, setData] = useState();
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleData = async () => {
    const res = await axios.get(`/posts/${_id}`);
    setData(res.data);
    setIsLoading(false);
    setImage(
      `${import.meta.env.VITE_API_SERVER}/files/${import.meta.env.VITE_CLIENT_ID}/${res.data.item.image}`,
    );
  };

  useEffect(() => {
    handleData();
  }, []);

  const handleOnLoad = () => setIsImageLoading(false);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        data && (
          <>
            <Sidebar
              id={Number(_id)}
              type="myRcp"
              name={data.item["title"]}
              image={image}
            />
            <Banner type="myRcpRegister" name={data.item["title"]} />
            <Content>
              <div className={container}>
                <p className={myRCPdetail}>{data.item["content"]}</p>
                <img
                  className={myRCPimage}
                  src={image}
                  alt={data.item["title"]}
                  onLoad={handleOnLoad}
                />
                {isImageLoading && <Loading />}
              </div>
            </Content>
          </>
        )
      )}
    </>
  );
}

export default MyRecipeDetail;
