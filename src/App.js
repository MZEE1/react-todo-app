import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.addNote = this.addNote.bind(this)
    this.deleteNote = this.deleteNote.bind(this)
    this.state = {
      notes: []
    }
  }

  addNote(note) {
    this.setState( (prevState) => {
      return {
        notes: prevState.notes.concat(note)
      }
    })
  }

  deleteNote(noteToDelete) {
    this.setState( (prevState) => {
        return {
          notes: prevState.notes.filter( (note) => {
            return noteToDelete !== note
          })
      }
    })
  }

  componentDidMount() {
    const json = localStorage.getItem('notes')
    const notes = JSON.parse(json)

    if (notes) {
      this.setState( () => ( { notes } ))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.notes.length !== this.state.notes.length) {
      const json = JSON.stringify(this.state.notes)
      localStorage.setItem('notes', json)
    }
  }

  render() {
    const title = 'Todo App'
    const subtitle = 'Plan your daily goals '
    return (
      <div className="main-container">
        <Header title={title} subtitle={subtitle}/>
        <div className="container">
          <Notes 
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          />
          <AddNotes addNote={this.addNote}/>
        </div>
      </div>
    )
  }
}

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <h1 className="header-title">{this.props.title}</h1>
        <h2 className="header-subtitle">{this.props.subtitle}</h2>
      </div>
    )
  }
}

class Notes extends React.Component {
  render() {
    return (
      <div className="notes">
        {this.props.notes.map( (note) => (
          <Note key={note} 
          noteText={note}
          deleteNote={this.props.deleteNote}
          />)
          )}
        
      </div>
    )
  }
}

class Note extends React.Component {
  render() {
    return (
      <div className="note">
        {this.props.noteText}
        <button className="delete-button" onClick={ (e) => {
          this.props.deleteNote(this.props.noteText)
        }}>
        Delete
        </button>
      </div>
    )
  }
}

class AddNotes extends React.Component {
  constructor(props) {
    super(props)
    this.addNote = this.addNote.bind(this)
  }
  addNote(e) {
    e.preventDefault()
    const note = e.target.elements.notes.value.trim()
    
    if(note){
      this.props.addNote(note)
      e.target.elements.notes.value = ''
    }
  }
  render() {
    return (
      <div>
        <form className="form" onSubmit={this.addNote}>
          <input type="text" name="notes" placeholder="Add Todo" className="todo-text"/>
          <button className="todo-button">Add Todo</button>
        </form>
      </div>
    )
  }
}

export default App;
