import Banner from "@components/Recipe/Detail/Banner/Banner";
import styles from "./MyRecipeRegister.module.css";
import { Button, LinkButton } from "@components/Button/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { useNavigate } from "react-router-dom";

function MyRecipeRegister() {
  const {
    textarea,
    layout,
    title,
    container,
    text,
    writeWay,
    ir,
    boxButtonUpload,
    buttonUpload,
    writeWaySelect,
    boxButtonsSubmit,
    inputReadOnly,
    containerWriteWay,
  } = styles;

  const navigate = useNavigate();

  const axios = useCustomAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      console.log(formData);
      if (formData.image.length > 0) {
        // 프로필 이미지를 추가한 경우
        const imageFormData = new FormData();
        imageFormData.append("attach", formData.image[0]);

        //fileRes -> axios가 실행하고 데이터를 반환하는데 이를 변수로 받아서 사용할수 있음
        const fileRes = await axios("/files", {
          method: "post",
          headers: {
            // 파일 업로드시 필요한 설정
            "Content-Type": "multipart/form-data",
          },
          data: imageFormData,
        });

        // 서버로부터 응답받은 이미지 이름을 회원 정보에 포함
        formData.image = fileRes.data.item[0].name;
      } else {
        // profileImage 속성을 제거
        delete formData.image;
      }
      formData.type = "recipe";

      formData.extra = {
        writeWay: formData.writeWay,
        tag: formData.tag,
      };
      delete formData.writeWay;
      delete formData.tag;

      const res = await axios.post("/posts", formData);

      alert("레시피 작성이 완료되었습니다.");

      navigate("/myRecipe");
    } catch (err) {
      alert("레시피 내용이 부족합니다.");
    }
  };

  let [imageName, setImageName] = useState("");

  const changeFileName = (e) => {
    let fileName = e.target.value;
    setImageName(fileName);
    console.log("fileName");
  };

  return (
    <>
      <Banner type="myRcpRegister" />
      <form
        className={layout}
        method="post"
        enctype="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={container}>
          <div className={title}>제목</div>
          <input
            className={text}
            placeholder="제목을 입력해주세요."
            type="text"
            {...register("title")}
          />
        </div>
        <div className={container}>
          <div className={title}>작성방법</div>
          <fieldset className={containerWriteWay}>
            <input
              className={writeWay}
              id="writeWaySimple"
              type="radio"
              name="writeWay"
              value="simple"
              {...register("writeWay")}
              checked
            />
            <label className={writeWaySelect} for="writeWaySimple">
              간단하게
            </label>
            <input
              className={writeWay}
              id="writeWayDetail"
              type="radio"
              name="writeWay"
              value="detail"
              {...register("writeWay")}
            />
            <label className={writeWaySelect} for="writeWayDetail">
              자세하게
            </label>
          </fieldset>
        </div>
        <div className={container}>
          <div className={title}>내용</div>
          <textarea
            className={textarea}
            placeholder="내용을 입력해주세요."
            {...register("content")}
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div className={container}>
          <div className={title}>완료 이미지</div>
          <div className={boxButtonUpload}>
            <input
              className={`${text} ${inputReadOnly}`}
              value={imageName}
              placeholder="10MB 미만의 이미지를 업로드해주세요."
              readOnly
            />
            <label className={buttonUpload} for="file">
              첨부파일
            </label>
            <input
              className={ir}
              {...register("image")}
              onChange={(e) => changeFileName(e)}
              type="file"
              id="file"
            />
          </div>
        </div>
        <div className={container}>
          <div className={title}>태그</div>
          <input
            className={text}
            placeholder="태그는 쉼표로 구분해주세요."
            type="text"
          />
        </div>
        <div className={container}>
          <div className={boxButtonsSubmit}>
            <Button type="submit" color="primary" size="large">
              작성하기
            </Button>
            <LinkButton to="/myRecipe" type="submit" size="large">
              취소
            </LinkButton>
          </div>
        </div>
      </form>
    </>
  );
}

export default MyRecipeRegister;
