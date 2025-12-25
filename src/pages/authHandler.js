import { signInUser, signUpUser } from "../configSupabase/auth";

export async function handleLogin(email, password) {
  const result = await signInUser(email, password);
  return result;
}

export async function handleSignup(username, email, password) {
  const result = await signUpUser(username, email, password);
  return result;
}
