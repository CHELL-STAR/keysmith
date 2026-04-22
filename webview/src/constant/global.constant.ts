interface SHA_INTERFACE {
  name: string;
  icon?: string;
  value: string;
}

export const SHA_ALGORITHAMS: SHA_INTERFACE[] = [
  { name: "SHA-256", icon: "🔷", value: "sha256" },
  { name: "SHA-384", icon: "🔶", value: "sha384" },
  { name: "SHA-512", icon: "🔶", value: "sha512" },
  { name: "SHA-224", icon: "🔷", value: "sha224" },
  { name: "SHA-1", icon: "⚠️", value: "sha1" },
];
