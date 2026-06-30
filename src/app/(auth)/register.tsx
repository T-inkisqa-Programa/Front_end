import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Encabezado */}
          <View style={styles.headerContainer}>
            <Text style={styles.brandName}>T'inkisqa</Text>
            <Text style={styles.title}>Crea tu cuenta</Text>
            <Text style={styles.subtitle}>
              Únete a nuestra comunidad de{'\n'}apoyo y crecimiento.
            </Text>
          </View>

          {/* Formulario */}
          <View style={styles.formContainer}>
            
            {/* Input Nombre Completo */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Nombre completo"
                placeholderTextColor="#A0A0B0"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            {/* Input Correo */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#A0A0B0"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Input Contraseña */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#A0A0B0"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {/* Input Confirmar Contraseña */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Confirmar contraseña"
                placeholderTextColor="#A0A0B0"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>

            {/* Checkbox de Términos */}
            <TouchableOpacity 
              style={styles.checkboxContainer} 
              onPress={() => setAcceptedTerms(!acceptedTerms)}
              activeOpacity={0.8}
            >
              <Ionicons 
                name={acceptedTerms ? "checkbox" : "square-outline"} 
                size={22} 
                color={acceptedTerms ? "#615673" : "#C4C4C4"} 
              />
              <Text style={styles.checkboxText}>
                Acepto los <Text style={styles.linkText}>términos y políticas de privacidad</Text>
              </Text>
            </TouchableOpacity>

            {/* Botón Registrarse */}
            <TouchableOpacity 
              style={[styles.registerButton, !acceptedTerms && styles.buttonDisabled]} 
              activeOpacity={0.8}
              disabled={!acceptedTerms}
            >
              <Text style={styles.registerButtonText}>Registrarse</Text>
            </TouchableOpacity>
          </View>

          {/* Divisor */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>o regístrate con</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Redes Sociales */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome5 name="google" size={20} color="#DB4437" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome5 name="facebook" size={24} color="#1877F2" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome5 name="apple" size={24} color="#000000" />
            </TouchableOpacity>
          </View>

            <View style={styles.footerContainer}>
            <Text style={styles.footerText}>¿Ya tienes una cuenta? </Text>
            <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.loginLinkText}>Iniciar sesión</Text>
            </TouchableOpacity>
            </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFF',
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 35,
  },
  brandName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#615673',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E1E1E',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B6B6B',
    textAlign: 'center',
    lineHeight: 22,
  },
  formContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 30, // Más redondeado según la imagen
    paddingHorizontal: 20,
    height: 60,
    marginBottom: 16,
    justifyContent: 'center',
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    // Sombra para Android
    elevation: 2,
  },
  input: {
    fontSize: 16,
    color: '#1E1E1E',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 5,
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 13,
    color: '#4A4A4A',
    flex: 1,
  },
  linkText: {
    color: '#615673',
    fontWeight: '600',
  },
  registerButton: {
    backgroundColor: '#615673',
    borderRadius: 30,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#A0A0B0',
    opacity: 0.7,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5EA',
  },
  dividerText: {
    marginHorizontal: 15,
    color: '#A0A0B0',
    fontSize: 13,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 35,
  },
  socialButton: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    elevation: 2,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6B6B6B',
  },
  loginLinkText: {
    fontSize: 14,
    color: '#615673',
    fontWeight: 'bold',
  },
});