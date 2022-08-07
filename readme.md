# STEPS TO FOLLOW

A React Native Template/Boilerplate containing the best practices and scalable design with cutting edge technologies like CodePush/Sentry and all other neccessary libraries pre-configured to save your time.

# 1. Install dependencies

Commands:
yarn or npm i

# 2. Install Pods

Commands:
cd ios
pod install

# 3. Setup sentry

Commands:
npx @sentry/wizard -i reactNative -p ios android

modify the SENTRY URL from .env file (if .env does not exist, make one with "SENTRY" variable).

# 4. CodePush Setup

**Install CLI** <br/>
`npm install -g appcenter-cli`

**Generate Private Key files for code signing:** <br/>
We will need these files later for code signing in Android & iOS
Commands:
For Private key:<br>
`openssl genrsa -out codePushPrivateKey.pem`

For public key<br>
`openssl rsa -pubout -in codePushPrivateKey.pem -out codePushPublicKey.pem`

### CodePush iOS Setup

Follow library's get started docs for iOS: https://github.com/microsoft/react-native-code-push/blob/master/docs/setup-ios.md

**Integrate the SDK**

For updated docs visit:
(https://docs.microsoft.com/en-us/appcenter/sdk/getting-started/react-native)[https://docs.microsoft.com/en-us/appcenter/sdk/getting-started/react-native]
and
(https://docs.microsoft.com/en-us/appcenter/distribution/codepush/rn-deployment)[https://docs.microsoft.com/en-us/appcenter/distribution/codepush/rn-deployment]

Run pod install from iOS directory to install CocoaPods dependencies.

Note: Integrating the iOS SDK requires CocoaPods. If you want to integrate manually, follow these steps.

Create a new file with the name AppCenter-Config.plist with the following content. Don't forget to add this file to the Xcode project (right-click the app in Xcode and click Add files to <App Name>...).

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "https://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
    <key>AppSecret</key>
    <string>{Your app secret here}</string>
    </dict>
</plist>

```

You can get the app secret from codepush app's overview page.

Modify the app's AppDelegate.m file to include code for starting SDK:

Add these lines to import section above the `#if DEBUG` or `#ifdef FB_SONARKIT_ENABLED` declaration (if present):

```
#import <AppCenterReactNative.h>
#import <AppCenterReactNativeAnalytics.h>
#import <AppCenterReactNativeCrashes.h>

```

Add these lines to the `didFinishLaunchingWithOptions` method

```
[AppCenterReactNative register];
[AppCenterReactNativeAnalytics registerWithInitiallyEnabled:true];
[AppCenterReactNativeCrashes registerWithAutomaticProcessing];

```

**MutliDeployment Integration iOS**
Xcode allows you to define custom build settings for each "configuration" (like debug, release), which can be referenced as the value of keys within the Info.plist file (like the CodePushDeploymentKey setting). This mechanism allows you to easily configure your builds to produce binaries, which are configured to synchronize with different CodePush deployments.

To set this up, follow these steps:

1. Open up your Xcode project and select your project in the Project navigator window

2. Ensure the project node is selected, as opposed to one of your targets

3. Select the Info tab

4. Click the + button within the Configurations section and select Duplicate "Release" Configuration
5. Name the new configuration Staging (or whatever you prefer)

6. Select the Build Settings tab

7. Click the + button on the toolbar and select Add User-Defined Setting

Name this setting MULTI_DEPLOYMENT_CONFIG. Go to the setting and add value $(BUILD_DIR)/$(CONFIGURATION)$(EFFECTIVE_PLATFORM_NAME) for Release. After that add value $(BUILD_DIR)/Release$(EFFECTIVE_PLATFORM_NAME) for Staging.

8. Click the + button again on the toolbar and select Add User-Defined Setting

Name this setting CODEPUSH_KEY, expand it, and specify your Staging deployment key for the Staging configuration and your Production deployment key for the Release configuration.

9. Open the project's Info.plist file and change the value of your CodePushDeploymentKey entry to $(CODEPUSH_KEY)

And that's it! Now when you run or build your app, your staging builds will automatically be configured to sync with your Staging deployment, and your release builds will be configured to sync with your Production deployment.

### Code Signing For iOS
In order to configure Public Key for bundle verification you need to add record in Info.plist with name CodePushPublicKey and string value of public key content. Example:

```
<plist version="1.0">
  <dict>
    <!-- ...other configs... -->

    <key>CodePushPublicKey</key>
        <string>-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANkWYydPuyOumR/sn2agNBVDnzyRpM16NAUpYPGxNgjSEp0etkDNgzzdzyvyl+OsAGBYF3jCxYOXozum+uV5hQECAwEAAQ==
-----END PUBLIC KEY-----</string>

    <!-- ...other configs... -->
  </dict>
</plist>

```

### CodePush Android Setup

Follow library's get started docs for android: https://github.com/microsoft/react-native-code-push/blob/master/docs/setup-android.md

**Integrate the SDK**
Create a new file with the filename `appcenter-config.json` in `android/app/src/main/assets/` with the following content:

```
{
  "app_secret": "{Your app secret here}"
}
```

Modify the app's res/values/strings.xml to include the following lines:

```
<string name="appCenterCrashes_whenToSendCrashes" moduleConfig="true" translatable="false">DO_NOT_ASK_JAVASCRIPT</string>
<string name="appCenterAnalytics_whenToEnableAnalytics" moduleConfig="true" translatable="false">ALWAYS_SEND</string>
```

**MutliDeployment Integration Android**

1. Open the project's app level `build.gradle` file (for example `android/app/build.gradle` in standard React Native projects)

2. Find the android `{ buildTypes {} }` section and define `resValue` entries for both your `debug` and `release` build types, which reference your `Staging` and `Production` deployment keys respectively.

```
android {
    ...
    buildTypes {
        debug {
            ...
            // Note: CodePush updates shouldn't be tested in Debug mode as they're overriden by the RN packager. However, because CodePush checks for updates in all modes, we must supply a key.
            resValue "string", "CodePushDeploymentKey", ""
            ...
        }
        releaseStaging {
            ...
            resValue "string", "CodePushDeploymentKey", "<INSERT_STAGING_KEY>"
            // Note: It's a good idea to provide matchingFallbacks for the new buildType you create to prevent build issues
            // Add the following line if not already there
            matchingFallbacks = ['release']
            ...
            //  do add your singing and other configurations for staging apk here, maybe copy the same from release object.
        }
        release {
            ...
            resValue "string", "CodePushDeploymentKey", "<INSERT_PRODUCTION_KEY>"
            ...
        }
    }
    ...
}
```

Note:
Now if you want to build an staging apk, the command for that will be `cd android && ./gradlew assembleReleaseStaging`, and you'll find the output on `android/app/build/outputs/apk/releaseStaging`

Reminder:
As a reminder, you can retrieve deployment keys by running appcenter codepush deployment list -a <ownerName>/<appName> -k from your terminal, or just go to codepush dashboard open the app and navigate to distribute/codepush on this screen click on `Create standard deployments` button, after clicking this button you'll see a setting icon and top right corner, click on it and you'll get deployment keys for both staging and production deployment/environments.

### Code Signing For Android
Add `CodePushPublicKey` string item to `/path_to_your_app/android/app/src/main/res/values/strings.`xml. It may looks like this:

```
<resources>
   <string name="app_name">my_app</string>
   <string name="CodePushPublicKey">-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtPSR9lkGzZ4FR0lxF+ZA
P6jJ8+Xi5L601BPN4QESoRVSrJM08roOCVrs4qoYqYJy3Of2cQWvNBEh8ti3FhHu
tiuLFpNdfzM4DjAw0Ti5hOTfTixqVBXTJPYpSjDh7K6tUvp9MV0l5q/Ps3se1vud
M1/X6g54lIX/QoEXTdMgR+SKXvlUIC13T7GkDHT6Z4RlwxkWkOmf2tGguRcEBL6j
ww7w/3g0kWILz7nNPtXyDhIB9WLH7MKSJWdVCZm+cAqabUfpCFo7sHiyHLnUxcVY
OTw3sz9ceaci7z2r8SZdsfjyjiDJrq69eWtvKVUpredy9HtyALtNuLjDITahdh8A
zwIDAQAB
-----END PUBLIC KEY-----</string>
</resources>
```
