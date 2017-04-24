function onRemoveSomething(state = initialState, action, index, newText) {
  switch (action.type) {
    case ADD_SOMETHING:
     switch(action.listName){
            case "notes":
                var newNoteList = this.state.notes;
                this.setState.noteText = newText;
                newNoteList[index].text = newText;
                this.setState({ noteTextList: newNoteList})
                return Object.assign({}, state, {
                notes: [
                ...state.notes,
                ]
            })
                break;
                case "jobs":
                var newList = this.state.jobs;
                newList.splice(index, 1, newText)
                this.setState({ jobs: newList})
                return Object.assign({}, state, {
                jobs: [
                ...state.jobs,
                ]
            })
                break;
                case "competences":
                newList = this.state.competences;
                newList.splice(index, 1, newText)
                this.setState({ competences: newList})
                break;
                default:
                alert("onSomeChange, list not found");
                return Object.assign({}, state, {
                competences: [
                ...state.competences,
                ]
            })
                break;
                default:
                alert("onRemoveSomething, list not found");
  }
    default:
      return state
}}