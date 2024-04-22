import styles from "@pages/myRecipe/myRecipeList/MyRecipeSearch.module.css";

function MyRecipeSearch() {
  const { searchWr, inputWr } = styles;
  return(
    <>
      <div className={searchWr}>
        <form className={inputWr}>
          <input type="text" placeholder="재료를 검색해보세요." />
          <button type="submit">
            <span className="hidden">검색</span>
          </button>
        </form>
      </div>
    </>
  )
}

export default MyRecipeSearch;