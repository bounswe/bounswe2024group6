import { View, Text, StyleSheet } from 'react-native';
import ForumFeed from '../forumFeed';

export default function Tab() {
  return (
    <ForumFeed></ForumFeed>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
