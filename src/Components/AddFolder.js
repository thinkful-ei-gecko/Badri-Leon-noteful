import React from 'react'
import NotefulContext from '../NotefulContext'
import Button from "@material-ui/core/Button";

export default class AddFolder extends React.Component {

    static contextType = NotefulContext;
    
    constructor(props) {
        super(props);
        this.state = {
          folderName: ''     
        }
    }

    handleAddFolderSubmit = (event) => {
        event.preventDefault();
        if (this.state.folderName.trim().length > 3) {
            const folderName = this.state.folderName;
            console.log(this.props);
            this.context.postAPI(folderName);
        }
        else {
            alert('Please enter a longer string')
        }
    }

    updateFolderName(folderName) {
        this.setState({folderName});
    }

    render() {
        return (
            <form className='add-folder' onSubmit={(e) => this.handleAddFolderSubmit(e)}>
                <label htmlFor='addFolder'>Folder name:</label>
                <input type='text' id='addFolder' name='addFolder'
                        onChange={e => this.updateFolderName(e.target.value)}
                        required></input>
                <Button variant="contained" color="primary" type='submit'>Add Folder</Button>
                <Button variant="contained" color="primary" type='button' onClick={() => this.props.history.goBack()}>Go back</Button>
            </form>
        )
    }
}