import React from 'react'
import style from "../../public/style.css"
import { connect } from 'react-redux'
import Draggable from 'react-draggable';

var Job = React.createClass({
 textChange(id, event) {
    var newText = event.currentTarget.value;
    this.props.onChange("jobs", id, newText);

},
removeJob(id) {
    this.props.onRemoveJob("jobs", id);
},
render: function() {
        return (
                    <div className="job" >
                        <textarea id="job" type="text"
                            placeholder="Enter job title"
                            onChange={(event) => this.textChange(this.props.id, event)}
                        />
                         <a className="removeJob" onClick={() => this.removeJob(this.props.id)}>x</a>
                    </div>
);
}
});

export default Job