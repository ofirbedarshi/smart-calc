# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Offline Web Content

This app includes a web-based content editor that works offline. The web content is built and bundled with the APK.

### Building for Development

To build the web content for development:

```bash
npm run build:web
```

This will:
1. Build the webapp from `web-library/`
2. Copy the built files to `assets/web-content/`
3. Make the content available for offline use

### Building for Production

To build the complete Android APK with offline web content:

```bash
npm run build:android
```

This will:
1. Build the webapp and copy it to assets
2. Build the Android APK
3. Save the APK to `builds/smart-calc.apk`

### Web Content Structure

- `web-library/` - Source code for the web-based content editor
- `assets/web-content/` - Built web content (generated automatically, ignored by git)
- The WebView loads from `file:///android_asset/web-content/index.html` on Android

**Note**: The `assets/web-content/` directory is automatically generated and is in `.gitignore`. Run `npm run build:web` to generate it locally.

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
