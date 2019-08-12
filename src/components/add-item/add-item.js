import React, {Component} from 'react';

import './add-item.css';

export default class AddItem extends Component {

    state = {
        label: ''
    }

   onlabelChange = (e)=> {
        this.setState({
            label: e.target.value});
   };

   onSubmit = (e) => {
        e.preventDefault();
        this.props.onAdded(this.state.label);
        this.setState({
            label: ''
        });
   };

    render() {

        return (
            <form className="add-item d-flex"
                    onSubmit={this.onSubmit}>
                <input type="text"
                        className="form-control"
                        onChange={this.onlabelChange}
                        placeholder="what needs to be done" 
                        value={this.state.label}
                        />

                <button 
                    className="btn btn-outline-secondary">
                    Add Item 
                </button>
            </form>
        );
    };
}