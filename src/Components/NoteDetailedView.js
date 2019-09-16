import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import NotefulContext from "../NotefulContext";
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types';

function deleteNoteRequest(noteId, callback) {
  fetch(`http://localhost:9090/notes/${noteId}`, {
    method: "DELETE"
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => {
          throw error;
        });
      }
      return res.json();
    })
    .then(data => {
      callback(noteId);
    })
    .catch(error => {
      console.error(error);
    });
}

class NoteDetailedView extends Component {
  static contextType = NotefulContext;

  render() {
    const { notes } = this.context;
    const { match } = this.props;
    const note = notes.find(note => note.id === match.params.noteId) || {} ;
    const newDate = new Date(note.modified);

    return (
      <div className="main__note-detailed-view" key={note.id}>
        <p>{note.name}</p>
        <p>{newDate.toDateString()}</p>
        <Link to="/">
        <Button variant="contained" color="primary"
            type="button"
            onClick={() => deleteNoteRequest(note.id, this.context.deleteNote)}
          >
            Delete note
          </Button>
        </Link>
        <p>{note.content}</p>
      </div>
    );
  }
}


NoteDetailedView.propTypes = {
  match: PropTypes.object.isRequired
};

export default withRouter(NoteDetailedView);
