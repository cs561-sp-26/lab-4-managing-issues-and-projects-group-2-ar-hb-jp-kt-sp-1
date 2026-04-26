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
* Prepares the round form to edit an existing round by setting the app's
* title, and the form button's label and icon.
* and button label to "Log Round," and by setting the button's icon
* @global GlobalRoundFormHeader: Form's H1 element
* @global GlobalRoundFormSubmitBtnLabel: Form's button label
* @global GlobalRoundFormSubmitBtnIcon: Form's button icon
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
* Prepares the round form for editing by filling it with the data on the
* round to be edited.
* @param round: An object containing the round data
* @global GlobalRoundDate: Form's date field
* @global GlobalRoundCourse: Form's course field
* @global GlobalRoundType: Form's type field
* @global GlobalRoundStrokes: Form's strokes field
* @global GlobalRoundMinutes: Form's minutes field
* @global GlobalRoundSeconds: Form's seconds field
* @global GlobalRoundSGS: Form's Speedgolf Score field
* @global GlobalRoundNotes: Form's notes field
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
* When the user exits the "Log Round" Dialog, reset the form to
* show blank data and default values
* @global GlobalRoundDate: Form's date field
* @global GlobalRoundCourse: Form's course field
* @global GlobalRoundType: Form's type field
* @global GlobalRoundStrokes: Form's strokes field
* @global GlobalRoundMinutes: Form's minutes field
* @global GlobalRoundSeconds: Form's seconds field
* @global GlobalRoundSGS: Form's Speedgolf Score field
* @global GlobalRoundNotes: Form's notes field
* @global GlobalRoundsErrBox: <div> containing the error messages
* @global GlobalRoundCourseErr: Error message for course field
* @global GlobalRoundStrokesErr: Error message for strokes field
* @global GlobalRoundMinutesErr: Error message for minutes field
* @global GlobalRoundSecondsErr: Error message for seconds  field
* @global GlobalRoundNotesErr: Error message for notes field
*************************************************************************/
function resetLogRoundForm() {
//Set date to today.
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
* Given an HTML row element and the index of the round to write, write
* the round to the row element by replacing its innerHTML.
* @param row -- a reference to an HTML table row
* @param rIndex -- an integer index into userData.rounds indicating the
*        round to write to the table.
* @global GlobalUserData: The data for the current user
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
* @desc
* Adds a new round to the "Rounds" table, updating the caption
* @param roundIndex: index in userData.rounds of round to add
* @global GlobalUserData: the current user's data object
* @global GlobalRoundsTableCaption: The table's caption
*************************************************************************/
function addRoundToTable(roundIndex) {
const roundId = GlobalUserData.rounds[roundIndex].roundNum;
if (GlobalRoundsTable.rows[1].innerHTML.includes ("colspan")) {
  //empty table! Remove this row before adding new one
  GlobalRoundsTable.deleteRow(1);
}
//Write new row containing new round to table body
const thisRoundBody = GlobalRoundsTable.querySelector("tbody");
const thisRound = thisRoundBody.insertRow(0); //insert as first table row
thisRound.id = "r-" + roundId; //set unique id of  row so we can access it later
thisRound.classList.add("row-item"); //needed for sorting.
writeRoundToTable(thisRound,roundIndex);
}

/*************************************************************************
* @function updateRoundInTable
* @desc
* Updates an existing round in the "Rounds" table with edits made by user.
* After locating the row, calls writeRoundToTable to write data.
* @param rowIndex: index in userData.rounds of round to update
* @global userData: the current user's data object
*************************************************************************/
function updateRoundInTable(rowIndex) {
const thisRound = document.getElementById("r-" + GlobalUserData.rounds[rowIndex].roundNum);
writeRoundToTable(thisRound,rowIndex);
}

/*************************************************************************
* @function populateRoundsTable
* @desc
* Iterate through the userData.rounds array, adding a row corresponding
* to each round stored in the array.
* @global GlobaluserData: object containing the current user's data
* @global GlobalRoundsDataCaption: The caption for the "Rounds" table
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
