import React, {Component} from 'react';
import './calc.css';
import axios from 'axios';


// Defining a calculator component
class Calc extends Component{

    // call the constructor method
    constructor(props){
        super(props); // calling the constructor of the Super Class
        this.state = {
            input: "",
            status: "",
            message: "",
        }

        //Binding is necesssary to make 'this' work during callback
        this.handleDigit = this.handleDigit.bind(this);
        this.handleCal = this.handleCal.bind(this);
        this.handleClr = this.handleClr.bind(this);
    }

    //press digit handler
    handleDigit(e) {
        this.setState({input: this.state.input + e.target.value});
    }

    //clear operation handler
    handleClr = (e) => {
        this.setState({input: ""});
        document.getElementById('error_div').style.setProperty('display', 'none');
    }

    //calculate(=) operation handler
    handleCal = (e) => {

        axios.get('http://localhost:3001/calc',{
            params: {
                expression: this.state.input
            }
        } ).then(res => {
            this.setState({
                input: res.data.expr,
                status: res.data.status,
                message: res.data.message,
            });
            if(this.state.status === "ERROR")
                document.getElementById('error_div').style.setProperty('display', 'block');
            else
                document.getElementById('error_div').style.setProperty('display', 'none');
            console.log("The output is : " + res.data);
        })        
    }

    render(){
        return(
            <div className='container'>
                <div className='row'>
                    <div className='col-md-4 col-md-offset-4'>
                        <input type='text' id='inputField' className='form-control' value={this.state.input} />
                    </div>
                </div>
                <div id="error_div" style={{display: 'none', 'margin-top': '10px', 'padding': '5px'}} className="alert alert-danger col-md-4 col-md-offset-4">
                    {this.state.status === "ERROR" ? this.state.message : ""}
                </div>
                <br/>
                <div className='row'>
                    <div className='col-md-1 col-md-offset-4'> <button className='btn btn-info' onClick={this.handleDigit} value = '1'>1</button></div>
                    <div className='col-md-1'> <button className='btn btn-info' onClick={this.handleDigit} value = '2'>2</button></div>
                    <div className='col-md-1'> <button className='btn btn-info' onClick={this.handleDigit} value = '3'>3</button></div>
                    <div className='col-md-1'> <button className='btn btn-success' onClick={this.handleDigit} value = '+'>&#43;</button></div>
                </div>
                <br/>
                <div className='row'>
                    <div className='col-md-1 col-md-offset-4'> <button className='btn btn-info' onClick={this.handleDigit} value = '4'>4</button></div>
                    <div className='col-md-1'> <button className='btn btn-info' onClick={this.handleDigit} value = '5'>5</button></div>
                    <div className='col-md-1'> <button className='btn btn-info' onClick={this.handleDigit} value = '6'>6</button></div>
                    <div className='col-md-1'> <button className='btn btn-success' onClick={this.handleDigit} value = '-'>&minus;</button></div>
                </div>
                <br/>
                <div className='row'>
                    <div className='col-md-1 col-md-offset-4'> <button className='btn btn-info' onClick={this.handleDigit} value = '7'>7</button></div>
                    <div className='col-md-1'> <button className='btn btn-info' onClick={this.handleDigit} value = '8'>8</button></div>
                    <div className='col-md-1'> <button className='btn btn-info' onClick={this.handleDigit} value = '9'>9</button></div>
                    <div className='col-md-1'> <button className='btn btn-success' onClick={this.handleDigit} value = '*' >&times;</button></div>
                </div>
                <br/>
                <div className='row'>
                    <div className='col-md-1 col-md-offset-4'> <button className='btn btn-danger' onClick={this.handleClr} >Clr</button></div>
                    <div className='col-md-1'> <button className='btn btn-info' onClick={this.handleDigit} value = '0'>0</button></div>
                    <div className='col-md-1'> <button className='btn btn-primary' onClick={this.handleCal} value = '='>=</button></div>
                    <div className='col-md-1'> <button className='btn btn-success' onClick={this.handleDigit} value = '/'>&divide;</button></div>
                </div>
		</div>
        )
    }
}

export default Calc;