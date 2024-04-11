import Banner from "@components/Recipe/Detail/Banner/Banner"
import styles from "./MyRecipeRegister.module.css"


function MyRecipeRegister() {
  const {textarea, fileAdd} = styles;

  return(
    <>
      <Banner type="myRcpRegister"/>
      <form method="post" enctype="multipart/form-data">
        <h3>제목</h3>
        <input type="text" />
        <h3>작성방법</h3>
        <fieldset>
          <label>
            <input type="radio" name="writeWay" value="simple" checked/>
            <span>간단하게</span>
          </label>
          <label>
            <input type="radio" name="writeWay" value="detail" />
            <span>자세하게</span>
          </label>
        </fieldset>
        <h3>내용</h3>
        <textarea className={textarea} name="" id="" cols="30" rows="10"></textarea>
        <h3>완료 이미지</h3>
        <input className={fileAdd}  placeholder="첨부파일" />
        <label for="fileButton">첨부파일</label>
        <input type="file" id="fileButton" />
        <h3>태그</h3>
        <input type="text" />
      </form>
    </>
  )
}

export default MyRecipeRegister;