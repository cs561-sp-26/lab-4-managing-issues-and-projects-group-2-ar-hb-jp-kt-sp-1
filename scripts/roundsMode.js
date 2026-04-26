/*************************************************************************
 * File: roundsMode.js
 * This file contains functions that support the "Rounds" mode,
 * including the "Log Round" modal.
*************************************************************************/

/*************************************************************************
* @function sortRoundsTable
* @desc
* Sort the rounds table in ascending or descending order by a given column.
* Use w3.sortHTML to perform the sort. The function alternatively sorts
* in ascending and descending order on successive calls.
* @param colNum -- the integer 1-based index of the column to sort by
* @global GlobalRoundsTableSortBtns: Array of buttons in col header
* @global GlobalRoundsTableSortableColHeaders: Array of refs to header cols
* @global GlobalRoundsTableHeaderColLabels: Array of strings labeling data
*************************************************************************/
function sortRoundsTable(colNum) {
const sortOrder =  (GlobalRoundsTableSortBtns[colNum-1]
  .getAttribute("aria-label").indexOf("ascending") != -1) ?
  "ascending" : "descending";
const futureSortOrder = (sortOrder === "ascending") ? "descending" : "ascending";
w3.sortHTML('#roundsTable','.row-item','td:nth-child(' + colNum + ')');
for (let i = 1; i <=3; ++i) {
  if (colNum === i) {
    if (GlobalRoundsTableSortIcons[i-1].classList.contains("fa-sort")) {
      GlobalRoundsTableSortIcons[i-1].classList.remove("fa-sort");
    }
    if (GlobalRoundsTableSortIcons[i-1].classList.contains("fa-sort-amount-down-alt")) {
      GlobalRoundsTableSortIcons[i-1].classList.remove("fa-sort-amount-down-alt");
    }
    if (GlobalRoundsTableSortIcons[i-1].classList.contains("fa-sort-amount-down")) {
      GlobalRoundsTableSortIcons[i-1].classList.remove("fa-sort-amount-down");
    }
    GlobalRoundsTableSortIcons[i-1].classList.add(
      (sortOrder === "ascending" ? "fa-sort-amount-down-alt" : "fa-sort-amount-down"));
    GlobalRoundsTableSortBtns[i-1].setAttribute("aria-label", 'Sort ' +
    futureSortOrder + ' by ' + GlobalRoundsTableHeaderColLabels[colNum-1]);
    GlobalRoundsTableSortableColHeaders[i-1].setAttribute('aria-sort',sortOrder);
  } else {
    if (GlobalRoundsTableSortIcons[i-1].classList.contains("fa-sort-amount-down-alt")) {
      GlobalRoundsTableSortIcons[i-1].classList.remove("fa-sort-amount-down-alt");
    }
    if (GlobalRoundsTableSortIcons[i-1].classList.contains("fa-sort-amount-down")) {
      GlobalRoundsTableSortIcons[i-1].classList.remove("fa-sort-amount-down");
    }
    GlobalRoundsTableSortIcons[i-1].classList.add("fa-sort");
    GlobalRoundsTableSortBtns[i-1].setAttribute("aria-label", 'Sort ascending by ' +
    GlobalRoundsTableHeaderColLabels[i-1]);
    GlobalRoundsTableSortableColHeaders[i-1].setAttribute('aria-sort','none');
  }
}
}

/*************************************************************************
* @function GlobalRoundsTableSortBtns CLICK Handler
* @desc
* When one of the sort buttons in a sortable Rounds Table header column
* is clicked, sort by that column using sortRoundsTable function
* @global GlobalRoundsTableSortBtns: Array of buttons in col header
*************************************************************************/
for (let i = 0; i < GlobalRoundsTableSortBtns.length; ++i) {
GlobalRoundsTableSortBtns[i].addEventListener("click",() => sortRoundsTable(i+1) );
}
