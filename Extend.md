Architectural Goals
-------------------

- This app should be available on mobile. (Android / iOS)
- Replace *mongodb* with **Postgresql**.
- Remove **polling** entirely.
- Support Direct communication link between peers (*WebRTC*?).
- Persist nothing on the server except offline messages (a la *WhatsApp*!?)
- Add full text **encryption**
- Ability to chat with users present on the same **LAN/auto discovery**, instead of registering. (Intercom? Where will the server run? P2P.)

Feature Goals
-------------

- Track if users are online/offline (over P2P? LAN based groups?).
- Add support for "blue tick". (But how will you support on browser in a peer communication environment?)
- Unread messages notifier over the user and offline support.
- Add support for emojis.
- Apply 2 way scroll to fetch older data.
- Add support for files/media content.
- Add video/audio calling support. (I am thinking P2P-WebRTC)

