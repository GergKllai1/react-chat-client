import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';
import NewConversationForm from './NewConversationForm';
import MessagesArea from './MessagesArea';
import Cable from './Cable';

export default class ConversationList extends Component {
  state = {
    conversations: [],
    activeConversation: null
  };

  componentDidMount = () => {
    fetch(`${API_ROOT}/conversations`)
    .then(res => res.json())
    .then(conversations => this.setState({conversations}));
  };

  handleClick = id => {
    this.setState({activeConversation: id});
  }

  handleReceivedMessage = response => {
    const { message } = response;
    const conversations = [...this.state.conversations];
    const conversation = conversations.find(
      conversation => conversation.id === message.conversation_id
    );
    conversation.messages = [...conversation.messages, message];
    this.setState({ conversations })
  }

  render = () => {
    const { conversation, activeConversation } = this.state;
    return (
      <div className="conversationList">
        <ActionCable 
          channel={{ channel: 'ConversationChannel' }}
          onRecieved={this.handleReceivedMessage}
        />
        {this.state.conversations.length ? (
          <Cable 
            conversations={conversations}
            handleReceivedMessage={this.handleReceivedMessage}
          />
        ) : null }
        <h2>Conversations</h2>
        <ul>{mapConversations(conversations, this.handleClick)}</ul>
        <NewConversationForm />
        {activeConversation ? (
          <MessagesArea 
            conversation={findActiveConversation(
              conversations, 
              activeConversation
            )}
          />
        ) : null }
      </div>
    )
  }
}

const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(
    conversation => conversation.id === activeConversation
  );
};

const mapConversations = (conversations, handleClick) => {
  return conversations.map(conversation => {
    return (
      <li key={conversation.id} onClick={() => handleClick(conversation.id)}>
        {conversation.title}
      </li>
    );
  });
};