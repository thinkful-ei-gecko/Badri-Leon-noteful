import React, { Component } from 'react';
import { withRouter } from "react-router";
import NotefulContext from "../NotefulContext";
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types';

class FolderDetailedView extends Component {
  static contextType = NotefulContext;

  render() {
    const { folders, notes } = this.context || {};
    const { match, history } = this.props || {};

    if (!folders || !notes) {
      return 'loading';
    }

    const folder = folders.find(folder =>
      folder.id === notes.find(note => note.id === match.params.noteId).folderId
    );

    if (!folder) {
      return 'loading';
    }

    
    return (
      <div className='sidebar__folder-detailed-view'>
        <Button variant="contained" color="primary" type="button" onClick={() => history.goBack()}>Go back</Button>
        <h2>{folder.name}</h2>
      </div>
    )
  }
}


FolderDetailedView.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(FolderDetailedView);