import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Nifty50 extends Component {
    constructor(props) {
        super(props) 
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

        fetch('https://www.hitechadda.com/nifty50')
        .then(res => res.json())
        .then((data) => {
          this.setState({ news: data })
          console.log("Inside nifty ",this.state)
        }).catch(function(error) {                        // catch
            console.log('Request failed', error);
          })
      }


    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Nifty50
