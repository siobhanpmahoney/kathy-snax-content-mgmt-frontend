import React from 'react'

import { Editor, EditorState, RichUtils } from 'draft-js'

import {inlineStyles} from '../draftjs/styles'

class BioEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty()
    }
  }

  onChange = (editorState) => {
    this.setState({
      editorState
    })
  }

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  handleStyleButton = (event) => {
    let name = event.target.name
    console.log("name", name)
    this.onChange(RichUtils.toggleInlineStyle(this.state.editor, 'BOLD'))
  }

  handleInlineStyle = (event) => {
    let style = event.target.name
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, style)
    )
  }




  render() {
    return (
      <div className='bio-editor-container'>
        <div className='editor-menu'>

        {inlineStyles.map((s) => {
          return <button onClick={this.handleInlineStyle} name={s.style} key={s.buttonId}>{s.style[0]}</button>
        })}

        </div>

        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange = {this.onChange}
          />
      </div>
    )
  }
}

export default BioEditor
