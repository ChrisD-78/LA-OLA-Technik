import { supabase } from './supabase';

// GitHub OAuth-Anmeldung
export const signInWithGitHub = async () => {
  try {
    console.log('🔗 Starte GitHub OAuth-Anmeldung...');
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) {
      console.error('❌ GitHub-Anmeldung fehlgeschlagen:', error);
      throw error;
    }

    console.log('✅ GitHub OAuth-Redirect gestartet');
    return data;
  } catch (error) {
    console.error('GitHub-Anmeldung Fehler:', error);
    throw error;
  }
};

// Benutzer abmelden
export const signOut = async () => {
  try {
    console.log('👋 Melde Benutzer ab...');
    
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('❌ Abmeldung fehlgeschlagen:', error);
      throw error;
    }
    
    console.log('✅ Benutzer erfolgreich abgemeldet');
  } catch (error) {
    console.error('Abmeldung Fehler:', error);
    throw error;
  }
};

// Aktueller Benutzer-Status
export const getCurrentUser = () => {
  return supabase.auth.getUser();
};

// Auth-Status-Listener
export const onAuthStateChange = (callback: (event: string, session: any) => void) => {
  return supabase.auth.onAuthStateChange(callback);
};
