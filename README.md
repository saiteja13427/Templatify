# Image Editor

This is an application meant for ecommerce banner creation. The app have templates which can be edited and required text can be added.

Upon editing you can easily save and share the template.

## Usage

If you just want to try it, you can follow debug mode steps or else you can follow release mde steps.

### Debug Mode

1. Clone the project.
2. Run `npm i`
3. Run `npx react-native run-android` & `npx react-native start` on different terminals.
4. The app will run on android simulator if you have it setup or if you have connected device it will run on it.

### Release Mode

1. Clone the project.
2. Run `npm i`
3. Create an upload key using `keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000`. More details [here](https://reactnative.dev/docs/signed-apk-android#generating-an-upload-key)
4. Edit the gradle variabled in android/gradle.properties. More details [here](https://reactnative.dev/docs/signed-apk-android#setting-up-gradle-variables)
5. Inside android folder run `./gradlew assembleRelease` and then `./gradlew bundleRelease`
6. The APK will be generated android/app/build/outputs/apk/release/
7. You can test this by running `npx react-native run-android --variant=release`

For more information please refer react native docs [here](https://reactnative.dev/docs/signed-apk-android)
