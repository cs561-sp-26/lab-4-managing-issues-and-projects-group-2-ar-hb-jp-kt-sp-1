/*************************************************************************
 * File: roundsMode.js
 * This file contains functions that support the "Rounds" mode,
 * including the "Log Round" modal.
*************************************************************************/

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
