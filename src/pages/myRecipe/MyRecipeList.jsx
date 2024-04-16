import styles from "./MyRecipeList.module.css"
import MyRecipeSearch from "@pages/myRecipe/components/MyRecipeSearch";
import MyRecipeSortButton from "@pages/myRecipe/components/MyRecipeSortButton";


function MyRecipeList() {
/*   const recipeItem = 
    <li>
      <Link>
      </Link>
    </li> */
  const {banner} = styles;

  return(
    <>
      <div className={banner}>나만의 레시피</div>
      <MyRecipeSearch/>
      <MyRecipeSortButton/>
      <ul>
        <li>
          
        </li>
      </ul>
    </>
  )
}

export default MyRecipeList;