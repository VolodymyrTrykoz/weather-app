import React, {Component} from 'react';
import {getRequest} from '../actions/index';
import {connect} from 'react-redux';

class SearchBar extends Component {
    state = {
        inputValue: ''
    }

    handleChange = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {getRequest} = this.props;
        const {inputValue} = this.state;
        getRequest(inputValue)
            .then(()=>{
                this.setState({
                    inputValue: ''
                })
            })
    }
    
    render(){
        const {inputValue} = this.state;
        return (
            <form className="input-group" onSubmit={this.handleSubmit}>
                <input 
                    value = {inputValue} 
                    onChange={this.handleChange}
                    placeholder='type a city to watch its weather'
                    className="form-control"
                />
                <span className="input-group-btn">
                    <button 
                        type="submit" 
                        className="btn btn-primary">
                            Submit
                    </button>
                </span>
            </form>
        )
    }
}

export default connect(null, {getRequest})(SearchBar);
