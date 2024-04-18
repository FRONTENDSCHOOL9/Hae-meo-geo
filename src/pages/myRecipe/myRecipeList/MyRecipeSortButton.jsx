import styles from "./MyRecipeSortButton.module.css"

function MyRecipeSortButton() {
  const {boxButtonsSort, sortSelect, buttonSort, slash} = styles;

  return(
    <>
      <div className={boxButtonsSort}>
        <input className={buttonSort} id="sortRecent" type="radio" name="buttonSort" value="recent" checked/>
        <label className={`${sortSelect} ${slash}`} for="sortRecent">최신순</label>
        <input className={buttonSort} id="sortPopular" type="radio" name="buttonSort" value="popular" />
        <label className={sortSelect} for="sortPopular">인기순</label>
      </div>
    </>
  )
}

export default MyRecipeSortButton;