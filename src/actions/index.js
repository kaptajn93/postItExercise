export const ADD_SOMETHING = 'ADD_SOMETHING'
export const REMOVE_SOMETHING = 'REMOVE_SOMETHING'
export const CHANGE_SOMETHING = 'CHANGE_SOMETHING'

/*
 * action creators
 */

export function addSomething(listName) {
  return { type: ADD_SOMETHING, listName }
}

export function removeSomething(listName, index) {
  return { type: REMOVE_SOMETHING, listName, index }
}

export function onSomethihngChanged(listName, index, newText) {
  return { type: CHANGE_SOMETHING, listName, index, newText}
}


