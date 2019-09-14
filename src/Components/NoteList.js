import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import NoteItem from "./NoteItem";
import NotefulContext from "../NotefulContext";
import ErrorBoundary from './ErrorBoundary'

class NoteList extends Component {
  static contextType = NotefulContext;

  render() {
    let { notes } = this.context;
    const { match, location } = this.props;

    notes = location.pathname.length !== 1
        ? notes.filter(note => note.folderId === match.params.folderId)
        : notes;

    return (
      <>
        <li className="main__note-list">
          {notes.map(note => <ErrorBoundary selection='note' key={note.id + 'eb'}><NoteItem note={note} key={note.id} /></ErrorBoundary>)}
        </li>
        <Link to='/add-note'><button type='button'>Add New Note</button></Link>
      </>
    )
  }
}

export default withRouter(NoteList);