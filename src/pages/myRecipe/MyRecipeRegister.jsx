import Banner from "@components/Recipe/Detail/Banner/Banner"
import styles from "./MyRecipeRegister.module.css"
import {Button} from "@components/Button/Button";
import { useState } from "react";

function MyRecipeRegister() {
  const {textarea, layout, title, container, text, writeWay, ir, boxButtonUpload, buttonUpload, writeWaySelect, boxButtonsSubmit, inputReadOnly, containerWriteWay} = styles;

  let [imageName, setImageName] = useState("");

  const changeFileName = (e) => {
    let fileName = e.target.value;
    setImageName(fileName);
  }

  return(
    <>
      <Banner type="myRcpRegister"/>
      <form className={layout} method="post" enctype="multipart/form-data">
        <div className={container}>
          <div className={title} >제목</div>
          <input className={text} placeholder="제목을 입력해주세요."type="text" />
        </div>
        <div className={container}>
          <div className={title} >작성방법</div>
          <fieldset className={containerWriteWay}>
              <input className={writeWay} id="writeWaySimple" type="radio" name="writeWay" value="simple" checked/>
              <label className={writeWaySelect} for="writeWaySimple">간단하게</label>
              <input className={writeWay} id="writeWayDetail" type="radio" name="writeWay" value="detail" />
              <label className={writeWaySelect} for="writeWayDetail">자세하게</label>
          </fieldset>
        </div>
        <div className={container} >
          <div className={title} >내용</div>
          <textarea className={textarea} placeholder="내용을 입력해주세요." name="" id="" cols="30" rows="10"></textarea>
        </div>
        <div className={container}>
          <div className={title} >완료 이미지</div>
          <div className={boxButtonUpload}>
            <input className={`${text} ${inputReadOnly}`} value={imageName} placeholder="10MB 미만의 이미지를 업로드해주세요." readOnly />
            <label className={buttonUpload}  for="file">첨부파일</label>
{/*             <Button type="submit" color="primary" size="large">첨부파일</Button> */}
            <input className={ir} onChange={(e) => changeFileName(e)} type="file" id="file" />
          </div>
        </div>
        <div className={container}>
          <div className={title} >태그</div>
          <input className={text} placeholder="태그는 쉼표로 구분해주세요." type="text" />
        </div>
        <div className={container}>
          <div className={boxButtonsSubmit}>
            <Button type="submit" color="primary" size="large">작성하기</Button>
            <Button type="submit" color="" size="large">취소</Button>
          </div>
        </div>
      </form>
    </>
  )
}

export default MyRecipeRegister;