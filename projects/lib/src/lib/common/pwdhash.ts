export async function hashPassword(password: string, salt: Uint8Array): Promise<string> {
    const encoder = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveBits"]
    );
  
    const derivedKey = await window.crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      256
    );
  
    // Statt Buffer: ArrayBuffer → Base64
    return btoa(String.fromCharCode(...new Uint8Array(derivedKey)));
  }
  


  export async function verifyPassword(plainPassword: string, salt: Uint8Array, storedHash: string): Promise<boolean> {
    const hashedPassword = await hashPassword(plainPassword, salt);
    
    return hashedPassword === storedHash;
  }


  