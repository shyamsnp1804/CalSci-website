import { supabase } from "./config.js";

//function to signup user

export async function signUpUser(userName, email, password) {
  try {
    const { data, error } = await supabase.auth.signUp({
      options: {
        data: { userName },
      },
      email,
      password,
    });
    if (error) {
      if (
        error.status === 400 &&
        error.message.includes("User already registered")
      ) {
        throw new Error(
          "This email is already registered. Please sign in or use a different email."
        );
      }
      throw new Error(error.message);
    }

    if (data.user) {
      const { error: dbError } = await supabase
        .from("users")
        .insert([{ id: data.user.id, userName, email }]);
      if (dbError) {
        throw new Error("Failed to create user profile in the database.");
      }
      return {
        success: true,
        message: "Signup successful! Please check your email to confirm.",
      };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
}

//function to signin user

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
        throw new Error("Invalid email or password. Please try again.");
      }
      throw new Error(error.message);
    }
    return {
      success: true,
      message: "Sign in successful! Welcome back to CalSci!",
      user: data.user,
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

//function to check if user is signed in
export async function checkUserSession() {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) {
      throw new Error("Failed to retrieve user session. Please try again.");
    }
    return { success: true, session };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

//function to sign out user
export async function signOutUser() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error("Failed to sign out. Please try again.");
    }
    return { success: true, message: "Sign out successful!" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
