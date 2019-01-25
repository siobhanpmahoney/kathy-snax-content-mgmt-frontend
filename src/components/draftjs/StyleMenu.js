import React from 'react'
import { EditorState, Editor, RichUtils, AtomicBlockUtils } from "draft-js";
import InlineStyles from './InlineStyles'
import BlockStyles from './BlockStyles'
import HeadingOptions from './HeadingOptions'

// class StyleMenu extends React.Component {
//   render() {
//     return (
//       <div className='style-menu'>
//         {inlineStyles.map((s) => {
//           return <button key = {s.buttonId} name={s.style} onClick={this.props.handleStyleButton}>
//             {s.style[0]}
//           </button>
//         })}
//       </div>
//     )
//   }
// }
//
// export default StyleMenu

const StyleMenu = (props) => {
  return (
    <div className='style-menu-container'>
      <HeadingOptions editorState={props.editorState} onToggle={props.toggleBlockType} />
      <InlineStyles editorState={props.editorState} onToggle={props.toggleInlineStyle}/>
      <BlockStyles editorState={props.editorState} onToggle={props.toggleBlockType}/>
    </div>
  )
};

export default StyleMenu
