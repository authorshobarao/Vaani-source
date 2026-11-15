---
name: pnpm phantom deps in Expo mobile app
description: How to fix "Cannot find module '@babel/...'" Metro red-screen errors caused by undeclared dependencies under pnpm strict layout
---
Rule: when Metro/Expo red-screens with "Cannot find module '@babel/xxx'" and the require stack points inside a node_modules package (e.g. react-native-worklets/plugin), it is a phantom dependency broken by pnpm's strict node_modules layout. Fix it by adding the missing packages under `packageExtensions` for that package in `pnpm-workspace.yaml`, then `pnpm install` and restart the expo workflow.

**Why:** react-native-worklets 0.5.1 requires @babel/generator, @babel/traverse, and @babel/types without declaring them; works with hoisted npm/yarn but not pnpm. Manual installs in the app package do NOT fix it (the plugin resolves from its own location).

**How to apply:** verify the fix by fetching `https://$REPLIT_EXPO_DEV_DOMAIN/.expo/.virtual-metro-entry.bundle?platform=ios&dev=true&hot=false&lazy=true` — 200 with a multi-MB body means bundling works. (`/index.bundle` and `/node_modules/expo-router/entry.bundle` return 404 for this expo-router app.)
