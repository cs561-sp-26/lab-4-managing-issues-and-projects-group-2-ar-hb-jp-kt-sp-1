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
