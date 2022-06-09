import { showModal } from "./modal";

export function showWinnerModal(fighter) {
  const title = `${fighter.name} wins`;
  const bodyElement = fighter;
  showModal({title, bodyElement});
  //  call showModal function
}
