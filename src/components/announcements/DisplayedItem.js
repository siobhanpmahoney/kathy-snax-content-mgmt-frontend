import React from 'react'
import AnnouncementEditor from './AnnouncementEditor'

class DisplayedItem extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      headline: "",
      img_link: "",
      audio_link: "",
      embed_link: "",
      video_link: "",
      content: "",
    }

  }



  componentDidMount() {
    if (!!this.props.item && this.props.item != "new") {
      const announcement = this.props.item
      this.setState({
        headline: announcement.headline || "",
        img_link: announcement.img_link || "",
        audio_link: announcement.audio_link || "",
        embed_link: announcement.embed_link || "",
        content: announcement.content || ""
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.item != this.props.item) {
      if (!!this.props.item && this.props.item != "new") {
        const announcement = this.props.item
        this.setState({
          headline: announcement.headline || "",
          img_link: announcement.img_link || "",
          audio_link: announcement.audio_link || "",
          embed_link: announcement.embed_link || "",
          content: announcement.content || ""
        })
      } else {
        this.setState({
          headline: "",
          img_link: "",
          audio_link: "",
          embed_link: "",
          content: null
        })
      }
    }
  }

  handleFormUpdates = (event) => {
    let field = event.target.name
    let val = event.target.value
    this.setState({
      [field]: val
    })
  }


  handleCreateAnnouncement = () => {
    this.props.handleCreateAnnouncement(this.state)
  }

  handleUpdateAnnouncement = () => {
    let ann_state = Object.assign({}, this.state)
    console.log("ann_state", ann_state)
    ann_state["id"] = this.props.item.id
    console.log("ann_state with id", ann_state)
    this.props.handleUpdateAnnouncement(ann_state)
  }

  handleFn = () => {
    console.log(this.props.item)
    if (this.props.item == "new") {
      return this.handleCreateAnnouncement()
    } else {
      return this.handleUpdateAnnouncement()
    }
  }


  handleSaveEditorUpdates = (edits) => {
    this.setState({
      content: edits
    }, this.handleFn)

  }


  render() {
    console.log("displayedItem, this.props", this.props)
    return (
      <div className='displayed-item-wrapper'>
        <div className='item-info-form'>
          <div className='form-field-wrapper'>
            <div className='field-label'>
              Headline
            </div>
            <input type='text' value={this.state.headline} name="headline" onChange={this.handleFormUpdates} />
          </div>

          <div className='form-field-wrapper'>
            <div className='field-label'>
              Image
            </div>
            <input type='text' value={this.state.img_link} name="img_link" onChange={this.handleFormUpdates} />
          </div>


          <div className='form-field-wrapper'>
            <div className='field-label'>
              Audio
            </div>
            <input type='text' value={this.state.audio_link} name="audio_link" onChange={this.handleFormUpdates} />
          </div>

          <div className='form-field-wrapper'>
            <div className='field-label'>
              Video
            </div>
            <input type='text' value={this.state.video_link} name="video_link" onChange={this.handleFormUpdates} />
          </div>

          <div className='form-field-wrapper'>
            <div className='field-label'>
              Embed Link
            </div>
            <input type='text' value={this.state.embed_link} name="embed_link" onChange={this.handleFormUpdates} />
          </div>

        </div>

        <AnnouncementEditor announcement={this.props.item} handleSaveEditorUpdates={this.handleSaveEditorUpdates}/>
      </div>
    )
  }
}

export default DisplayedItem
