export default {
  expo: {
    name: "bulingo",
    slug: "bulingo",
    version: "0.1.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "no"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      permissions: ["ACCESS_NETWORK_STATE"],
      package: "com.ahmetoguzengin.bulingo",
      softwareKeyboardLayoutMode: "pan",
    },
    
    extra: {
      eas: {
        projectId: "665dbb53-e753-4d3a-bc77-e46e81151006"
      },
      router: {
        origin: false
      }
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      "expo-font",
      [
        "expo-build-properties",
        {
          android: {
            usesCleartextTraffic: true
          }
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    }
  }
};
