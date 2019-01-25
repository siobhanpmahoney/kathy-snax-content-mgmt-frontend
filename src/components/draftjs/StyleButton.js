import React from "react";
import { EditorState, Editor, RichUtils, AtomicBlockUtils } from "draft-js";

class StyleButton extends React.Component {

  onToggle = (e) => {
    e.preventDefault()

    this.props.onToggle(this.props.style)
  }

  render() {
    console.log(this.props)
    let className = "RichEditor-styleButton inline styleButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    }

    return (
        <button className={className} id={this.props.id || ""} onMouseDown={this.onToggle}>
        {this.props.label}
      </button>
    );
  }
}

export default StyleButton;
