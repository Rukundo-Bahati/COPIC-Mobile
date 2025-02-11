import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, Modal, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type SettingItem<T> = {
  icon: string;
  label: string;
  type: 'toggle' | 'select';
  value: T;
  onChange: Dispatch<SetStateAction<T>>;
  options?: string[]; // Only needed for 'select' type
};


const SettingsPage = () => {
  const [notifications, setNotifications] = useState({
    messages: true,
    likes: true,
    comments: true,
    mentions: true,
    bookings: true,
  });
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');
  const [currency, setCurrency] = useState('USD');
  const [isPrivate, setIsPrivate] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

const settingSections: { title: string; items: SettingItem<boolean | string>[] }[] = [
    {
      title: 'Account',
      items: [
        { icon: 'person-outline', label: 'Edit Profile', action: () => {} },
        { icon: 'lock-closed-outline', label: 'Password & Security', action: () => {} },
        { icon: 'eye-outline', label: 'Privacy', type: 'toggle', value: isPrivate, onChange: setIsPrivate },
      ],
    },
    {
      title: 'Notifications',
      items: [
        { icon: 'moon-outline', label: 'Dark Mode', type: 'toggle', value: darkMode, onChange: setDarkMode },
        { icon: 'language-outline', label: 'Language', type: 'select', value: language, onChange: setLanguage, options: ['English', 'Spanish', 'French', 'German', 'Chinese'] },
        { icon: 'cash-outline', label: 'Currency', type: 'select', value: currency, onChange: setCurrency, options: ['USD', 'EUR', 'GBP', 'JPY', 'CNY'] },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { icon: 'moon-outline', label: 'Dark Mode', type: 'toggle', value: darkMode, onChange: setDarkMode },
        { icon: 'language-outline', label: 'Language', type: 'select', value: language, onChange: setLanguage, options: ['English', 'Spanish', 'French', 'German', 'Chinese'] },
        { icon: 'cash-outline', label: 'Currency', type: 'select', value: currency, onChange: setCurrency, options: ['USD', 'EUR', 'GBP', 'JPY', 'CNY'] },
      ],
    },
  ];
  

  const renderItem = (item: SettingItem) => {
    switch (item.type) {
      case 'toggle':
        return (
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name={item.icon} size={24} color="#666" />
              <Text style={styles.settingLabel}>{item.label}</Text>
            </View>
            <Switch
              value={!!item.value} // Ensure boolean value
              onValueChange={(value) => item.onChange && item.onChange(value)}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={item.value ? "#0095f6" : "#f4f3f4"}
            />
          </View>
        );
      case 'select':
        return (
          <TouchableOpacity style={styles.settingItem} onPress={() => alert(`Select an option for ${item.label}`)}>
            <View style={styles.settingLeft}>
              <Ionicons name={item.icon} size={24} color="#666" />
              <Text style={styles.settingLabel}>{item.label}</Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>{item.value}</Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </View>
          </TouchableOpacity>
        );
      default:
        return (
          <TouchableOpacity style={styles.settingItem} onPress={item.action}>
            <View style={styles.settingLeft}>
              <Ionicons name={item.icon} size={24} color="#666" />
              <Text style={styles.settingLabel}>{item.label}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.settingsContainer}>
        {settingSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item) => (
                <View key={item.label}>
                  {renderItem(item)}
                  <View style={styles.separator} />
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  settingsContainer: { flex: 1, backgroundColor: '#f8f8f8' },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: '#666', margin: 16, textTransform: 'uppercase' },
  sectionContent: { backgroundColor: 'white' },
  settingItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  settingLeft: { flexDirection: 'row', alignItems: 'center' },
  settingLabel: { fontSize: 16, marginLeft: 12, color: '#000' },
  settingRight: { flexDirection: 'row', alignItems: 'center' },
  settingValue: { fontSize: 16, marginRight: 8, color: '#666' },
  separator: { height: 1, backgroundColor: '#ddd', marginHorizontal: 16 },
});

export default SettingsPage;
