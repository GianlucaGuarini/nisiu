import CryptoJS from "crypto-js";

const CREDENTIAL_ID_KEY = "nisiu_credential_id";
const CHALLENGE_KEY = "nisiu_challenge";
const TRUSTED_KEY = "nisiu_trusted";
const ENCRYPTED_PASSWORD_KEY = "nisiu_encrypted_password";

function generateChallenge(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
}

function deriveKeyFromCredential(credentialId: string): string {
  return CryptoJS.SHA256(credentialId + "nisiu-salt").toString();
}

function getRpId(): string {
  const hostname = window.location.hostname;
  if (!hostname || hostname === "localhost" || hostname === "127.0.0.1") {
    return "localhost";
  }
  return hostname;
}

export async function isBiometricAvailable(): Promise<boolean> {
  if (!window.PublicKeyCredential) {
    return false;
  }
  try {
    return await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
  } catch {
    return false;
  }
}

let isRegistering = false;

export async function registerBiometric(
  userId: string,
  masterPassword: string,
): Promise<boolean> {
  if (isRegistering) {
    console.log("Registration already in progress");
    return false;
  }

  if (!(await isBiometricAvailable())) {
    console.log("Biometric not available");
    return false;
  }

  isRegistering = true;

  try {
    const challenge = generateChallenge();
    localStorage.setItem(CHALLENGE_KEY, challenge);

    const rpId = getRpId();

    const credential = await navigator.credentials.create({
      publicKey: {
        challenge: new TextEncoder().encode(challenge),
        rp: {
          name: "Nisiu",
          id: rpId,
        },
        user: {
          id: new TextEncoder().encode(userId),
          name: userId,
          displayName: "Nisiu User",
        },
        pubKeyCredParams: [{ alg: -7, type: "public-key" }],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          userVerification: "required",
          residentKey: "preferred",
        },
        timeout: 60000,
        attestation: "none",
      },
    });

    if (!credential) {
      console.log("No credential returned");
      return false;
    }

    const publicKeyCredential = credential as PublicKeyCredential;
    const rawId = btoa(
      String.fromCharCode(...new Uint8Array(publicKeyCredential.rawId)),
    );

    localStorage.setItem(CREDENTIAL_ID_KEY, rawId);

    const derivedKey = deriveKeyFromCredential(rawId);
    const encryptedPassword = CryptoJS.AES.encrypt(
      masterPassword,
      derivedKey,
    ).toString();
    localStorage.setItem(ENCRYPTED_PASSWORD_KEY, encryptedPassword);

    localStorage.setItem(TRUSTED_KEY, "true");

    console.log("Biometric registration successful");
    return true;
  } catch (err) {
    if (err instanceof DOMException) {
      if (err.name === "NotAllowedError") {
        console.log("Biometric registration was not allowed or cancelled");
      } else if (err.name === "AbortError") {
        console.log("Biometric registration was aborted");
      } else {
        console.error("WebAuthn registration error:", err.name, err.message);
      }
    } else {
      console.error("WebAuthn registration failed:", err);
    }
    return false;
  } finally {
    isRegistering = false;
  }
}

let isAuthenticating = false;

export async function authenticateWithBiometric(): Promise<string | null> {
  if (isAuthenticating) {
    console.log("Authentication already in progress");
    return null;
  }

  if (!(await isBiometricAvailable())) {
    console.log("Biometric not available for auth");
    return null;
  }

  const credentialId = localStorage.getItem(CREDENTIAL_ID_KEY);
  const challenge = localStorage.getItem(CHALLENGE_KEY);
  const encryptedPassword = localStorage.getItem(ENCRYPTED_PASSWORD_KEY);

  if (!credentialId || !challenge || !encryptedPassword) {
    console.log("Missing biometric data in localStorage");
    return null;
  }

  isAuthenticating = true;

  try {
    const credentialIdBuffer = Uint8Array.from(atob(credentialId), (c) =>
      c.charCodeAt(0),
    );
    const rpId = getRpId();

    const assertion = await navigator.credentials.get({
      publicKey: {
        challenge: new TextEncoder().encode(challenge),
        allowCredentials: [
          {
            id: credentialIdBuffer,
            type: "public-key",
          },
        ],
        userVerification: "required",
        timeout: 60000,
        rpId: rpId,
      },
    });

    if (!assertion) {
      console.log("No assertion returned");
      return null;
    }

    const newChallenge = generateChallenge();
    localStorage.setItem(CHALLENGE_KEY, newChallenge);

    const derivedKey = deriveKeyFromCredential(credentialId);
    const decryptedPassword = CryptoJS.AES.decrypt(
      encryptedPassword,
      derivedKey,
    ).toString(CryptoJS.enc.Utf8);

    return decryptedPassword || null;
  } catch (err) {
    if (err instanceof DOMException) {
      if (err.name === "NotAllowedError") {
        console.log("Biometric authentication was not allowed or cancelled");
      } else if (err.name === "AbortError") {
        console.log("Biometric authentication was aborted");
      } else {
        console.error("WebAuthn authentication error:", err.name, err.message);
      }
    } else {
      console.error("WebAuthn authentication failed:", err);
    }
    return null;
  } finally {
    isAuthenticating = false;
  }
}

export function isTrustedDevice(): boolean {
  return localStorage.getItem(TRUSTED_KEY) === "true";
}

export function removeTrustedDevice(): void {
  localStorage.removeItem(CREDENTIAL_ID_KEY);
  localStorage.removeItem(CHALLENGE_KEY);
  localStorage.removeItem(TRUSTED_KEY);
  localStorage.removeItem(ENCRYPTED_PASSWORD_KEY);
}
