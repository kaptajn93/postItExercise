function onRemoveSomething(state = initialState, action, index) {
  switch (action.type) {
    case ADD_SOMETHING:
     switch(action.listName){
            case "notes":
             // var newList = this.state.notes;
            // newList.splice(this.state.notes[index], 1);
            // this.setState({ notes: newList });
                var noteList = state.notes
                delete noteList[index]
                this.setState({ notes: noteList });
                return Object.assign({}, state, {
                notes: [
                ...state.notes,
                ]
            })
                break;
                case "jobs":
                 // var newList = this.state.jobs;
                // newList.splice(this.state.jobs.length - 1, 1);
                // this.setState({ jobs: newList });
                var newList = state.jobs;
                delete newList[index];
                this.setState({ jobs: newList });
                return Object.assign({}, state, {
                jobs: [
                ...state.jobs,
                ]
            })
                break;
                case "competences":
                // newList = this.state.competences;
                // newList.splice(this.state.competences.length - 1, 1);
                // this.setState({ competences: newList });
                var newList = state.competences;
                delete newList[index];
                this.setState({ competences: newList });
                break;
                default:
                alert("onSomeChange, list not found");
                return Object.assign({}, state, {
                todos: [
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