import {ADD_SOMETHING} from '../actions/index'
import {Note} from '../components/note.js'
import {Job} from '../components/job'
import {Competence} from '../components/competence'


function addSomething(state = [], action) {
  switch (action.type) {
    case ADD_SOMETHING:
     switch(action.listName){
            case "notes":
            return Object.assign({}, state, {
                notes: [
                ...state.notes,
                {
                    note: Note, 
                    text: "", 
                    position: {x: this.state.defaultNotePosition.x ,y: this.state.defaultNotePosition.y}
                }
                ]
            })
                break;
                case "jobs":
                return Object.assign({}, state, {
                jobs: [
                ...state.jobs,
                {
                   job: new Job()
                }
                ]
            })
                break;
                case "competences":
                return Object.assign({}, state, {
                competences: [
                ...state.competences,
                {
                    competence: new Competence() 
                }
                ]
            })
                break;
                default:
                alert("addSomething, list not found");
    
  }
    break;
    default:
      return state
}}