import React from 'react'
import NotefulContext from '../NotefulContext'

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
        const folderName = this.state;
        this.context.postAPI(folderName);
    }

    updateFolderName(folderName) {
        this.setState({folderName: {value: folderName}});
    }

    render() {
        
        return (
            <form className='add-folder' onSubmit={(e) => this.handleAddFolderSubmit(e)}>
                <label for='addFolder'>Folder name:</label>
                <input type='text' id='addFolder' name='addFolder'
                        onChange={e => this.updateFolderName(e.target.value)}></input>
                <button type='submit'>Add Folder</button>
                <button type='button' onClick={() => this.props.history.goBack()}>Go back</button>
            </form>
        )
    }
}