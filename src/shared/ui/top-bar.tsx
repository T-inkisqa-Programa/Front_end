import { useState } from 'react';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, type Href } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/shared/ui/themed-text';
import { Spacing } from '@/shared/theme/theme';
import { useTheme } from '@/shared/hooks/use-theme';

interface TopBarProps {
  showClose?: boolean;
  onClose?: () => void;
}

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

type MenuItem = {
  icon: IoniconName;
  label: string;
  color?: string;
  onPress: () => void;
};

type MenuId = 'search' | 'streak' | 'notifications' | 'profile';

export function TopBar({ showClose, onClose }: TopBarProps) {
  const theme = useTheme();
  const router = useRouter();
  const [menu, setMenu] = useState<MenuId | null>(null);

  const toggleMenu = (id: MenuId) => setMenu((prev) => (prev === id ? null : id));

  const closeMenu = () => setMenu(null);

  const go = (href: Href) => {
    closeMenu();
    router.push(href);
  };

  const logout = () => {
    closeMenu();
    router.replace('/login');
  };

  const profileItems: MenuItem[] = [
    { icon: 'person-outline', label: 'Mi perfil', onPress: () => go('/perfil') },
    { icon: 'document-text-outline', label: 'Mis publicaciones', onPress: () => go('/perfil') },
    { icon: 'bookmark-outline', label: 'Guardados', onPress: () => go('/perfil') },
    { icon: 'help-circle-outline', label: 'Ayuda y soporte', onPress: () => go('/contactos') },
    { icon: 'log-out-outline', label: 'Cerrar sesión', color: '#FF6B6B', onPress: logout },
  ];

  const searchItems: MenuItem[] = [
    { icon: 'newspaper-outline', label: 'Buscar publicaciones', onPress: () => go('/inicio') },
    { icon: 'medical-outline', label: 'Buscar psicólogas', onPress: () => go('/contactos') },
    { icon: 'heart-outline', label: 'Buscar voluntariados', onPress: () => go('/voluntarios') },
    { icon: 'people-outline', label: 'Buscar comunidades', onPress: () => go('/foros') },
  ];

  const notifications = [
    {
      icon: 'heart' as IoniconName,
      color: '#FF6B8A',
      title: 'Nuevo agradecimiento',
      subtitle: 'En tu testimonio «Empecé a priorizarme»',
      time: 'hace 5 min',
      route: '/testimonios' as Href,
    },
    {
      icon: 'person-add' as IoniconName,
      color: '#4CAF50',
      title: 'Nuevo seguidor',
      subtitle: 'Camila R. empezó a seguirte',
      time: 'hace 1 hora',
      route: '/perfil' as Href,
    },
    {
      icon: 'briefcase' as IoniconName,
      color: '#FF9800',
      title: 'Nueva oportunidad',
      subtitle: 'Voluntariado en tutoría escolar',
      time: 'hace 3 horas',
      route: '/voluntarios' as Href,
    },
  ];

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Pressable
          style={({ pressed }) => [styles.sideBtn, pressed && styles.pressed]}
          onPress={() => toggleMenu('search')}
        >
          <Ionicons name="search" size={22} color={theme.text} />
        </Pressable>

        <ThemedText type="title" style={styles.appName}>
          T&apos;inkisqa
        </ThemedText>

        {showClose ? (
          <Pressable
            style={({ pressed }) => [styles.sideBtn, pressed && styles.pressed]}
            onPress={() => {
              closeMenu();
              onClose?.();
            }}
          >
            <Ionicons name="close" size={24} color={theme.text} />
          </Pressable>
        ) : (
          <View style={styles.rightIcons}>
            <Pressable
              style={({ pressed }) => [styles.sideBtn, pressed && styles.pressed]}
              onPress={() => toggleMenu('streak')}
            >
              <Ionicons name="flame-outline" size={22} color={menu === 'streak' ? '#F97316' : theme.text} />
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.sideBtn, pressed && styles.pressed]}
              onPress={() => toggleMenu('notifications')}
            >
              <Ionicons name="notifications-outline" size={22} color={menu === 'notifications' ? '#615673' : theme.text} />
              <View style={styles.notifDot} />
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.sideBtn, pressed && styles.pressed]}
              onPress={() => toggleMenu('profile')}
            >
              <Image
                source="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                style={[styles.profilePic, menu === 'profile' && styles.profilePicActive]}
                contentFit="cover"
              />
            </Pressable>
          </View>
        )}
      </View>

      {/* Menu overlay */}
      {menu && (
        <>
          <Pressable style={styles.backdrop} onPress={closeMenu} />
          <View style={styles.menuCard}>
            {menu === 'search' && (
              <View>
                <ThemedText type="small" themeColor="textSecondary" style={styles.menuLabel}>
                  Buscar en T&apos;inkisqa
                </ThemedText>
                {searchItems.map((item) => (
                  <MenuItemRow key={item.label} item={item} />
                ))}
              </View>
            )}

            {menu === 'streak' && (
              <View style={styles.streakPanel}>
                <View style={styles.streakIcon}>
                  <Ionicons name="flame" size={28} color="#F97316" />
                </View>
                <ThemedText type="smallBold" style={styles.streakTitle}>
                  Tu racha: 7 días
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary" style={styles.streakSubtitle}>
                  Has compartido 7 días seguidos. ¡Sigue inspirando a la comunidad!
                </ThemedText>
                <Pressable
                  style={({ pressed }) => [styles.menuActionBtn, pressed && styles.pressed]}
                  onPress={() => go('/racha')}
                >
                  <ThemedText type="smallBold" style={styles.menuActionText}>
                    Ver mi racha
                  </ThemedText>
                </Pressable>
              </View>
            )}

            {menu === 'notifications' && (
              <View>
                <ThemedText type="small" themeColor="textSecondary" style={styles.menuLabel}>
                  Notificaciones
                </ThemedText>
                {notifications.map((n) => (
                  <Pressable
                    key={n.title}
                    style={({ pressed }) => [styles.notifItem, pressed && styles.pressed]}
                    onPress={() => go(n.route)}
                  >
                    <View style={[styles.notifIcon, { backgroundColor: n.color + '1A' }]}>
                      <Ionicons name={n.icon} size={18} color={n.color} />
                    </View>
                    <View style={styles.notifBody}>
                      <ThemedText type="smallBold" style={styles.notifTitle}>
                        {n.title}
                      </ThemedText>
                      <ThemedText type="small" themeColor="textSecondary" numberOfLines={2}>
                        {n.subtitle}
                      </ThemedText>
                    </View>
                    <ThemedText type="small" themeColor="textSecondary" style={styles.notifTime}>
                      {n.time}
                    </ThemedText>
                  </Pressable>
                ))}
                <Pressable
                  style={({ pressed }) => [styles.menuActionBtn, pressed && styles.pressed]}
                  onPress={() => go('/perfil')}
                >
                  <ThemedText type="smallBold" style={styles.menuActionText}>
                    Ver todas las notificaciones
                  </ThemedText>
                </Pressable>
              </View>
            )}

            {menu === 'profile' && (
              <View>
                <View style={styles.profileHeader}>
                  <Image
                    source="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                    style={styles.profileMenuPic}
                    contentFit="cover"
                  />
                  <View style={styles.profileHeaderInfo}>
                    <ThemedText type="smallBold">Valeria M.</ThemedText>
                    <ThemedText type="small" themeColor="textSecondary">
                      @valeria.m
                    </ThemedText>
                  </View>
                </View>
                <View style={styles.menuDivider} />
                {profileItems.map((item) => (
                  <MenuItemRow key={item.label} item={item} />
                ))}
              </View>
            )}
          </View>
        </>
      )}
    </View>
  );
}

function MenuItemRow({ item }: { item: MenuItem }) {
  const theme = useTheme();
  return (
    <Pressable
      style={({ pressed }) => [styles.menuItem, pressed && styles.pressed]}
      onPress={item.onPress}
    >
      <Ionicons name={item.icon} size={19} color={item.color ?? theme.text} />
      <ThemedText type="small" style={[styles.menuItemLabel, item.color ? { color: item.color } : undefined]}>
        {item.label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    zIndex: 20,
  },
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
  pressed: {
    opacity: 0.7,
  },
  profilePic: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  profilePicActive: {
    borderWidth: 2,
    borderColor: '#615673',
  },
  notifDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B8A',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  backdrop: {
    position: 'absolute',
    top: 48,
    left: -Spacing.four,
    right: -Spacing.four,
    height: 2000,
    backgroundColor: 'transparent',
  },
  menuCard: {
    position: 'absolute',
    top: 52,
    right: -Spacing.four,
    minWidth: 260,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    padding: Spacing.two,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
  menuLabel: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.one,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.two + 2,
    paddingHorizontal: Spacing.three,
    borderRadius: 12,
  },
  menuItemLabel: {
    fontSize: 14,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F0F0F3',
    marginVertical: Spacing.one,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.two,
  },
  profileMenuPic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileHeaderInfo: {
    gap: 2,
  },
  streakPanel: {
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.four,
    width: 260,
  },
  streakIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  streakTitle: {
    fontSize: 16,
  },
  streakSubtitle: {
    textAlign: 'center',
    lineHeight: 18,
  },
  menuActionBtn: {
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: '#F5F0FF',
    borderRadius: 12,
    paddingVertical: Spacing.two,
    marginTop: Spacing.one,
  },
  menuActionText: {
    color: '#615673',
    fontSize: 13,
  },
  notifItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.two,
    borderRadius: 12,
  },
  notifIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifBody: {
    flex: 1,
    gap: 2,
  },
  notifTitle: {
    fontSize: 13,
  },
  notifTime: {
    fontSize: 11,
  },
});
