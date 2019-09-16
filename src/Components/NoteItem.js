import React, { Component } from "react";
import NotefulContext from "../NotefulContext";
import './noteItem.css'
import PropTypes from 'prop-types'

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

export default class NoteItem extends Component {
  static contextType = NotefulContext;

  render() {
    const { id, name, modified } = this.props.note;
    const date = new Date(modified);

    return (
      <div className="main__note-item" key={id}>
        <div className="leftSide">
          <p className="itemName">{name}</p>
          <p>{date.toDateString()}</p>
        </div>
        <div className="rightSide">
          <button type="button" onClick={() => deleteNoteRequest(id, this.context.deleteNote)}>
            Delete note
          </button>
        </div>
      </div>
    );
  }
}

NoteItem.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    modified: PropTypes.string,
    folderId: PropTypes.string,
    content: PropTypes.string
  })
};

NoteItem.defaultProps = {
  note: {}
}