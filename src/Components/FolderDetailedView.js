import React, { Component } from 'react';
import { withRouter } from "react-router";
import NotefulContext from "../NotefulContext";

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
        <button type="button" onClick={() => history.goBack()}>Go back</button>
        <h2>{folder.name}</h2>
      </div>
    )
  }
}

export default withRouter(FolderDetailedView);