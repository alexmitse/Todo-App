import React, {Component} from "react";

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import AddItem from '../add-item';
import './app.css';
import ItemStatusFilter from "../item-status-filter";


export default class App extends Component  {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    term: '',
    filter: 'all'  // active, all, done
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  };

  deleteItem = (id) => {
    this.setState(({todoData})=> {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx+1)];
      
      return {
        todoData: newArray
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({todoData})=> {
      const newArray = [...todoData, newItem]
      return {
        todoData: newArray
      }
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = {...oldItem, 
      [propName]: !oldItem.done};
    
      return  [
        ...arr.slice(0, idx), 
        newItem, 
        ...arr.slice(idx+1)];
  };

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
  });
  };

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
        return {
          todoData: this.toggleProperty(todoData, id, 'done')
        }
    });
  };

  onSearchChange = (term) => {
    this.setState({term});
}

search(items, term) {
  if(term.length===0) {
    return items;
  }

  return items.filter((item)=> {
    return item.label
              .toLowerCase()
              .indexOf(term.toLowerCase()) > -1;
  });
}

filter(items, filter){
  switch (filter) {
    case 'all':
      return items;
    case 'active':
      return items.filter((item)=> !item.done);
    case 'done':
      return items.filter((item)=> item.done);
  
    default:
      return items;
  }
}

onFilterChange = (filter) => {
    this.setState({filter});
}
  
  render() {

    const { todoData, term, filter } = this.state;
    const visibleItems = this.filter(
      this.search(todoData, term), filter);

    const doneCount = todoData
                    .filter((el)=>el.done).length;

    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <ItemStatusFilter 
            filter={filter}
            onFilterChange = {this.onFilterChange}
          />
          <SearchPanel 
            onSearchChange={this.onSearchChange}
          />
        </div>
        <TodoList 
          todos={visibleItems} 
          onDeleted={this.deleteItem } 
          onToggleDone={this.onToggleDone}
          onToggleImportant={this.onToggleImportant}
          />
        <AddItem 
          onAdded = {this.addItem}/>
      </div>
    );
  };
};


