/*************************************************************************
 * File: roundsMode.js
 * This file contains functions that support the "Rounds" mode,
 * including the "Log Round" modal.
*************************************************************************/

/*************************************************************************
* @function prepLogRoundForm
* @desc
* Prepares the round form to log a new round by setting the header text
* and button label to "Log Round," and by setting the button's icon
* @global GlobalRoundFormHeader: Form's H1 element
* @global GlobalRoundFormSubmitBtnLabel: Form's button label
* @global GlobalRoundFormSubmitBtnIcon: Form's button icon
*************************************************************************/
function prepLogRoundForm() {
  GlobalRoundFormHeader.textContent = "Add Round";
  GlobalRoundFormSubmitBtnLabel.innerHTML = "&nbsp;Add Round";
  if (GlobalRoundFormSubmitBtnIcon.classList.contains("fa-edit")) {
    GlobalRoundFormSubmitBtnIcon.classList.remove("fa-edit");
  }
  if (!GlobalRoundFormSubmitBtnIcon.classList.contains("fa-save")) {
    GlobalRoundFormSubmitBtnIcon.classList.add("fa-save");
  }
}

/*************************************************************************
* @function prepEditRoundForm
* @desc
* Prepares the round form to edit an existing round.
*************************************************************************/
function prepEditRoundForm() {
  GlobalRoundFormHeader.textContent = "Edit Round";
  GlobalRoundFormSubmitBtnLabel.innerHTML = "&nbsp;Update Round";
  if (GlobalRoundFormSubmitBtnIcon.classList.contains("fa-save")) {
    GlobalRoundFormSubmitBtnIcon.classList.remove("fa-save");
  }
  if (!GlobalRoundFormSubmitBtnIcon.classList.contains("fa-edit")) {
    GlobalRoundFormSubmitBtnIcon.classList.add("fa-edit");
  }
}

/*************************************************************************
* @function fillRoundForm
* @desc
* Prepares the round form for editing by filling it with round data.
* @param round: An object containing the round data
*************************************************************************/
function fillRoundForm(round) {
GlobalRoundDate.value = round.date;
GlobalRoundCourse.value = round.course;
GlobalRoundType.value = round.type;
GlobalRoundHoles.value = round.holes;
GlobalRoundStrokes.value = round.strokes;
GlobalRoundMinutes.value = round.minutes;
GlobalRoundSeconds.value = round.seconds;
GlobalRoundSGS.value = round.SGS;
GlobalRoundNotes.value = round.notes;
}

/*************************************************************************
* @function resetLogRoundForm
* @Desc
* Reset the Log Round form to default values and hide all errors.
*************************************************************************/
function resetLogRoundForm() {
GlobalRoundDate.valueAsNumber =
  Date.now()-(new Date()).getTimezoneOffset()*60000;
GlobalRoundCourse.value = "";
GlobalRoundType.value = "practice";
GlobalRoundHoles.value = "18";
GlobalRoundStrokes.value = "80";
GlobalRoundMinutes.value = "60";
GlobalRoundSeconds.value = "00";
GlobalRoundSGS.value = "140:00";
GlobalRoundNotes.value = "";
GlobalRoundDateErr.classList.add("hidden");
GlobalRoundCourseErr.classList.add("hidden");
GlobalRoundStrokesErr.classList.add("hidden");
GlobalRoundMinutesErr.classList.add("hidden");
GlobalRoundSecondsErr.classList.add("hidden");
GlobalRoundNotesErr.classList.add("hidden");
GlobalRoundErrBox.classList.add("hidden");
GlobalFirstFocusableLogRoundItem.set(GlobalRoundDate);
}

/*************************************************************************
* @function writeRoundToTable
* @desc
* Write a round's data to an HTML table row element.
* @param row -- a reference to an HTML table row
* @param rIndex -- an integer index into userData.rounds
*************************************************************************/
function writeRoundToTable(row, rIndex) {
row.innerHTML = "<td>" + GlobalUserData.rounds[rIndex].date + "</td><td>" +
GlobalUserData.rounds[rIndex].course + "</td><td>" +
GlobalUserData.rounds[rIndex].SGS + " (" + GlobalUserData.rounds[rIndex].strokes +
" in " + GlobalUserData.rounds[rIndex].minutes + ":" +
GlobalUserData.rounds[rIndex].seconds +
")</td>" +
"<td><button aria-label='View and Edit Round'" +
"onclick='editRound(" + GlobalUserData.rounds[rIndex].roundNum + ")'><span class='fas fa-eye'>" +
"</span>&nbsp;<span class='fas fa-edit'></span></button></td>" +
"<td><button aria-label='Delete Round'" +
"onclick='confirmDelete(" + GlobalUserData.rounds[rIndex].roundNum + ")'>" +
"<span class='fas fa-trash'></span></button></td>";
}

/*************************************************************************
* @function addRoundToTable
* @desc Adds a new round to the "Rounds" table.
* @param roundIndex: index in userData.rounds of round to add
*************************************************************************/
function addRoundToTable(roundIndex) {
const roundId = GlobalUserData.rounds[roundIndex].roundNum;
if (GlobalRoundsTable.rows[1].innerHTML.includes ("colspan")) {
  GlobalRoundsTable.deleteRow(1);
}
const thisRoundBody = GlobalRoundsTable.querySelector("tbody");
const thisRound = thisRoundBody.insertRow(0);
thisRound.id = "r-" + roundId;
thisRound.classList.add("row-item");
writeRoundToTable(thisRound,roundIndex);
}

/*************************************************************************
* @function updateRoundInTable
* @desc Updates an existing round in the "Rounds" table.
* @param rowIndex: index in userData.rounds of round to update
*************************************************************************/
function updateRoundInTable(rowIndex) {
const thisRound = document.getElementById("r-" + GlobalUserData.rounds[rowIndex].roundNum);
writeRoundToTable(thisRound,rowIndex);
}

/*************************************************************************
* @function populateRoundsTable
* @desc Populate the full rounds table from userData.rounds array.
*************************************************************************/
function populateRoundsTable() {
for (let i = 0; i < GlobalUserData.rounds.length; ++i) {
  addRoundToTable(i);
}
if (GlobalUserData.rounds.length == 1) {
  GlobalRoundsTableCaption.textContent = "Table displaying 1 speedgolf round";
} else {
  GlobalRoundsTableCaption.textContent = "Table displaying " + GlobalUserData.rounds.length + " speedgolf rounds";
}
}

/*************************************************************************
* @function editRound
* @desc Load a round into the form for editing and open the dialog.
* @param roundId the unique id of the round to edit
*************************************************************************/
function editRound(roundId) {
for (GlobalRoundIndex = 0; GlobalRoundIndex < GlobalUserData.rounds.length; ++GlobalRoundIndex) {
  if (GlobalUserData.rounds[GlobalRoundIndex].roundNum === roundId) {
    break;
  }
}
fillRoundForm(GlobalUserData.rounds[GlobalRoundIndex]);
transitionToDialog(GlobalRoundsModeDialog,"SpeedScore: Edit Round",prepEditRoundForm);
}

/*************************************************************************
* @function logRound
* @desc Create a new round, persist it, update the table, and show toast.
*************************************************************************/
function logRound() {
const newRound = {
  date: GlobalRoundDate.value,
  course: GlobalRoundCourse.value,
  type: GlobalRoundType.value,
  holes: GlobalRoundHoles.value,
  strokes: GlobalRoundStrokes.value,
  minutes: GlobalRoundMinutes.value,
  seconds: GlobalRoundSeconds.value,
  SGS: GlobalRoundSGS.value,
  notes: GlobalRoundNotes.value,
  roundNum: ++(GlobalUserData.roundCount)
};
GlobalUserData.rounds.push(newRound);
localStorage.setItem(GlobalUserData.accountInfo.email,
  JSON.stringify(GlobalUserData));
resetLogRoundForm();
addRoundToTable(GlobalUserData.rounds.length-1)
GlobalRoundUpdatedMsg.textContent = "New Round Logged!";
GlobalRoundUpdated.classList.remove("hidden");
transitionFromDialog(GlobalRoundsModeDialog);
}

/*************************************************************************
* @function updateRound
* @desc Update an existing round, persist it, update the table, show toast.
* @global GlobalRoundIndex: The index of the round being edited
*************************************************************************/
function updateRound() {
GlobalUserData.rounds[GlobalRoundIndex].date = GlobalRoundDate.value;
GlobalUserData.rounds[GlobalRoundIndex].course = GlobalRoundCourse.value;
GlobalUserData.rounds[GlobalRoundIndex].type = GlobalRoundType.value;
GlobalUserData.rounds[GlobalRoundIndex].holes = GlobalRoundHoles.value;
GlobalUserData.rounds[GlobalRoundIndex].strokes = GlobalRoundStrokes.value;
GlobalUserData.rounds[GlobalRoundIndex].minutes = GlobalRoundMinutes.value;
GlobalUserData.rounds[GlobalRoundIndex].seconds = GlobalRoundSeconds.value;
GlobalUserData.rounds[GlobalRoundIndex].SGS = GlobalRoundSGS.value;
GlobalUserData.rounds[GlobalRoundIndex].notes = GlobalRoundNotes.value;
localStorage.setItem(GlobalUserData.accountInfo.email,
  JSON.stringify(GlobalUserData));
resetLogRoundForm();
updateRoundInTable(GlobalRoundIndex);
roundUpdatedMsg.textContent = "Round Updated!";
roundUpdated.classList.remove("hidden");
transitionFromDialog(GlobalRoundsModeDialog);
}
/*************************************************************************
 * File: roundsMode.js
 * This file contains functions that support the "Rounds" mode, 
 * including the "Log Round" modal.
*************************************************************************/

/*************************************************************************
 * @function updateSGS 
 * @Desc 
 * When the strokes, minutes or seconds fields are updated, 
 * update the speedgolf score accordingly.
 * @global roundStrokes: Form's strokes field
 * @global roundMinutes: Form's minutes field
 * @global roundSeconds: Form's seconds field
 *************************************************************************/
 function updateSGS() {
  GlobalRoundSGS.value = 
    (GlobalRoundStrokes.valueAsNumber + GlobalRoundMinutes.valueAsNumber) + 
    ":" + GlobalRoundSeconds.value
}

/*************************************************************************
* @function changeSeconds 
* @Desc 
* When the seconds field is updated, we need to ensure that the
* seconds field of the round time is zero-padded. We also need to 
* call updateSGS to update the speedgolf score based on the new seconds value.
* @global roundStrokes: Form's strokes field
* @global roundMinutes: Form's minutes field
* @global roundSeconds: Form's seconds field
*************************************************************************/
function changeSeconds() {
  if (GlobalRoundSeconds.value.length < 2) {
    GlobalRoundSeconds.value = "0" + GlobalRoundSeconds.value;
  }
  updateSGS();
}
/*************************************************************************
* @function sortRoundsTable 
* @desc 
* Sort the rounds table in ascending or descending order by a given column.
* Use w3.sortHTML to perform the sort. The function alternatively sorts
* in ascending and descending order on successive calls.
* @param colNum -- the integer 1-based index of the column to sort by
* @global GlobalRoundsTableSortBtns: Array of buttons in col header that
*         can be clicked 
* @global GlobalRoundsTableSortableColHeaders: Array of refs to the 
*         header col elements of the first three (sortable) cols
* @global GlobalRoundsTableHeaderColLabels: Array of strings labeling 
*         data in corresponding column
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
* @global GlobalRoundsTableSortBtns: Array of buttons in col header that
*         can be clicked 
*************************************************************************/
for (let i = 0; i < GlobalRoundsTableSortBtns.length; ++i) {
GlobalRoundsTableSortBtns[i].addEventListener("click",() => sortRoundsTable(i+1) );
}
/*************************************************************************
* @function searchRoundsTable 
* @Desc 
* When the user performs a keystroke within the search box, perform a 
* search of the rounds table, displaying only those rows that contain
* the text within the search box.
* @param searchVal, the text string in the search box
* @global createAccountForm: the <form> element whose 
*         SUBMIT handler is triggered
* @global roundsTable: The table of rounds
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
* @global searchBox: The search box
* @global searchBtn: The search button
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

/*************************************************************************
* @function logRoundForm SUBMIT Handler 
* @Desc 
* When the user clicks on the "Add Round" button, we first check the
* validity of the fields, presenting accessible
* error notifications if errors exist. If no errors exist, we
* call the logRound() function, passing in the round data
* @global createAccountForm: the <form> element whose 
*         SUBMIT handler is triggered
* @global GlobalRoundDate: the field containing the round date
* @global GlobalRoundCourse: the course of the round
* @global GlobalRoundStrokes: the number of strokes taken in the round
* @global GlobalRoundMinutes: the number of minutes taken in the round
* @global GlobalRoundSeconds: the number of seconds taken in teh round
* @global GlobalRoundNotes: the notes on the round
*************************************************************************/
GlobalLogRoundForm.addEventListener("submit",function(e) {
e.preventDefault(); //Prevent default submit behavior
//Is the date valid?
let dateValid = !GlobalRoundDate.validity.valueMissing;
//Is the course field valid?
let courseValid = !GlobalRoundCourse.validity.tooLong && 
                  !GlobalRoundCourse.validity.valueMissing;
//Is the password field valid?
let strokesValid = !GlobalRoundStrokes.validity.typeMismatch &&
                   !GlobalRoundStrokes.validity.rangeUnderflow &&
                   !GlobalRoundStrokes.validity.rangeOverflow && 
                   !GlobalRoundStrokes.validity.valueMissing;
//Is the minutes field valid?
let minutesValid = !GlobalRoundMinutes.validity.typeMismatch &&
                   !GlobalRoundMinutes.validity.rangeUnderflow &&
                   !GlobalRoundMinutes.validity.rangeOverflow && 
                   !GlobalRoundMinutes.validity.valueMissing;
//Is the seconds field valid?
let secondsValid = !GlobalRoundSeconds.validity.typeMismatch &&
                   !GlobalRoundSeconds.validity.rangeUnderflow &&
                   !GlobalRoundSeconds.validity.rangeOverflow && 
                   !GlobalRoundSeconds.validity.valueMissing;
//Is the notes field valid?
let notesValid = !GlobalRoundNotes.validity.tooLong;
if (courseValid && strokesValid && minutesValid &&
    secondsValid && notesValid &&dateValid) { 
    //All is well -- log round or update round
    if (GlobalRoundFormSubmitBtnIcon.classList.contains("fa-save")) {
      logRound();
    } else {
      updateRound();
    }
   return;
}
//If here, at least one field is invalid: Display the errors
//and allow user to fix them.
GlobalRoundErrBox.classList.remove("hidden");
document.title = "Error: Log Round";
if (!notesValid) { 
  GlobalRound.classList.remove("hidden");
  GlobalRoundNotesErr.focus();
  GlobalFirstFocusableLogRoundItem.set(GlobalRoundNotesErr);
} else {
  GlobalRoundNotesErr.classList.add("hidden");
}
if (!secondsValid) { 
  GlobalRoundSecondsErr.classList.remove("hidden");
  GlobalRoundSecondsErr.focus();
  GlobalFirstFocusableLogRoundItem.set(GlobalRoundSecondsErr);
} else {
  GlobalRoundSecondsErr.classList.add("hidden");
}
if (!minutesValid) { 
  GlobalRoundMinutesErr.classList.remove("hidden");
  GlobalRoundMinutesErr.focus();
  GlobalFrstFocusableLogRoundItem.set(GlobalRoundMinutesErr);
} else {
  GlobalRoundMinutesErr.classList.add("hidden");
}
if (!strokesValid) { 
  GlobalRoundStrokesErr.classList.remove("hidden");
  GlobalRoundStrokesErr.focus();
  GlobalFirstFocusableLogRoundItem.set(GlobalRoundStrokesErr);
} else {
  GlobalRoundStrokesErr.classList.add("hidden");
}
if (!courseValid) { 
    GlobalRoundCourseErr.classList.remove("hidden");
    GlobalRoundCourseErr.focus();
    GlobalFirstFocusableLogRoundItem.set(GlobalRoundCourseErr);
} else {
    GlobalRoundCourseErr.classList.add("hidden");
}
if (!dateValid) { 
  GlobalRoundDateErr.classList.remove("hidden");
  GlobalRoundDateErr.focus();
  GlobalFirstFocusableLogRoundItem.set(GlobalRoundDateErr);
} else {
  GlobalRoundDateErr.classList.add("hidden");
}
});

/*************************************************************************
* @function keyDownRoundDialogFocused 
* @desc 
* When the user presses a key with an element in the Log Round 
* dialog focused, we implement the accessible keyboard interface for
* a modal dialog box. This means that "Escape" dismisses the dialog and
* that it is impossible to tab outside of the dialog box.
* @global GlobalFirstFocusableLogRoundItem: References the first focusable
*         item in "Log Round" dialog. 
* @global GlobalRoundsModeLogCancelBtn: The "Cancel" button (last focusable 
*         item in "Log Round" dialog)
*************************************************************************/
function keyDownRoundDialogFocused(e) {
if (e.code === "Escape") {
  GlobalRoundsModeLogCancelBtn.click();
  return;
}
if (e.code === "Tab" && document.activeElement == GlobalFirstFocusableLogRoundItem.get() &&
   e.shiftKey) {
    //shift focus to last focusable item in dialog
    GlobalRoundsModeLogCancelBtn.focus();
    e.preventDefault();
    return;
}
if (e.code === "Tab" && document.activeElement == GlobalRoundsModeLogCancelBtn &&
    !e.shiftKey) {
    //shift focus to first focusable item in dialog
    GlobalFirstFocusableLogRoundItem.get().focus();
    e.preventDefault();
    return;
}
}