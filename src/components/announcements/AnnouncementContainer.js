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

  render() {
    return (
      <div className="update-container-page">
        <div className='page-header'>
          Announcements
        </div>

        {!! this.props.announcements &&
          <AnnouncementList announcements={this.props.announcements} />
        }

        <DisplayedItem createAnnouncementAction = {this.props.createAnnouncementAction} updateAnnouncementAction = {this.props.updateAnnouncementAction} item={this.state.displayedItem} />
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
