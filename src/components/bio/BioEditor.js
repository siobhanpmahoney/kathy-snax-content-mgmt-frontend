import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {loadBio, updateBio} from '../../actions'
import {convertToRaw, convertFromRaw, CompositeDecorator, Editor, EditorState, RichUtils} from 'draft-js'
import StyleMenu from '../draftjs/StyleMenu'
//
class BioEditor extends React.Component {

  constructor(props) {
    super(props);
      const decorator = new CompositeDecorator([{strategy: findLinkEntities, component: Link}])

    this.state = {
      editorState: EditorState.createEmpty(),
      showURLInput: false,
      urlValue: ""
    }

    this.focus = () => this.refs.editor.focus();
    this.onChange = editorState => this.setState({ editorState });
    this.promptForLink = this._promptForLink.bind(this);
    this.onURLChange = this._onURLChange.bind(this)
    this.confirmLink = this._confirmLink.bind(this);
    this.onLinkInputKeyDown = this._onLinkInputKeyDown.bind(this);
    this.removeLink = this._removeLink.bind(this);
    this.onSubmitEdits = this._onSubmitEdits.bind(this)

  }



  componentDidMount() {
    this.props.loadBio()
    if (this.props.bio.content) {
      this.setState({
       editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.bio.content)))
      })
    }


 }

 componentDidUpdate(prevProps, prevState) {
  if (prevProps.bio.content != this.props.bio.content) {
    let bio = this.props.bio
    const decorator = new CompositeDecorator([{strategy: findLinkEntities, component: Link}])
   this.setState({
     editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(bio.content)), decorator)
   })
  }
 }

  _onURLChange(e) {
    let val = e.target.value
    this.setState({ urlValue: val });
  }

  _promptForLink(e) {
    e.preventDefault();

    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
      let url = "";
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }
      this.setState({
          showURLInput: true,
          urlValue: url
        });
    }
  }

  _confirmLink(e) {
    e.preventDefault();
    const { editorState, urlValue } = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity("LINK", "MUTABLE", { url: urlValue })
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {currentContent: contentStateWithEntity});
    this.setState({
      editorState: RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey),
      showURLInput: false,
      urlValue: ""
    },() => setTimeout(() => this.refs.editor.focus(), 0));
  }

  _onLinkInputKeyDown(e) {
    if (e.which === 13) {
      this._confirmLink(e);
    }
  }

  _removeLink(e) {
    e.preventDefault();
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.setState({
        editorState: RichUtils.toggleLink(editorState, selection, null)
      });
    }
  }


  onChange = (editorState) => {
    if (editorState.getDecorator() !== null) {
      this.setState({
        editorState,
      });
    }
  }

  _onSubmitEdits = () => {
    let contentState = this.state.editorState.getCurrentContent()
    let bio = {content: convertToRaw(contentState)}
    bio["content"] = JSON.stringify(bio.content)
    this.props.updateBio(bio.content)
  }




  handleKeyCommand = (command) => {
    const announcementstate = RichUtils.handleKeyCommand(this.state.editorState, command)
    if (announcementstate) {
      this.onChange(announcementstate);
      return 'handled';
    }
    return 'not-handled';
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

          <StyleMenu
            editorState={this.state.editorState}
            showURLInput={this.state.showURLInput}
            toggleInlineStyle={this.toggleInlineStyle}
            toggleBlockType={this.toggleBlockType}
            promptForLink={this.promptForLink} removeLink={this.removeLink}
            confirmLink={this.confirmLink}
            urlValue={this.state.urlValue}
            onURLChange = {this.onURLChange}
            onSubmitEdits = {this.onSubmitEdits}
            />


        </div>


        <div className='editor-wrapper' onClick={this.focus}>
          <Editor
            className="editor"
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange = {this.onChange}
            ref="editor"
            />
        </div>
      </div>
    )
  }
}



function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
}

const Link = props => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  console.log(url)
  return (
    <a href={url}>
      {props.children}
    </a>
  );
};

function mapStateToProps(state, props) {
  return {
    bio: state.bio
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({loadBio, updateBio}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BioEditor)
