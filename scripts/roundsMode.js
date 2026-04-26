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
