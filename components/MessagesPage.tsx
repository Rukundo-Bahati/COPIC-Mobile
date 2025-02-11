import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Photographer } from '@/constants/types';


interface MessagePageProps {
  photographers: Photographer;
}

const MessagesPage = ({ photographers }:MessagePageProps) => {
  const [selectedChat, setSelectedChat] = useState(null);

  const renderChat = (photographer: Photographer) => (
    <TouchableOpacity style={styles.chatItem} onPress={() => setSelectedChat(photographer.id)}>
      <Image source={{ uri: photographer.avatar }} style={styles.chatAvatar} />
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>{photographer.name}</Text>
        <Text style={styles.chatLastMessage}>Click to start chatting...</Text>
      </View>
      <Text style={styles.chatTime}>Now</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.messagesHeader}>
        <Text style={styles.messagesTitle}>Messages</Text>
      </View>
      <FlatList
        data={photographers}
        renderItem={({ item }) => renderChat(item)}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  messagesHeader: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  messagesTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  chatAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  chatLastMessage: {
    fontSize: 14,
    color: '#666',
  },
  chatTime: {
    fontSize: 12,
    color: '#666',
  },
});

export default MessagesPage;