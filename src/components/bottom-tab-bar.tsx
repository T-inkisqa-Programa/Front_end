import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { usePathname, useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const tabs: { name: string; icon: IoniconName; route: '/' | '/inicio' | '/testimonios' | '/contactos' | '/foros' | '/voluntarios' }[] = [
  { name: 'Inicio', icon: 'home', route: '/inicio' },
  { name: 'Testimonios', icon: 'chatbubble-ellipses', route: '/testimonios' },
  { name: 'Contactos', icon: 'people', route: '/contactos' },
  { name: 'Foros', icon: 'chatbox', route: '/foros' },
  { name: 'Voluntarios', icon: 'heart', route: '/voluntarios' },
];

export function BottomTabBar() {
  const theme = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <View
      style={[
        styles.bar,
        { backgroundColor: theme.background, borderTopColor: theme.backgroundElement },
      ]}
    >
      {tabs.map((tab) => {
        const active = pathname === tab.route;
        return (
          <Pressable key={tab.name} style={styles.tab} onPress={() => router.push(tab.route)}>
            <Ionicons
              name={active ? tab.icon : (`${tab.icon}-outline` as IoniconName)}
              size={24}
              color={active ? '#615673' : theme.textSecondary}
            />
            <ThemedText
              type="small"
              style={[styles.label, active && { color: '#615673' }]}
            >
              {tab.name}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    paddingTop: Spacing.two,
    paddingBottom: BottomTabInset,
    borderTopWidth: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingVertical: Spacing.one,
  },
  label: {
    color: '#60646C',
  },
});
