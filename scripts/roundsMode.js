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
