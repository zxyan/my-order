import React, { Component } from 'react'

import './style.css'

class OrderItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      stars: props.data.stars || 0,
      comment: props.data.comment || ''
    }
  }

  handleOpenEditArea = () => {
    this.setState({
      editing: true
    })
  }

  handleCommentChange = e => {
    this.setState({
      comment: e.target.value
    })
  }

  handleClickStars = stars => {
    this.setState({
      stars: stars
    })
  }

  handleCancelComment = () => {
    this.setState({
      editing: false,
      stars: this.props.data.stars || 0,
      comment: this.props.data.comment || ''
    })
  }

  handleSubmitComment = () => {
    const { id } = this.props.data
    const { comment, stars } = this.state
    this.setState({
      editing: false
    })
    this.props.onSubmit(id, comment, stars)
  }

  render() {
    const { product, shop, price, picture, ifCommented } = this.props.data
    return (
      <div className="orderItem">
        <div className="orderItem__info">
          <div className="orderItem__picContainer">
            <img src={picture} className="orderItem__pic" alt="" />
          </div>
          <div className="orderItem__content">
            <p className="orderItem__product">{product}</p>
            <p className="orderItem__shop">{shop}</p>
            <div className="orderItem__detail">
              <p className="orderItem__price">{price}</p>
              {ifCommented ? (
                <button className="orderItem__btn orderItem__btn--gray">
                  已评价
                </button>
              ) : (
                <button
                  className="orderItem__btn orderItem__btn--red"
                  onClick={this.handleOpenEditArea}
                >
                  评价
                </button>
              )}
            </div>
          </div>
        </div>
        {this.state.editing ? this.renderEditArea() : null}
      </div>
    )
  }

  renderEditArea() {
    return (
      <div className="orderItem__commentContainer">
        <textarea
          className="orderItem__comment"
          value={this.state.comment}
          onChange={this.handleCommentChange}
        />
        {this.renderStars()}
        <button
          className="orderItem__btn orderItem__btn--red"
          onClick={this.handleSubmitComment}
        >
          提交
        </button>
        <button
          className="orderItem__btn orderItem__btn--gray"
          onClick={this.handleCancelComment}
        >
          取消
        </button>
      </div>
    )
  }

  renderStars() {
    const { stars } = this.state
    return (
      <div>
        {[1, 2, 3, 4, 5].map((item, index) => {
          const light =
            stars >= item ? 'orderItem__star--light' : 'orderItem__star'
          return (
            <span
              key={index}
              className={light}
              onClick={this.handleClickStars.bind(this, item)}
            >
              ★
            </span>
          )
        })}
      </div>
    )
  }
}

export default OrderItem
