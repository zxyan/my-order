import React, { Component } from 'react'
import OrderItem from '../OrderItem'

class OrderList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    fetch('/mock/orders.json').then(res => {
      if (res.ok) {
        res.json().then(data => {
          this.setState({
            data
          })
        })
      }
    })
  }

  handleSubmit = (id, comment, stars) => {
    /*
     * 应在接口请求完成后完成下列操作
     * fetch('/saveComment').then(() => { })
     */
    const newDate = this.state.data.map(item => {
      return item.id === id
        ? { ...item, comment, stars, ifCommented: true }
        : item
    })

    this.setState({
      data: newDate
    })
  }

  render() {
    return (
      <div>
        {this.state.data.map(item => {
          return (
            <OrderItem key={item.id} data={item} onSubmit={this.handleSubmit} />
          )
        })}
      </div>
    )
  }
}

export default OrderList
