# Vector Icons Configuration for Android

## File: android/app/build.gradle

Add the following line at the end of the file to enable vector icons:

```gradle
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

## Complete Instructions:

1. Open the file: `android/app/build.gradle`

2. Scroll to the very bottom of the file

3. Add this line at the end:

   ```gradle
   apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
   ```

4. Save the file

5. Clean and rebuild the Android project:
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```

This will ensure all Material Community Icons are properly loaded in your React Native app.

## Alternative Location (if the above doesn't work):

If you need to add it in a different location, you can also add it after the `apply plugin` statements near the top of the file, but typically it's added at the end.

## Verification:

After adding this line and rebuilding, all Icon components in the app (using `react-native-vector-icons/MaterialCommunityIcons`) will display correctly.
