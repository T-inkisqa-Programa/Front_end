import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function TopBar() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Pressable style={({ pressed }) => [styles.sideBtn, pressed && { opacity: 0.7 }]}>
        <Ionicons name="search" size={22} color={theme.text} />
      </Pressable>

      <ThemedText type="title" style={styles.appName}>
        T'inkisqa
      </ThemedText>

      <View style={styles.rightIcons}>
        <Pressable style={({ pressed }) => [styles.sideBtn, pressed && { opacity: 0.7 }]}>
          <Ionicons name="flame-outline" size={22} color={theme.text} />
        </Pressable>
        <Pressable style={({ pressed }) => [styles.sideBtn, pressed && { opacity: 0.7 }]}>
          <Ionicons name="notifications-outline" size={22} color={theme.text} />
        </Pressable>
        <Pressable style={({ pressed }) => [styles.sideBtn, pressed && { opacity: 0.7 }]}>
          <Image
            source="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
            style={styles.profilePic}
            contentFit="cover"
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  appName: {
    fontSize: 20,
    textAlign: 'center',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.half,
  },
  sideBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePic: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
});
