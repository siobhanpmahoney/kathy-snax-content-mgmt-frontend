import React from 'react'

import { Editor, EditorState, RichUtils } from 'draft-js'

import StyleMenu from '../draftjs/StyleMenu'

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

  handleInlineStyle = (event) => {
    let style = event.target.name
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, style)
    )
  }


  toggleInlineStyle = (style) => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style))
  }

  toggleBlockType = (blockType) => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };





  render() {
    return (
      <div className='bio-editor-container'>
        <div className='editor-menu'>

          <StyleMenu editorState={this.state.editorState} toggleInlineStyle={this.toggleInlineStyle} toggleBlockType={this.toggleBlockType} />



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
