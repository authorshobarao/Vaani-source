const { withAndroidManifest } = require("expo/config-plugins");

/**
 * "orientation": "portrait" makes Android imply a required
 * android.hardware.screen.portrait feature, which Google Play uses to hide the
 * app from tablets, Chromebooks, and XR devices. Declare the screen features as
 * optional so every device can install Vaani; phones still open in portrait.
 * The CAMERA and RECORD_AUDIO permissions likewise imply required camera and
 * microphone hardware, but both are optional in Vaani (PDF upload and typing
 * work without them).
 */
const OPTIONAL_FEATURES = [
  "android.hardware.screen.portrait",
  "android.hardware.screen.landscape",
  "android.hardware.camera",
  "android.hardware.camera.autofocus",
  "android.hardware.microphone",
];

module.exports = function withOptionalScreenFeatures(config) {
  return withAndroidManifest(config, (cfg) => {
    const manifest = cfg.modResults.manifest;
    const features = (manifest["uses-feature"] ??= []);
    for (const name of OPTIONAL_FEATURES) {
      const existing = features.find((feature) => feature.$?.["android:name"] === name);
      if (existing) existing.$["android:required"] = "false";
      else features.push({ $: { "android:name": name, "android:required": "false" } });
    }
    return cfg;
  });
};
