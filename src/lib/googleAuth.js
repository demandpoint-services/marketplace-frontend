import { googleLogin } from "./api";

export async function handleGoogleLogin(credentialResponse) {
  try {
    const data = await googleLogin({
      credential: credentialResponse.credential,
    });

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    document.cookie = `token=${data.token}; path=/; max-age=604800; samesite=lax`;

    window.location.href = "/dashboard";
  } catch (err) {
    console.error(err);
    alert("Google sign in failed");
  }
}
