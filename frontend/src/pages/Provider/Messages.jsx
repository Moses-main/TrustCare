import React, { useState, useEffect } from 'react';
import { FaSearch, FaPaperPlane, FaPaperclip, FaUserMd, FaUserCircle } from 'react-icons/fa';
import { format } from 'date-fns';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Mock data - replace with API calls in production
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        // TODO: Replace with actual API call
        const mockConversations = [
          {
            id: 1,
            participant: {
              id: 101,
              name: 'Dr. Sarah Johnson',
              role: 'Cardiologist',
              avatar: null,
            },
            lastMessage: 'Your test results look good. Let me know if you have any questions!',
            lastMessageTime: '2023-06-14T14:30:00',
            unread: 2,
          },
          {
            id: 2,
            participant: {
              id: 102,
              name: 'Dr. Michael Chen',
              role: 'Dermatologist',
              avatar: null,
            },
            lastMessage: 'Please schedule a follow-up appointment to discuss your treatment options.',
            lastMessageTime: '2023-06-12T09:15:00',
            unread: 0,
          },
          {
            id: 3,
            participant: {
              id: 103,
              name: 'Nurse Practitioner Emily Wilson',
              role: 'Primary Care',
              avatar: null,
            },
            lastMessage: 'Just checking in to see how you\'re feeling after starting the new medication.',
            lastMessageTime: '2023-06-10T16:45:00',
            unread: 0,
          },
        ];

        setConversations(mockConversations);
        setSelectedConversation(mockConversations[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching conversations:', error);
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // In a real app, this would send the message to your backend
    console.log('Sending message:', newMessage);
    
    // For demo purposes, just clear the input
    setNewMessage('');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow overflow-hidden">
      <div className="border-b border-gray-200 px-4 py-4 sm:px-6">
        <h2 className="text-lg font-medium text-gray-900">Messages</h2>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with conversations */}
        <div className="w-full md:w-1/3 border-r border-gray-200 bg-gray-50 flex flex-col">
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No conversations found
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {filteredConversations.map((conversation) => (
                  <li 
                    key={conversation.id}
                    className={`px-4 py-4 hover:bg-gray-100 cursor-pointer ${
                      selectedConversation?.id === conversation.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {conversation.participant.avatar ? (
                          <img 
                            className="h-10 w-10 rounded-full" 
                            src={conversation.participant.avatar} 
                            alt={conversation.participant.name} 
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <FaUserMd className="h-5 w-5 text-blue-600" />
                          </div>
                        )}
                      </div>
                      <div className="ml-3 flex-1 min-w-0">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {conversation.participant.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {format(new Date(conversation.lastMessageTime), 'MMM d')}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm text-gray-600 truncate">
                            {conversation.lastMessage}
                          </p>
                          {conversation.unread > 0 && (
                            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {conversation.unread}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">
                          {conversation.participant.role}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        {/* Main chat area */}
        <div className="hidden md:flex flex-col flex-1">
          {selectedConversation ? (
            <>
              <div className="flex items-center p-4 border-b border-gray-200">
                <div className="flex-shrink-0">
                  {selectedConversation.participant.avatar ? (
                    <img 
                      className="h-10 w-10 rounded-full" 
                      src={selectedConversation.participant.avatar} 
                      alt={selectedConversation.participant.name} 
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <FaUserMd className="h-5 w-5 text-blue-600" />
                    </div>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {selectedConversation.participant.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {selectedConversation.participant.role}
                  </p>
                </div>
                <div className="ml-auto">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    View Profile
                  </button>
                </div>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                <div className="space-y-4">
                  {/* Sample messages - replace with actual messages from the conversation */}
                  <div className="flex justify-end">
                    <div className="max-w-xs md:max-w-md lg:max-w-lg bg-blue-100 rounded-lg p-3">
                      <p className="text-sm text-gray-800">
                        Hi Dr. Johnson, I was wondering about my recent test results?
                      </p>
                      <p className="text-xs text-gray-500 text-right mt-1">
                        {format(new Date(), 'MMM d, h:mm a')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="max-w-xs md:max-w-md lg:max-w-lg bg-white border border-gray-200 rounded-lg p-3">
                      <p className="text-sm text-gray-800">
                        Hello! Your test results look good overall. All values are within normal ranges. 
                        I've reviewed your cholesterol levels, and they've improved since your last checkup.
                      </p>
                      <p className="text-xs text-gray-500 text-right mt-1">
                        {format(new Date(selectedConversation.lastMessageTime), 'MMM d, h:mm a')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="max-w-xs md:max-w-md lg:max-w-lg bg-white border border-gray-200 rounded-lg p-3">
                      <p className="text-sm text-gray-800">
                        {selectedConversation.lastMessage}
                      </p>
                      <p className="text-xs text-gray-500 text-right mt-1">
                        {format(new Date(selectedConversation.lastMessageTime), 'MMM d, h:mm a')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 p-4">
                <form onSubmit={handleSendMessage} className="flex">
                  <div className="flex-1">
                    <div className="flex rounded-md shadow-sm">
                      <div className="relative flex-grow focus-within:z-10">
                        <input
                          type="text"
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full rounded-none rounded-l-md pl-4 sm:text-sm border-gray-300"
                          placeholder="Type a message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                        />
                      </div>
                      <button
                        type="button"
                        className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <FaPaperclip className="h-5 w-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                  <div className="ml-3">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FaPaperPlane className="h-4 w-4 mr-2" />
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <FaUserCircle className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No conversation selected</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Select a conversation from the sidebar or start a new one.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
