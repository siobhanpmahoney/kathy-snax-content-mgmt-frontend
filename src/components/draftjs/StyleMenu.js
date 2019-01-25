import React from 'react'
import { EditorState, Editor, RichUtils, AtomicBlockUtils } from "draft-js";
import InlineStyles from './InlineStyles'
import BlockStyles from './BlockStyles'
import HeadingOptions from './HeadingOptions'
import LinkInput from './LinkInput'
import StyleButton from './StyleButton'

const StyleMenu = (props) => {
  return (
    <div className='style-menu-container'>
      <button onClick={props.onSubmitEdits} className="RichEditor-styleButton inline styleButton">Save</button>
      <HeadingOptions editorState={props.editorState} onToggle={props.toggleBlockType} />
      <InlineStyles editorState={props.editorState} onToggle={props.toggleInlineStyle} promptForLink={props.promptForLink} removeLink={props.removeLink} />

    <BlockStyles editorState={props.editorState} onToggle={props.toggleBlockType}/>

  <LinkInput editorState={props.editorState} showURLInput={props.showURLInput} promptForLink={props.promptForLink} removeLink={props.removeLink} confirmLink={props.confirmLink} urlValue={props.urlValue} onURLChange={props.onURLChange}/>



</div>

  )
};

export default StyleMenu
