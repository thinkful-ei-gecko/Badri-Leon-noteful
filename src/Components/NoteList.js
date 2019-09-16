import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import NoteItem from "./NoteItem";
import NotefulContext from "../NotefulContext";
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types';

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
          {notes.map(note => <NoteItem note={note} key={note.id} />)}
        </li>
        <Link to='/add-note'><Button variant="contained" color="primary"type='button'>Add New Note</Button></Link>
      </>
    )
  }
}

export default withRouter(NoteList);

NoteList.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}
