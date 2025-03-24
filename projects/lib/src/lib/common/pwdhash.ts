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


  /*

salt = window.crypto.getRandomValues(new Uint8Array(16));
hashedPassword=''

 hashpwd(){
    (async () => {
      
      this.hashedPassword = await hashPassword("meinPasswort123", this.salt);
      console.log("Passwort-Hash:", this.hashedPassword);
    })();

  }

  checkpwd(){
    (async () => {
      try {
        const isValid = await verifyPassword("meinPasswort123", this.salt, this.hashedPassword);
        console.log("Passwort korrekt:", isValid);
      } catch (error) {
        console.error("Fehler beim Prüfen des Passworts:", error);
      }
    })();
  }



  */
  
