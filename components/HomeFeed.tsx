import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Photographer } from '../constants/types';

interface HomePageProps {
  photographers: Photographer[];
}


const HomeFeed = ({ photographers }:HomePageProps) => {
  const [liked, setLiked] = useState({});
  const [showComments, setShowComments] = useState({});
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [showHireModal, setShowHireModal] = useState(false);
  const [selectedPhotographer, setSelectedPhotographer] = useState(null);

  const handleLike = (id: string | number) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleComment = (id: string | number) => {
    if (newComment.trim()) {
      setComments(prev => ({
        ...prev,
        [id]: [...(prev[id] || []), newComment]
      }));
      setNewComment('');
    }
  };

  const handleHire = (photographer: React.SetStateAction<null>) => {
    setSelectedPhotographer(photographer);
    setShowHireModal(true);
  };

  const renderHireModal = () => (
    <Modal
      visible={showHireModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowHireModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Hire Photographer</Text>
            <TouchableOpacity onPress={() => setShowHireModal(false)}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          {selectedPhotographer && (
            <View style={styles.photographerPreview}>
              <Image source={{ uri: selectedPhotographer.avatar }} style={styles.modalAvatar} />
              <View style={styles.photographerInfo}>
                <Text style={styles.modalPhotographerName}>{selectedPhotographer.name}</Text>
                <Text style={styles.modalPhotographerSpecialty}>{selectedPhotographer.specialty}</Text>
                <Text style={styles.modalPrice}>{selectedPhotographer.price}</Text>
              </View>
            </View>
          )}
          <TouchableOpacity style={styles.hireChatButton} onPress={() => setShowHireModal(false)}>
            <Text style={styles.hireChatButtonText}>Chat with Photographer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.hireBookButton} onPress={() => setShowHireModal(false)}>
            <Text style={styles.hireBookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderPhotoCard = (photographer: Photographer | React.SetStateAction<null>) => {
    const isLiked = liked[photographer.id];
    const photoComments = comments[photographer.id] || [];
    const isCommentsVisible = showComments[photographer.id];

    return (
      <View style={styles.card} key={photographer.id}>
        <View style={styles.cardHeader}>
          <TouchableOpacity style={styles.photographerInfo}>
            <Image source={{ uri: photographer.avatar }} style={styles.avatar} />
            <View>
              <View style={styles.nameContainer}>
                <Text style={styles.photographerName}>{photographer.name}</Text>
                {photographer.isVerified && <MaterialCommunityIcons name="check-decagram" size={16} color="#0095f6" />}
              </View>
              <Text style={styles.location}>{photographer.location}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.priceTag}>
            <Text style={styles.priceText}>{photographer.price}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
          {photographer.images.map((image: any, index: React.Key | null | undefined) => (
            <Image key={index} source={{ uri: image }} style={styles.mainImage} />
          ))}
        </ScrollView>
        <View style={styles.cardActions}>
          <View style={styles.leftActions}>
            <TouchableOpacity style={styles.actionButton} onPress={() => handleLike(photographer.id)}>
              <Ionicons name={isLiked ? "heart" : "heart-outline"} size={26} color={isLiked ? "#ff3b30" : "#000"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => setShowComments(prev => ({ ...prev, [photographer.id]: !prev[photographer.id] }))}>
              <Ionicons name="chatbubble-outline" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => alert(`Sharing ${photographer.name}'s profile`)}>
              <Ionicons name="paper-plane-outline" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.hireButton} onPress={() => handleHire(photographer)}>
            <Text style={styles.hireButtonText}>Hire Now</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.likes}>{photographer.likes + (isLiked ? 1 : 0)} likes</Text>
          <Text style={styles.specialty}>
            <Text style={styles.photographerName}>{photographer.name}</Text> {photographer.specialty}
          </Text>
          {isCommentsVisible && (
            <View style={styles.commentsSection}>
              {photoComments.map((comment: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
                <Text key={index} style={styles.comment}>
                  <Text style={styles.commentUser}>User {index + 1}</Text> {comment}
                </Text>
              ))}
              <View style={styles.addCommentContainer}>
                <TextInput
                  style={styles.commentInput}
                  placeholder="Add a comment..."
                  value={newComment}
                  onChangeText={setNewComment}
                  onSubmitEditing={() => handleComment(photographer.id)}
                />
                <TouchableOpacity style={styles.postButton} onPress={() => handleComment(photographer.id)}>
                  <Text style={styles.postButtonText}>Post</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.feedContainer}>
        {photographers.map(photographer => renderPhotoCard(photographer))}
      </ScrollView>
      {renderHireModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  feedContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  photographerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  photographerName: {
    fontWeight: '600',
    fontSize: 14,
  },
  location: {
    fontSize: 12,
    color: '#666',
  },
  priceTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  priceText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  mainImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginRight: 16,
  },
  hireButton: {
    backgroundColor: '#0095f6',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  hireButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  cardContent: {
    padding: 12,
  },
  likes: {
    fontWeight: '600',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    lineHeight: 18,
  },
  commentsSection: {
    marginTop: 8,
  },
  comment: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 4,
  },
  commentUser: {
    fontWeight: '600',
  },
  addCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
    paddingTop: 8,
  },
  commentInput: {
    flex: 1,
    fontSize: 14,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginRight: 8,
  },
  postButton: {
    padding: 8,
  },
  postButtonText: {
    color: '#0095f6',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: 300,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  modalAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  photographerPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalPhotographerName: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalPhotographerSpecialty: {
    fontSize: 14,
    color: '#666',
  },
  modalPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0095f6',
  },
  hireChatButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  hireChatButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  hireBookButton: {
    backgroundColor: '#0095f6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  hireBookButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default HomeFeed;