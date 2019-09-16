import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router';
import {Link} from 'react-router-dom'
import "./App.css";
import FolderList from "./Components/FolderList";
import FolderDetailedView from "./Components/FolderDetailedView";
import NoteList from "./Components/NoteList";
import NoteDetailedView from "./Components/NoteDetailedView";
import NotFound from "./Components/NotFound";
import AddFolder from './Components/AddFolder';
import AddNote from './Components/AddNote'
import NotefulContext from "./NotefulContext";
import ErrorBoundary from './Components/ErrorBoundary'
import PropTypes from 'prop-types'


class App extends Component {
  static contextType = NotefulContext;

  constructor(props) {
    super(props);

    this.state = {
      folders: [],
      notes: []
    };
  }

  handleDeleteNote = noteId => {
    const newNotes = this.state.notes.filter(note => note.id !== noteId);
    this.setState({
      notes: newNotes
    },this.props.history.push('/'));
  };

  postAPI = (folderName) => {
    let jsonString = {name: folderName}
    let stringified = JSON.stringify(jsonString);
    fetch(`http://localhost:9090/folders`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: stringified
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      this.setState({
        folders: [...this.state.folders, data]
      }, this.goToHome());
    })
    .catch(error => alert(error));
  }

  postNoteAPI = (noteName, noteContent, noteFolder) => {
    let jsonString = {name: noteName,
                      content: noteContent,
                      folderId: noteFolder,
                      modified: new Date().toISOString()}
    let stringified = JSON.stringify(jsonString);
    fetch(`http://localhost:9090/notes`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: stringified
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      this.setState({
        notes: [...this.state.notes, data]
      }, this.goToHome());
    })
    .catch(error => alert(error));
  }

  goToHome () {
    this.props.history.goBack()
  }

  getFolders() {
    fetch(`http://localhost:9090/folders`, {
      method: "GET"
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(data => {
        this.setState({
          folders: data
        });
      })
      .catch(error => alert(error));
  }

  getNotes() {
    fetch(`http://localhost:9090/notes`, {
      method: "GET"
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(data => {
        this.setState({
          notes: data
        });
      })
      .catch(error => alert(error));
  }

  componentDidMount() {
    this.getNotes();
    this.getFolders();
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.handleDeleteNote,
      postAPI: this.postAPI,
      postNoteAPI: this.postNoteAPI
    };

    return (
      <div className="app">
        <Link to ='/' className="header"><h1>Noteful</h1></Link>
        <NotefulContext.Provider value={contextValue}>
        <ErrorBoundary selection='sidebar'>
          <section className="sidebar">
            <Switch>
              <Route exact path="/" component={FolderList} />
              <Route path="/folder/:folderId" component={FolderList} />
              <Route path="/note/:noteId" component={FolderDetailedView} />
              <Route path='/add-folder' component={FolderList} />
              <Route path="/add-note" component={FolderList} />
              <Route component={NotFound} />
            </Switch>
          </section>
          </ErrorBoundary>
          <ErrorBoundary selection='content'>
          <main className="main">
            <Switch>
              <Route exact path="/" component={NoteList} />
              <Route path="/folder/:folderId" component={NoteList} />
              <Route path="/note/:noteId" component={NoteDetailedView} />
              <Route path="/add-folder" component={AddFolder} />
              <Route path="/add-note" component={AddNote} />
              <Route component={NotFound} />
            </Switch>
          </main>
          </ErrorBoundary>
        </NotefulContext.Provider>
      </div>
    );
  }
}

export default withRouter(App)

NotefulContext.Provider.propTypes = {
  value : PropTypes.shape({
    folders: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string
    })).isRequired,
    notes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      modified: PropTypes.string,
      folderId: PropTypes.string,
      content: PropTypes.string

    })).isRequired,
    deleteNote: PropTypes.func.isRequired,
    postAPI: PropTypes.func.isRequired,
    postNoteAPI: PropTypes.func.isRequired
  })
}

NotefulContext.Provider.defaultProps = {
  value : {
    folders: [],
    notes: [],
    deleteNote: () => {},
    postAPI: () => {},
    postNoteAPI: () => {}
  }
}
