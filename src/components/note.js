import React from 'react'
import style from "../../public/style.css"
import { connect } from 'react-redux'
import Draggable from 'react-draggable';

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

export default Note
