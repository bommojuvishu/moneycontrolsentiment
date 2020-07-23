import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Apicall.css';

export class Apicall extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
           students: [
              { id: 1, name: 'Wasif', age: 21, email: 'wasif@email.com' },
              { id: 2, name: 'Ali', age: 19, email: 'ali@email.com' },
              { id: 3, name: 'Saad', age: 16, email: 'saad@email.com' },
              { id: 4, name: 'Asad', age: 25, email: 'asad@email.com' }
           ],
           news: []
        }
     }

    componentDidMount() {
        console.log("inside the mount")
        
        setInterval(async () => {
            fetch('https://www.hitechadda.com/stockssentiment')
            .then(res => res.json())
            .then((data) => {
              this.setState({ news: data })
              console.log(this.state)
            }).catch(console.log)
        }, 120000);
        
      }

      renderTableData() {
        return this.state.news.map((tmp, index) => {
           const { News , Sentiment } = tmp //destructuring
           return (
              <tr>
                 <td>{News}</td>
                 <td>{Sentiment}</td>
              
              </tr>
           )
        })
     }

    render() {
        return (
            <div className="container day dark-scheme"> 
          <h1 id='title'>React Dynamic Table</h1>
            <table  style ={{width:'50%'}} id='moneycontrol_table' className="table table-bordered">
            <thead>
      <tr>
        <th>News</th>
        <th>Sentiment</th>
       
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
