/*************************************************************************
 * File: roundsMode.js
 * This file contains functions that support the "Rounds" mode,
 * including the "Log Round" modal.
*************************************************************************/

/*************************************************************************
* @function confirmDelete
* @desc
* When the user clicks the "Delete" button in a rounds table row,
* ask the user to confirm the deletion. If confirmed, delete the round
* from the data object and localStorage, remove the table row, and
* update the table caption.
* @param roundNum: the unique round number (roundNum property) of the
*        round to delete
* @global GlobalUserData: object containing the current user's data
* @global GlobalRoundsTable: The rounds table
* @global GlobalRoundsTableCaption: The rounds table caption
*************************************************************************/
function confirmDelete(roundNum) {
if (window.confirm("Are you sure you want to delete this round?")) {
  //Find the round in the array
  let roundIndex;
  for (roundIndex = 0; roundIndex < GlobalUserData.rounds.length; ++roundIndex) {
    if (GlobalUserData.rounds[roundIndex].roundNum === roundNum) {
      break;
    }
  }
  //Remove round from array
  GlobalUserData.rounds.splice(roundIndex,1);
  //Save to local storage
  localStorage.setItem(GlobalUserData.accountInfo.email,
    JSON.stringify(GlobalUserData));
  //Remove the row from the table
  const rowToDelete = document.getElementById("r-" + roundNum);
  rowToDelete.parentNode.removeChild(rowToDelete);
  //If table is empty, add "No rounds" row
  if (GlobalUserData.rounds.length === 0) {
    const thisRoundBody = GlobalRoundsTable.querySelector("tbody");
    const emptyRow = thisRoundBody.insertRow(0);
    emptyRow.innerHTML = "<td colspan='5' scope='rowgroup'><i>No rounds added yet</i></td>";
  }
  //Update caption
  if (GlobalUserData.rounds.length == 1) {
    GlobalRoundsTableCaption.textContent = "Table displaying 1 speedgolf round";
  } else {
    GlobalRoundsTableCaption.textContent = "Table displaying " + GlobalUserData.rounds.length + " speedgolf rounds";
  }
}
}
