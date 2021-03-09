import React from 'react';


export default class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {rows: 8, columns: 8}

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event, target) {
        this.setState({[target]: Number(event.target.value)});
    }

    handleSubmit(event) {
        this.props.submitHandler(this.state);
        event.preventDefault();
    }

    render() {
        const options = []
        for (let i = 8; i < 81; i++) {
            options.push(i);
        }
        
        return (
            <form className={'miceForm'} onSubmit={this.handleSubmit}>
                <select value={this.state.rows} onChange={(e) => this.handleChange(e, 'rows')}>
                {options.map((num) => {
                    return <option value={num} key={num + 'row'}>{num}</option>
                })}
                </select>
                x
                <select value={this.state.columns} onChange={(e) => this.handleChange(e, 'columns')}>
                {options.map((num) => {
                    return <option value={num} key={num + 'column'}>{num}</option>
                })}
                </select>
                <input className={"submitButton"} type="submit" value="New game" />
            </form>
        )    
    } 
}