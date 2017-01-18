//TEST FIL


import React from 'react'
import style from "../../public/style.css"
import { connect } from 'react-redux'
import Draggable from 'react-draggable';


var Competence = React.createClass({

 textChange(id, event) {
    var newText = event.currentTarget.value;
    this.props.onChange(id, newText);

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
    this.props.onChange(id, newText);

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
    this.props.onChange(id, newText);
    //this.props.onTextChange(this.state.noteText);
},
 removeNote(id) {
    this.props.onRemoveNote(id);
},

    // eventLogger : (e: MouseEvent, data: Object) => {
    // console.log('Event: ', event);
    // console.log('Data: ', data);
// },
    render: function() {

        // const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
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
// 
let Board = React.createClass({
    getInitialState: function() {
        return {
            notes: [],
            noteTextList: [],
            noteText: "sometext",
            id: 0,
            jobs: ["job 1"],
            competences: []
        }
    },

    
    //Prøver at slå alle 3 add, remove og textChange sammen fra 9 til 3 funktioner - prøv senere

//     addSomething: function(listName) {
//         this.setState({ list: this.state.list.concat([""])})
//     },

// onRemoveSomething: function(listName) {
//         var newList = this.state.listName;
//         newList.splice(this.state.listName.length - 1, 1);
//         this.setState({ list: newList });
//     },

// onSomeTextChange: function(listName, index, newText) {
//         var newList = this.state.listName;
//         this.setState.noteText = newText;

//         newList.splice(index, 1, newText)
//         this.setState({ listName: newList})
//     },


//Competences
addCompetences: function() {
        this.setState({ competences: this.state.competences.concat([""])})
    },

onRemoveCompetences: function() {
        var newCompList = this.state.competences;
        newCompList.splice(this.state.competences.length - 1, 1);
        this.setState({ competences: newCompList });
    },

onCompTextChange: function(index, newText) {
        var newCompList = this.state.competences;
        this.setState.noteText = newText;

        newCompList.splice(index, 1, newText)
        this.setState({ competences: newCompList})
    },

//JOB
addJob: function() {
        this.setState({ jobs: this.state.jobs.concat([""])})
    },

onRemoveJob: function() {
        var newJobList = this.state.jobs;
        newJobList.splice(this.state.jobs.length - 1, 1);
        this.setState({ jobs: newJobList });
    },

onJobTextChange: function(index, newText) {
        var newJobList = this.state.jobs;
        this.setState.noteText = newText;

        newJobList.splice(index, 1, newText)
        this.setState({ jobs: newJobList})
    },

//NOTE

addChild: function() {
        this.setState({ notes: this.state.notes.concat([{ note: Note}]) });
        this.setState({ noteTextList: this.state.noteTextList.concat([{text: ""}])})
        this.setState.id++
        console.log(this.state.id);
    },

    onTextChange: function(index, newText) {
        var newNoteTextList = this.state.noteTextList;
        this.setState.noteText = newText;

        newNoteTextList.splice(index, 1, {text: newText})
        this.setState({ noteTextList: newNoteTextList})
    },
//virker ikke som den skal
    onRemoveNote: function(index) {
        var newNoteList = this.state.notes;
        newNoteList.splice(index, 1);
        this.setState({ notes: newNoteList });

        var newNoteTextList = this.state.noteTextList;
        newNoteTextList.splice(index, 1);
        this.setState({ noteTextList: newNoteTextList });
       
        // var noteList = this.state.notes;
        // delete noteList[index];
        // this.setState({ notes: noteList });
    },

    eventLogger : (e: MouseEvent, data: Object) => {
    console.log('Event: ', event);
    console.log('Data: ', data);
    },

    render: function(){
        const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
        return(
            
            <div>
            <h1 style={{"textAlign": "center"}}> My Board! </h1>
        <center><button className="addNote" onClick={() => this.addChild()}>Tilføj note</button></center>
        <button className="addJob" onClick={() => this.addJob()}>Tilføj job</button>
        <button className="removeJob" onClick={() => this.onRemoveJob()}>Fjern job</button>
        
        <button className="removeCompetence" style={{"float": "right"}} onClick={() => this.onRemoveCompetences()}>Fjern kompetance</button>
        <button className="addCompetence" style={{"float": "right"}} onClick={() => this.addCompetences()}>Tilføj kompetance</button>


        <div className="board" >

        { this.state.notes.map((note, index) =>
            <Draggable bounds="parent" { ...dragHandlers}  >
            <div className="moveableArea">
            <Note
                key={index}
                value={this.state.noteText}
                id={index}
                onRemoveNote={this.onRemoveNote}
                onChange={this.onTextChange}
    />
    </div>
    </Draggable>
    )}
    <div style={{"display": "inline-block", "height": "100%", "width": "50%", "marginTop": "5%"}}>
    {this.state.jobs.map((job, index) =>
        <div style={{"display": "inline-block", "marginRight": "25em"}}>
        <Job 
        key={index}
        value={this.state.noteText}
        id={index}
        onChange={this.onJobTextChange}
        />
        </div>
        )}
        </div>
        <div style={{"display": "block", "height": "100%", "width": "50%", "float": "right"}}>
        {this.state.competences.map((competence, index) =>
        <Competence 
        key={index}
        value={this.state.noteText}
        id={index}
        onChange={this.onCompTextChange}
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