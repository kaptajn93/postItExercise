import React from 'react'
import style from "../../public/style.css"
import { connect } from 'react-redux'
import Draggable from 'react-draggable';


var Competence = React.createClass({

    getInitialState: function(){
        return {
          showComp: true
      };
    },

//  textChange(id, event) {
//     var newText = event.currentTarget.value;
//     this.props.onChange("competences", id, newText);
// },
// removeComp(id) {
//     this.props.onRemoveComp("competences", id);
// },
render: function() {
        return (
                    <div className="competence" id={this.props.id} >
                        <textarea id="competence" type="text"
                            placeholder="Enter competence title"
                            value={this.props.value}
                            onChange={(event) => this.props.onChange("competences" ,this.props.id, event.currentTarget.value)}  
                        />
                    <a className="removeComp" onClick={() => this.props.onRemoveComp("competences",this.props.id)}>x</a>
                    </div>
);
}
});

export default Competence