# College Chat Mobile Application

A React Native mobile application that provides an AI-powered chatbot interface for college students, integrated with knowledge base search, categories, and admin features.

## 🚀 Features

- **AI Chat Interface** - Real-time chat with college assistant bot
- **Knowledge Base Search** - Search and find detailed information
- **Categories Browser** - Browse available information categories
- **Admin Panel** - Secure administrator access
- **Modern UI** - Material Design with vibrant colors
- **Full TypeScript** - Type-safe development

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Android Studio (for Android development)
- Xcode (for iOS development, Mac only)

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Vector Icons for Android

Add the following line to `android/app/build.gradle`:

```gradle
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

See [VECTOR_ICONS_SETUP.md](VECTOR_ICONS_SETUP.md) for detailed instructions.

### 3. Clean Build (Android)

```bash
cd android
./gradlew clean
cd ..
```

## 🏃 Running the App

### Start Metro Bundler

```bash
npm start
```

### Run on Android

```bash
npm run android
```

### Run on iOS (Mac only)

```bash
npm run ios
```

## 📦 Tech Stack

- **React Native** - Mobile framework
- **TypeScript** - Type safety
- **React Navigation** - Navigation library
- **React Native Paper** - UI components
- **Axios** - HTTP client
- **AsyncStorage** - Local storage
- **Vector Icons** - Icon library

## 🔌 API Integration

The app integrates with the College Chatbot API:

- **Base URL:** `http://app.undefineddevelopers.online/collegechatbot`
- **Chat:** POST `/api/chat/query`
- **Admin Login:** POST `/api/admin/login`
- **Knowledge Search:** GET `/api/knowledge/search`
- **Categories:** GET `/api/categories`

## 📁 Project Structure

```
src/
├── Navigation/       # Navigation configuration
├── screens/          # App screens
├── services/         # API services
└── types/            # TypeScript types
```

## 🎨 Color Scheme

- Primary: `#6200EE` (Purple)
- Accent: `#03DAC6` (Teal)
- Background: `#F5F5F5` (Light Gray)

## 📄 License

Private Project

## 👥 Author

College Chat Team
