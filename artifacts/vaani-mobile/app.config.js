// Extends app.json. EXPO_PUBLIC_DOMAIN is the published API server's domain
// (no protocol, no trailing slash). It can be overridden via eas.json build
// profile env or an EAS environment variable; otherwise production builds
// fall back to the live production domain so the binary never ships pointing
// at "https://undefined".
const PRODUCTION_DOMAIN = "askvaani.org";

module.exports = ({ config }) => {
  if (!process.env.EXPO_PUBLIC_DOMAIN) {
    process.env.EXPO_PUBLIC_DOMAIN = PRODUCTION_DOMAIN;
  }
  return config;
};
