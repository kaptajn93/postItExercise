import React from 'react'
import style from "../../public/style.css"
import { connect } from 'react-redux'
import Sortable from 'sortablejs'
import Draggable from 'react-draggable';
import Note from './note'
import Job from './job'
import Competence from './competence'
import { Button, Row, Col, Icon } from 'react-materialize';

let Board = React.createClass({
    getInitialState: function() {
        return {
            notes: [],
            jobs: [""],
            competences: [],
            defaultNotePosition: {x: 460, y: 225},
            competenceNotes: [],
            moveComp: false,
        }
    },

sortableContainersDecorator: (componentBackingInstance) => {
    // check if backing instance not null
    if (componentBackingInstance) {
      let options = {
        handle: ".compUl" // Restricts sort start click/touch to the specified element

      };
      Sortable.create(componentBackingInstance, options);
    }
  },

  sortableGroupDecorator: (componentBackingInstance) => {
    // check if backing instance not null
    if (componentBackingInstance) {
      let options = {
        draggable: ".comp", // Specifies which items inside the element should be sortable
        group: "shared"
      };
      Sortable.create(componentBackingInstance, options);
    }
  },


    //Prøver at slå alle 3 add, remove og textChange sammen fra 9 til 3 funktioner
    addSomething: function(listName) {
        switch(listName){
        case "notes":
        this.setState({ notes: this.state.notes.concat([{ note: Note, text: "", position: {x: this.state.defaultNotePosition.x ,y: this.state.defaultNotePosition.y} }]) });
        this.setState.id++
        break;
        case "jobs":
                this.setState({ jobs: this.state.jobs.concat(new Job())})
        break;
        case "competences":
        //  if(this.state.competences.length < 3){
                this.setState({ competences: this.state.competences.concat(new Competence())})
        // }
        // else{alert("Du kan kun tilføje 3 competancer")}
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
        // var newList = this.state.jobs;
        // newList.splice(this.state.jobs.length - 1, 1);
        // this.setState({ jobs: newList });
        var newList = this.state.jobs;
        delete newList[index];
        this.setState({ jobs: newList });
        break;
        case "competences":
        // newList = this.state.competences;
        // newList.splice(this.state.competences.length - 1, 1);
        // this.setState({ competences: newList });
        var newList = this.state.competences;
        delete newList[index];
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
    onDragStop: function(index, event){
        
            var newPosition = {x: event.x, y: event.y};
            if(newPosition.x !== this.state.defaultNotePosition.x && newPosition.y !== this.state.defaultNotePosition.y){
                var newNoteList = this.state.notes;
                newNoteList[index].position = newPosition;
                this.setState({notes: newNoteList})
            }
    },
    onNext: function(index, event){
        var notes = this.state.notes;
        var competences = this.state.competences;
        var compNotes = [];
        var x = 600;
        competences.forEach(function(competence, index) {
            compNotes.push({competence: competence, belongingNotes: []})
        }, this);
        notes.forEach(function(note) {
            var y = 300;
            var yOld = 0;
            if(note.position.x > x ){
                compNotes.forEach(function(comp) {
                    if(note.position.y > yOld && note.position.y < y){
                        comp.belongingNotes.push(note);
                    }
                    yOld = y;
                    y = y+200;
                }, this);
            }
        }, this);
     
        this.setState({competenceNotes: compNotes})
    this.scrollToPriority();    
},
scrollToPriority: function(){
    var getDiv = document.getElementsByClassName("board");
    getDiv[0].style.transform = 'translateX(-33.34%)';
    this.setState({moveComp: false})
},
onPrev: function(){
var getDiv = document.getElementsByClassName("board");
    getDiv[0].style.transform = 'translateX(0%)';
    this.setState({moveComp: false})
},

onDone: function(){
        var notes = this.state.notes;
        var competences = this.state.competences;
   
    var len = competences.length;
   for (var i = len-1; i>=0; i--){
     for(var j = 1; j<=i; j++){
       if(competences[j-1]>competences[j]){
           var temp = competences[j-1];
           competences[j-1] = competences[j];
           competences[j] = temp;
        }
     }
   }
   return competences;
},

    eventLogger : (e: MouseEvent, data: Object) => {
    console.log('Event: ', event);
    console.log('Data: ', data);
    },
    render: function(){
        const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
        return(
            <div style={{"overflowX": "hidden"}}>
            <div>
            <h1 style={{"textAlign": "center"}}> Post-it Exercise </h1>
            </div>
        {/*<center><button className="addNote" onClick={() => this.addSomething("notes")}>Tilføj note</button></center>*/}
        
        {/*<button className="remJob" onClick={() => this.onRemoveSomething("jobs")}>Fjern job</button>*/}
        {/*<button className="remCompetence" style={{"float": "right"}} onClick={() => this.onRemoveSomething("competences")}>Fjern kompetance</button>*/}
        {/*<button className="addCompetence" style={{"float": "right"}} onClick={() => this.addSomething("competences")}>Tilføj kompetance</button>*/}
        <div className="container">

            <div style={{"width":"3%", "height":"100%", "display":"inline", "float": "left"}}>
                <button className="moveBack" style= {{"backgroundColor": "white"}} onClick={() => this.onPrev()}><span></span></button> 
            </div>
<div style={{"width":"94%", "height":"100%", "display":"inline", "float": "left", "overflow": "hidden", "overflowY": "scroll"}} >
        <div className="board" ref={this.sortableContainersDecorator}>
        { this.state.notes.map((note, index) =>
            <Draggable defaultPosition={this.state.defaultNotePosition} bounds={"parent"} { ...dragHandlers}  onStop={(event)=> this.onDragStop(index, event)}>
            <div className="moveableArea" style={{ "transform": "translate(" + note.position.x + ","+ note.position.y + ")"}}  >
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
    <div className="jobsDiv">
    {this.state.jobs.map((job, index) =>
        <Job 
        key={index}
        value={this.state.noteText}
        id={index}
        onRemoveJob={this.onRemoveSomething}
        onChange={this.onSomeTextChange}
        />
        )}
        </div>
        <div  className="compDiv" ref={this.sortableContainersDecorator}>
            <ul id="compUl" className="compUl"  ref={this.sortableGroupDecorator}>
        {this.state.competences.map((competence, index) =>
        <li className="comp" ><Competence
        key={index}
        value={this.state.noteText}
        id={index}
        onRemoveComp={this.onRemoveSomething}
        onChange={this.onSomeTextChange}
        />
       </li>
        
        )}
        </ul>
        </div>
        <div className="hiddenDiv" style={{"display":"flex", "justifyContent": "center", "flexDirection": "column", "alignContent": "center"}}>
           
            <ol id="olDiv" className="olDiv" ref={this.sortableGroupDecorator}>
                     
       </ol>
            {/*<button className="done" onClick={()=> this.onDone()}>Done</button>*/}
      
        </div>
        
        </div>
 </div>
    <div style={{"width":"3%", "height":"100%", "display":"inline", "float": "left"}}>
    <button className="moveNext" style= {{"backgroundColor": "white"}} onClick={() => this.onNext()}><span></span></button> 
    </div>

<div style={{"position": "relative", "top": "-10%", "right": "5%"}}>

        <Button floating fab='horizontal' icon='add' className='red' large>
  <Button floating icon="note" className='yellow' /*tooltip='addnote'*/ onClick={() => this.addSomething("notes")}/>
  <Button floating icon='business_center' className='orange' /*tooltip='add job'*/ onClick={() => this.addSomething("jobs")}/>
  <Button floating icon='equalizer' className='blue' /*tooltip='add competence'*/ onClick={() => this.addSomething("competences")}/>
</Button>
</div>
    </div>

<div style={{"marginLeft":"10%"}}>
{this.state.notes.length}
{this.state.jobs.length}
{this.state.competences.length}
</div>
</div>
    );
}
});

export default Board

Board = connect()(Board);


// 