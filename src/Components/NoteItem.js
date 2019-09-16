import React, { Component } from "react";
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

export default class NoteItem extends Component {
  static contextType = NotefulContext;

  render() {
    const { id, name, modified } = this.props.note;
    const date = new Date(modified);
    return (
      <div className="main__note-item" key={id}>
        <Link to={`/note/${id}`}>
          <p>{name}</p>
        </Link>
        <p>{date.toDateString()}</p>
        <Button variant="contained" color="primary"
          type="button"
          onClick={() => deleteNoteRequest(id, this.context.deleteNote)}
        >
          Delete note
        </Button>
      </div>
    );
  }
}


NoteItem.propTypes = {
  name: PropTypes.object.isRequired
};

NoteItem.propTypes = {
  name: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired
  })
};



