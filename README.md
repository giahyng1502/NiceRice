# 🌾 Nice Rice – Real-time Chat Application

**Nice Rice** is a cross-platform real-time chat application built with **React Native**, providing a smooth, secure, and modern messaging experience. It supports 1-1 messaging, group chats, profile management, notifications, and user moderation — all powered by a scalable backend and real-time socket communication.

---

## 🚀 Features

- ✅ **Real-time Messaging** with [Socket.IO](https://socket.io/)
- 👥 **Group Chat** with member management and renaming
- 👤 **User Profiles** – View and update your own and others’ profiles
- ⚠️ **Report & Delete Users** – Admin moderation tools
- 🔔 **Push Notifications** with [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging) and Notifee
- 📅 **Message History Grouped by Date** – with local cache
- 🔍 **User & Group Search** – Smart and fast filtering
- 🔄 **Auto-update with CodePush** – Hotfixes without app store resubmission

---

## 🧱 Tech Stack

### 🖥 Frontend

- React Native
- Redux Toolkit / Redux thunk
- FlashList (for performant chat list)
- Notifee (for push notifications)

## 🗂️ Folder Structure

### 🔧 Backend

- Node.js + Express
- WebSocket / Socket.IO
- DynamoDB or MongoDB (NoSQL DB)
- JWT Authentication

### ☁️ Others

- Firebase Cloud Messaging (FCM)
- Firebase Auth
  = Firebase Crashlytic
- Realm (for local caching)

## 📷 App Screenshots

<p align="center">
  <img src="./src/assets/demo/login.png" alt="Login Screen" width="250"/>
  <img src="./src/assets/demo/resiger.png" alt="Chat Screen" width="250"/>
  <img src="./src/assets/demo/conversation.png" alt="Group Chat Screen" width="250"/>
</p>

<p align="center">
  <img src="./src/assets/demo/message.png" alt="Login Screen" width="250"/>
  <img src="./src/assets/demo/addMember.png" alt="Chat Screen" width="250"/>
  <img src="./src/assets/demo/member-group.png" alt="Group Chat Screen" width="250"/>
</p>

<p align="center">
  <img src="./src/assets/demo/report.png" alt="Login Screen" width="250"/>
  <img src="./src/assets/demo/confirm-block.png" alt="Chat Screen" width="250"/>
  <img src="./src/assets/demo/profile.png" alt="Group Chat Screen" width="250"/>
</p>

<p align="center">
  <img src="./src/assets/demo/editProfile.png" alt="Login Screen" width="250"/>
  <img src="./src/assets/demo/delete-account.png" alt="Chat Screen" width="250"/>
  <img src="./src/assets/demo/comfirm-delete.png" alt="Group Chat Screen" width="250"/>
</p>
<p align="center">
  <img src="./src/assets/demo/setting.png" alt="Login Screen" width="250"/>
  <img src="./src/assets/demo/select-lang.png" alt="Chat Screen" width="250"/>
</p>

### 📦 Clone the repo

```bash
git clone https://github.com/yourusername/nice-rice.git
cd nice-rice
```

## 🙋‍♂️ Author

Hoàng Văn Hưng
– React Native Developer

- Portfolio: github.com/giahyng1502
- Email: hungcy1502@gmail.com
