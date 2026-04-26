/*************************************************************************
 * File: roundsMode.js
 * This file contains functions that support the "Rounds" mode,
 * including the "Log Round" modal.
*************************************************************************/

/*************************************************************************
* @function searchRoundsTable
* @Desc
* When the user performs a keystroke within the search box, perform a
* search of the rounds table, displaying only those rows that contain
* the text within the search box.
* @param searchVal, the text string in the search box
* @global GlobalRoundsTable: The table of rounds
* @global GlobalRoundsTableCaption: The table's caption
*************************************************************************/
function searchRoundsTable(searchVal) {
searchVal = searchVal.toUpperCase(); //case insensitive
let tr = GlobalRoundsTable.getElementsByTagName("tr");
let td, rowText, i, j;
let numVisibleRows = 0;
for (i = 1; i < tr.length; i++) {  //Loop through all table rows
  td = tr[i].getElementsByTagName("td");
  rowText = "";
  for (j = 0; j < 3; ++j) { //only consider Date, Course, Score cols
    rowText += td[j].textContent;
  }
  if (rowText != "") {
    if (rowText.toUpperCase().indexOf(searchVal) > -1) {
      tr[i].style.display = ""; //show row
      numVisibleRows++;
    } else {
      tr[i].style.display = "none"; //hide row
    }
  }
}
if (numVisibleRows == 1) {
  GlobalRoundsTableCaption.textContent = "Table displaying 1 speedgolf round";
} else {
  GlobalRoundsTableCaption.textContent = "Table displaying " + numVisibleRows + " speedgolf rounds";
}
}

/*************************************************************************
* @function searchBtn CLICK handler
* @Desc
* If the user clicks the search button when the search box is invisible,
* show the search box and set the focus on it. If the user clicks the
* search button when the search box is visible, hide the search box and
* set the focus on the search button.
* @global GlobalSearchBox: The search box
* @global GlobalSearchBtn: The search button
*************************************************************************/
GlobalSearchBtn.addEventListener("click",function() {
if (GlobalCurrentMode.get() === 1) {
    if (GlobalSearchBox.classList.contains("hidden")) {
        GlobalSearchBtn.setAttribute("aria-label","Close rounds search");
        GlobalSearchBox.classList.remove("hidden");
        GlobalSearchBox.focus();
    } else {
        GlobalSearchBox.value = "";
        searchRoundsTable(GlobalSearchBox.value);
        GlobalSearchBox.classList.add("hidden");
        GlobalSearchBtn.setAttribute("aria-label","Open rounds search");
        GlobalSearchBtn.focus();
    }
}
});
