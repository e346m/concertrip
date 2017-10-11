import React from 'react'
import gql from 'graphql-tag'
import { withApollo } from 'react-apollo'
import PropTypes from 'prop-types'
import Room from './room'

export const RoomQuery = gql`
  query RoomQuery($name: String!) {
    room(name: $name) {
      name
      id
      whiteboard {
        id
        stickers {
          id
          title
          url
        }
      }
    }
  }
`
const createRoom = gql`
  mutation createRoom($name: String!) {
    rooms(name: $name){
      name
      id
      whiteboard {
        id
        stickers {
          id
          title
          url
        }
      }
    }
  }
`

class FetchOrCreateRoom extends React.PureComponent {
  state = {
    obj: '',
    loading: true,
    error: '',
  }
  componentWillMount() {
    this.props.client.query({
      query: RoomQuery,
      variables: { name: this.props.match.params.name },
    }).then((obj) => {
      this.setState({ obj: obj.data.room, loading: false })
    }).catch(() => {
      this.props.client.mutate({
        mutation: createRoom,
        variables: { name: this.props.match.params.name },
      }).then((obj)=> {
        this.setState({ obj: obj.data.rooms, loading: false })
      }).catch((error) => {
        console.log(error) // replace somthing error page
      })
    })
  }
  render() {
    if (this.state.loading) {
      return (<div>Loading</div>)
    }
    return (
      <Room room={this.state.obj} />
    )
  }
}

FetchOrCreateRoom.propTypes = {
  client: PropTypes.shape({
    query: PropTypes.func,
    mutate: PropTypes.func,
  }).isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.String,
    }),
  }).isRequired,
}

export default withApollo(FetchOrCreateRoom)
