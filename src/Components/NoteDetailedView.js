import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import NotefulContext from "../NotefulContext";
import './noteItem.css'

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
      <div className="main__note-item detailed" key={note.id}>
        <div className="flex">
        <div className="leftSide">
        <p className="itemName">{note.name}</p>
        <p>{newDate.toDateString()}</p>
        </div>
        <div className="rightSide">
        <Link to="/">
          <button
            type="button"
            onClick={() => deleteNoteRequest(note.id, this.context.deleteNote)}
          >
            Delete note
          </button>
        </Link>
        </div>
        </div>
        <p className="noteDescription">{note.content}</p>
      </div>
    );
  }
}

export default withRouter(NoteDetailedView);
