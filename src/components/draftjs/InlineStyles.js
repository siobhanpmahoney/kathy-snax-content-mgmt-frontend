import React from "react";
import { EditorState, Editor, RichUtils, AtomicBlockUtils } from "draft-js";
import StyleButton from "./StyleButton";


export const INLINE_HEADINGS = [
  { label: "U", style: "UNDERLINE"},
  { label: "I", style: "ITALIC" },
  { label: "B", style: "BOLD" },
]

const InlineStyles = props => {
	const { editorState, onToggle, contentState } = props;
  const key = editorState.getSelection().getStartKey();
  const sty = editorState.getCurrentInlineStyle()
  let announcementstate = RichUtils.toggleInlineStyle(editorState, sty)

	return (
		<span className="RichEditor-controls">


			{INLINE_HEADINGS.map(type => (
				<StyleButton
					key={type.label}
					active={sty.has(type.style)}
					label={type.label}
					onToggle={props.onToggle}
					style={type.style}
          className="inline styleButton"
          id={type.style.toLowerCase()}
				/>
			))}

		</span>
	);
};

export default InlineStyles
