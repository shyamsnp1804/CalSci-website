import { supabase } from "./config.js";

// Function to signup user
export async function signUpUser(userName, email, password) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { userName },
         emailRedirectTo: `${window.location.origin}/calsciuser`
      },
    });

    if (error) {
      if (
        error.status === 400 &&
        error.message.includes("User already registered")
      ) {
        throw new Error(
          "Email already registered. Please sign in or use a different email."
        );
      }
      throw new Error(error.message);
    }

    if (data.user) {
      return {
        success: true,
         needsVerification: true,
        message: "Signup successful! Please check your email to confirm.",
      };
    }
    throw new Error("No user data returned.");
  } catch (error) {
    console.error("Signup error:", error);
    return { success: false, message: error.message };
  }
}

// Function to signin user
export async function signInUser(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (
        error.status === 400 &&
        error.message.includes("Invalid login credentials")
      ) {
        throw new Error("Invalid email or password.");
      }
      throw new Error(error.message);
    }

    return {
      success: true,
      message: "Sign in successful!",
      user: data.user,
    };
  } catch (error) {
    console.error("Signin error:", error);
    return { success: false, message: error.message };
  }
}

// Function to check if user is signed in
export async function checkUserSession() {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) {
      console.error("Session check error:", error);
      return {
        user: null,
        isAuthenticated: false,
        error: "Failed to retrieve session.",
      };
    }
    return {
      user: session?.user || null,
      isAuthenticated: !!session,
      error: null,
    };
  } catch (error) {
    console.error("Unexpected session check error:", error);
    return { user: null, isAuthenticated: false, error: error.message };
  }
}

// Function to sign out user
export async function signOutUser() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error("Failed to sign out.");
    }
    return { success: true, message: "Sign out successful!" };
  } catch (error) {
    console.error("Signout error:", error);
    return { success: false, message: error.message };
  }
}
