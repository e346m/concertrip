import React from 'react'
import PropTypes from 'prop-types'
import Whiteboard from './whiteboard'

export default class Room extends React.PureComponent {
  render() {
    const { room } = this.props
    return (
      <div>
        <div>
          there are {room.length} whiteboard in your room
        </div>
        <div>
          <Whiteboard key={room.id} room={room} />
        </div>
      </div>
    )
  }
}

Room.propTypes = {
  room: PropTypes.shape({}).isRequired,
}
