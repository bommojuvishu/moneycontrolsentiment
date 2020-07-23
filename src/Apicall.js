import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Apicall.css';

export class Apicall extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
           news: []
        }
     }

    componentDidMount() {
        console.log("inside the mount")
        this.getstocksentiment()
        setInterval(async () => {
            this.getstocksentiment()
        }, 120000);
        
      }

      getstocksentiment(){

        fetch('https://www.hitechadda.com/stockssentiment')
        .then(res => res.json())
        .then((data) => {
          this.setState({ news: data })
          console.log(this.state)
        }).catch(console.log)
      }

      renderTableData() {
        return this.state.news.map((tmp, index) => {
           const { Date ,News , Sentiment ,links} = tmp //destructuring
           return (
              <tr>
                 <td> <a href={links} >{News}</a>  </td>
                 <td>{Sentiment}</td>
                 <td>{Date}</td>
              </tr>
           )
        })
     }

    render() {
        return (
            <div className="container day dark-scheme"> 
          <h1 id='title'>Money Control Stocks</h1>
            <table  style ={{width:'75%'}} id='moneycontrol_table' className="table table-bordered">
            <thead>
      <tr>
        <th>News</th>
        <th>Sentiment</th>
        <th>Date</th>
      </tr>
    </thead>
               <tbody>
                  {this.renderTableData()}
               </tbody>
            </table>
          </div>
           
        )
    }
}

export default Apicall
