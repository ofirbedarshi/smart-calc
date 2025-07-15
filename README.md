# Smart Calc - Developer Guide

## Project Overview
This is an [Expo](https://expo.dev) React Native project with a local WebView integration. It supports running on Android devices (emulator or physical) and includes a local web server for development.

---

## Prerequisites
- Node.js & npm
- Android Studio (for emulator and platform tools)
- Expo CLI (`npm install -g expo-cli`)
- USB cable for connecting a physical Android phone

---

## 1. Running the App (Android)

### On Emulator
1. Start the Android emulator:
   ```sh
   npm run android:emulator
   ```
2. Run the app:
   ```sh
   npm run android
   ```

### On Physical Device
1. **Enable Developer Mode & USB Debugging on your phone:**
   - Go to **Settings > About phone** and tap **Build number** 7 times to enable Developer Mode.
   - Go to **Settings > Developer options** and enable **USB debugging**.
2. **Connect your phone via USB.**
3. **Verify your computer recognizes the device:**
   ```sh
   adb devices
   ```
   - You should see your device listed (not as "unauthorized" or "offline").
   - If you see "unauthorized", check your phone for a prompt and accept it.
4. **Forward the webview port (5173) to your phone:**
   ```sh
   npm run android:reverse
   ```
5. **Run the app:**
   ```sh
   npm run android
   ```

---

## 2. Running the WebView (Local Dev)

The app uses a local web server for the WebView in development mode.

1. Start the web server:
   ```sh
   npm run dev:web
   ```
   - This runs the web content on `http://localhost:5173` (for Android, after port forwarding).
2. Make sure your app is running on the emulator or your phone (see above).
3. The WebView in the app will load the local web content automatically in development mode.

**Note:**
- If you are on a physical device, you must run `npm run android:reverse` every time you reconnect your phone or restart adb.
- For production builds, the web content is bundled into the app and no server is needed.

---

## 3. Setting Up a New Phone for Development

1. **Enable Developer Mode:**
   - Go to **Settings > About phone**.
   - Tap **Build number** 7 times until you see "You are now a developer!".
2. **Enable USB Debugging:**
   - Go to **Settings > Developer options**.
   - Turn on **USB debugging**.
3. **Connect your phone to your computer via USB.**
4. **Authorize your computer:**
   - When prompted on your phone, allow USB debugging access.
5. **Verify connection:**
   - Run `adb devices` in your terminal. Your device should appear as `device` (not `unauthorized` or `offline`).
6. **Forward the dev server port:**
   - Run `npm run android:reverse` to forward port 5173 for the WebView.
7. **Run the app:**
   - Run `npm run android` to install and launch the app on your phone.

---

## 4. Useful Scripts
- `npm run android` — Run the app on a connected device or emulator.
- `npm run android:emulator` — Start the Android emulator.
- `npm run dev:web` — Start the local web server for the WebView.
- `npm run android:reverse` — Forward port 5173 from your computer to all connected physical Android devices (required for WebView in dev mode).
- `npm run build:android` — Build a production APK (includes bundled web content).

---

## 5. Troubleshooting & Tips
- **WebView not loading?**
  - Make sure the web server is running (`npm run dev:web`).
  - Make sure you ran `npm run android:reverse` if on a physical device.
  - Check that your device is listed as `device` in `adb devices`.
- **Multiple devices/emulators connected?**
  - Disconnect unused devices or specify the device with `adb -s <device-id> ...`.
- **Port forwarding is temporary:**
  - You must re-run `npm run android:reverse` after reconnecting your phone or restarting adb.
- **Production builds:**
  - The WebView loads static content from the app bundle; no server or port forwarding needed.

---

## 6. Additional Notes
- The app uses dynamic safe area insets for proper layout on all devices.
- All user-facing text is in Hebrew and supports RTL layout.
- For more details on the web content, see the `web-library/` folder.

---

Happy coding! 🚀
