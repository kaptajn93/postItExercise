import React from 'react'
import style from "../../public/style.css"
import { connect } from 'react-redux'
import Draggable from 'react-draggable';


var Competence = React.createClass({

 textChange(id, event) {
    var newText = event.currentTarget.value;
    this.props.onChange("competences", id, newText);
    },
render: function() {
        return (
                    <div className="competence" >
                        <textarea id="competence" type="text"
                            placeholder="Enter competence title"
                            onChange={(event) => this.textChange(this.props.id, event)}
                        />
                    </div>
);
}
});
var Job = React.createClass({
 textChange(id, event) {
    var newText = event.currentTarget.value;
    this.props.onChange("jobs", id, newText);

    },
render: function() {
        return (
                    <div className="job" >
                        <textarea id="job" type="text"
                            placeholder="Enter job title"
                            onChange={(event) => this.textChange(this.props.id, event)}
                        />
                    </div>
);
}
});
var Note = React.createClass({

    textChange(id, event) {
    var newText = event.currentTarget.value;
    this.props.onChange("notes", id, newText);
    //this.props.onTextChange(this.state.noteText);
},
 removeNote(id) {
    this.props.onRemoveNote("notes", id);
},
    render: function() {

        return (
                    <div className="note" >
                        <a className="removeNote" onClick={() => this.removeNote(this.props.id)}>x</a>
                        <textarea type="text"
                            placeholder="Enter note title"
                            onChange={(event) => this.textChange(this.props.id, event)}
                            />
                            </div>
);
}
});


let Board = React.createClass({
    getInitialState: function() {
        return {
            notes: [],
            jobs: [""],
            deltaPosition: {x: 560, y: 125},
            competences: [],
            position: {x: 560, y: 125},
            notePositions: [],
            competenceNotes: []
        }
    },
    handleDrag: function (e, ui) {
      const {x, y} = this.state.deltaPosition;
      this.setState({
        deltaPosition: {
          x: x + ui.deltaX,
          y: y + ui.deltaY,
        }
      });
    },
    
    //Prøver at slå alle 3 add, remove og textChange sammen fra 9 til 3 funktioner

    addSomething: function(listName) {
        switch(listName){
        case "notes":
        this.setState({ notes: this.state.notes.concat([{ note: Note, text: "", position: {x: 600 ,y: 125} }]) });
        this.setState.id++
        break;
        case "jobs":
        this.setState({ jobs: this.state.jobs.concat([""])})
        break;
        case "competences":
        this.setState({ competences: this.state.competences.concat([""])})
        break;
        default:
        alert("onSomeChange, list not found");
    }
},

onRemoveSomething: function(listName, index) {
        switch(listName){
        case "notes":
        // var newList = this.state.notes;
        // newList.splice(this.state.notes[index], 1);
        // this.setState({ notes: newList });

        var noteList = this.state.notes;
        delete noteList[index];
        this.setState({ notes: noteList });
        break;
        case "jobs":
        var newList = this.state.jobs;
        newList.splice(this.state.jobs.length - 1, 1);
        this.setState({ jobs: newList });
        break;
        case "competences":
        newList = this.state.competences;
        newList.splice(this.state.competences.length - 1, 1);
        this.setState({ competences: newList });
        break;
        default:
        alert("onSomeChange, list not found");
    }
    },
onSomeTextChange: function(listName, index, newText) {
        switch(listName){
        case "notes":

        var newNoteList = this.state.notes;
        
        this.setState.noteText = newText;

        newNoteList[index].text = newText;
        this.setState({ noteTextList: newNoteList})

        break;
        case "jobs":
        var newList = this.state.jobs;
        newList.splice(index, 1, newText)
        this.setState({ jobs: newList})
        break;
        case "competences":
        newList = this.state.competences;
        newList.splice(index, 1, newText)
        this.setState({ competences: newList})
        break;
        default:
        alert("onSomeChange, list not found");
    }
    },
    eventLogger : (e: MouseEvent, data: Object) => {
    console.log('Event: ', event);
    console.log('Data: ', data);
    },

    render: function(){
        const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
        return(
            <div>
            <div>
            <h1 style={{"textAlign": "center"}}> My Board! </h1>
            </div>
        <center><button className="addNote" onClick={() => this.addSomething("notes")}>Tilføj note</button></center>
        <button className="addJob" onClick={() => this.addSomething("jobs")}>Tilføj job</button>
        <button className="removeJob" onClick={() => this.onRemoveSomething("jobs")}>Fjern job</button>
        <button className="removeCompetence" style={{"float": "right"}} onClick={() => this.onRemoveSomething("competences")}>Fjern kompetance</button>
        <button className="addCompetence" style={{"float": "right"}} onClick={() => this.addSomething("competences")}>Tilføj kompetance</button>

        <div className="board">
        { this.state.notes.map((note, index) =>
            <Draggable bounds="body" onDrag={this.handleDrag} { ...dragHandlers}  >
            <div className="moveableArea" style={{ "transform": "translate(" + note.position[0] + "px,"+ note.position[1] + "px)"  }}>
            <Note
                key={index}
                value={this.state.noteText}
                id={index}
                onRemoveNote={this.onRemoveSomething}
                onChange={this.onSomeTextChange}
    />
    </div>
    </Draggable>
    )}
    <div style={{"display": "block", "height": "100%", "width": "50%", "float": "left", "marginTop": "2em"}}>
    {this.state.jobs.map((job, index) =>
        <Job 
        key={index}
        value={this.state.noteText}
        id={index}
        onChange={this.onSomeTextChange}
        />
        )}
        </div>
        <div style={{"display": "block", "height": "100%", "width": "50%", "float": "right"}}>
        {this.state.competences.map((competence, index) =>
        <Competence 
        key={index}
        value={this.state.noteText}
        id={index}
        onChange={this.onSomeTextChange}
        />
        )}
        </div>
        </div>
{this.state.notes.length}
{this.state.jobs.length}
{this.state.competences.length}
</div>
    );
}
});

export default Board

Board = connect()(Board);


// 