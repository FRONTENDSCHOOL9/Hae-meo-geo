import styles from "./MyRecipeList.module.css"
import MyRecipeSearch from "@pages/myRecipe/components/MyRecipeSearch";
import MyRecipeSortButton from "@pages/myRecipe/components/MyRecipeSortButton";
import { Link } from "react-router-dom";
import { Tag } from "@components/Button/Button";

function MyRecipeList() {
/*   const recipeItem = 
    <li>
      <Link>
      </Link>
    </li> */
  const {banner, itemList, item, itemImage, itemTitle, boxItem} = styles;

  return(
    <>
      <div className={banner}>나만의 레시피</div>
      <MyRecipeSearch/>
      <MyRecipeSortButton/>
      <ul className={itemList}>
        <li className={item}>
          <Link className={boxItem} to={`/myRecipe/Detail`}>
            <div className={itemImage}></div>
            <div className={itemTitle}>김치찌개</div>
            <Tag>국/찌개</Tag>
            <Tag>끓이기</Tag>
          </Link>
        </li>
      </ul>
    </>
  )
}

export default MyRecipeList;