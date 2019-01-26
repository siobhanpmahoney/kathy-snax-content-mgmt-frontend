import React from 'react'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {fetchAnnouncementsAction, createAnnouncementAction, updateAnnouncementAction} from '../../actions'
import AnnouncementList from './AnnouncementList'
import DisplayedItem from './DisplayedItem'

class AnnouncementContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      displayedItem: null
    }
  }

  componentDidMount() {
    this.setState({
      displayedItem: "new"
    }, this.props.fetchAnnouncementsAction)
  }

  componentDidUpdate(prevProps) {
    if (this.props.announcements.length != prevProps.announcements.length) {
      this.setState({
        displayItem: null
      }, () => this.setState({
        displayItem: "new"
      }))
    }

  }


  handleDisplayAnnouncement = (event) => {
		let target_id = event.target.id
		let selected = ""
		if (target_id != "new") {
			selected =  this.props.announcements.find((announcement) => {
				return announcement.id == target_id
			})
		} else {
			selected = "new"
		}
		this.setState({
			displayedItem: selected
		})
	}



  handleCreateAnnouncement = (data) => {
    this.props.createAnnouncementAction(data)
    .then(res => console.log(res.payload.id))
  }

  handleUpdateAnnouncement = (data) => {
    // let ann_state = Object.assign({}, this.state)
    // console.log("ann_state", ann_state)
    // ann_state["id"] = this.props.item.id
    // console.log("ann_state with id", ann_state)
    this.props.updateAnnouncementAction(data)
    .then(res => this.setState({
      displayedItem: this.props.announcements.find((a) => a.id == res.payload.id)
    }) )
    // this.setState({
    //   displayedItem: "new"
    // }, () => this.props.updateAnnouncementAction(data))
  }

  // handleFn = () => {
  //   console.log(this.props.item)
  //   if (this.state.displayedItem == "new") {
  //     return this.handleCreateAnnouncement()
  //   } else {
  //     return this.handleUpdateAnnouncement()
  //   }
  // }
  //
  //
  // handleSaveEditorUpdates = (edits) => {
  //   this.setState({
  //     content: edits
  //   }, this.handleFn)
  //
  // }


  render() {
    return (
      <div className="update-container-page">
        <div className='page-header'>
          Announcements
        </div>

        {!! this.props.announcements &&
          <AnnouncementList handleDisplayAnnouncement={this.handleDisplayAnnouncement} announcements={this.props.announcements} />
        }

        <DisplayedItem handleCreateAnnouncement = {this.handleCreateAnnouncement} handleUpdateAnnouncement = {this.handleUpdateAnnouncement} item={this.state.displayedItem} />
      </div>
    )
  }

}

function mapStateToProps(state, props) {
  return {
    announcements: state.announcements
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchAnnouncementsAction, createAnnouncementAction, updateAnnouncementAction}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnnouncementContainer))
