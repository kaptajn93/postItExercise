import React from 'react'
import style from "../../public/style.css"
import { connect } from 'react-redux'
import Draggable from 'react-draggable';


var Note = React.createClass({

    getInitialState: function() {
        return {
    noteText: this.props.noteText
}
},

    onTextChange(event) {
        var newText = event.currentTarget.value;
        this.setState({ noteText: newText });
    //this.props.onTextChange(this.state.noteText);
},

    eventLogger : (e: MouseEvent, data: Object) => {
    console.log('Event: ', event);
    console.log('Data: ', data);
},
    render: function() {

        const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
        return (
            <Draggable{ ...dragHandlers} >
                <div style={ {width: "192px" }}>
                    <form className="note" >
                        <button className="remove" onClick={this.props.removeChild}>x</button>
                        <textarea type="text"
                            value={this.state.noteText} onChange={(event) => this.onTextChange(event)}
                            placeholder="Enter note title"/>
                            </form>
                </div>
                </Draggable>
);
}
});

let Board = React.createClass({
    getInitialState: function() {
        return {
            notes: [],
            noteTextList: [],
        }
    },

    addChild: function() {
        this.setState({ notes: this.state.notes.concat([{ note: Note}]) });
    },

    onTextChange: function(text) {
        this.setState({ noteTextList: this.state.noteTextList.concat([{ text: Note}]) });
    },

    removeChild: function(index) {
        //var newNoteList = this.state.notes;
        //newNoteList.splice(index, 1);
        //this.setState({ notes: newNoteList });
        var noteList = this.state.notes;
        delete noteList[index];
        this.setState({ notes: noteList });
    },
    render: function(){
        return(
            <div>
            <center><h1> My Board! </h1>
        <button className="addNote" onClick={() => this.addChild()}>+</button></center>
        <div className="board">
        <div>
        { this.state.notes.map((note, index) =>
            <div>
            <Note
                key={index}
        removeChild={() => this.removeChild(index)}
        name={index}
        value={() => this.onTextChange(index)}
    />
    </div>
    )}
</div>
</div>
{this.state.notes.length}
</div>
    );
}
});

export default Board

Board = connect()(Board);
