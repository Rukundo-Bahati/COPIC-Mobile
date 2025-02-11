import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { User } from '@/constants/types';

interface ProfilePageProps {
  user: User;
}

const ProfilePage = ({ user }: ProfilePageProps) => {
  const [activeTab, setActiveTab] = useState('Photos');

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: user.avatar }} style={styles.profileAvatar} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileEmail}>{user.email}</Text>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.profileStats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.following.length}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.followers.length}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
      </View>
      <View style={styles.profileTabs}>
        <TouchableOpacity style={[styles.profileTab, activeTab === 'Photos' && styles.activeTab]} onPress={() => setActiveTab('Photos')}>
          <Text style={styles.tabText}>Photos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.profileTab, activeTab === 'Saved' && styles.activeTab]} onPress={() => setActiveTab('Saved')}>
          <Text style={styles.tabText}>Saved</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={[]}
        numColumns={3}
        renderItem={({ item }) => <View style={styles.profileImage} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No {activeTab.toLowerCase()} yet</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  profileHeader: {
    padding: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  editProfileButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '500',
  },
  profileStats: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 15,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e0e0e0',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  profileTabs: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e0e0e0',
  },
  profileTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: 'white',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#0095f6',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  profileImage: {
    flex: 1,
    aspectRatio: 1,
    margin: 1,
    backgroundColor: '#f0f0f0',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
  },
});

export default ProfilePage;