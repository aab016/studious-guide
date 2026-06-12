# Quick start

Da qua https://github.com/meta-quest/bubblewrap/blob/main/bubblewrap/Dockerfile#L3C28-L3C54 ho scoperto esistenza di @meta-quest/bubblewrap-cli

Altrimenti loro suggerivano di buildare
https://developers.meta.com/horizon/documentation/web/pwa-packaging/

Installato JDK Temurin (Eclipse Foundation) version 17 via GitHub Codespace .devcontainer/devcontainer.json features.

- cd app
- npm install
- alias bubblewrap=${PWD}/node_modules/.bin/bubblewrap

La versione 6609375 è hardcoded qua
https://github.com/meta-quest/bubblewrap/blob/bde45f6ea3bd4eb958193575cd71a8b7b3e99a77/bubblewrap/packages/cli/src/lib/AndroidSdkToolsInstaller.ts#L22-L26

- wget https://dl.google.com/android/repository/commandlinetools-linux-6609375_latest.zip
- unzip commandlinetools-linux-6609375_latest.zip


https://developer.android.com/tools/sdkmanager tricky session
- mkdir android_sdk
- mv tools android_sdk/
- mkdir -p android_sdk/cmdline-tools/latest
- mv android_sdk/tools/bin android_sdk/cmdline-tools/latest/
- mv android_sdk/tools/lib android_sdk/cmdline-tools/latest/
- mv android_sdk/tools/NOTICE.txt android_sdk/cmdline-tools/latest/
- mv android_sdk/tools/source.properties android_sdk/cmdline-tools/latest/
- rm -Rf android_sdk/tools
- `export PATH=$PATH:${PWD}/android_sdk/cmdline-tools/latest/bin`

Installare Android SDK API level 23
- sdkmanager "platforms;android-23" "build-tools;23.0.3" "platform-tools"


`cd my-pwa`

`bubblewrap init --manifest=https://aab016.github.io/manifest.json --metaquest`
- JDK path: /usr/local/sdkman/candidates/java/current
- Android SDK path: /workspaces/studious-guide/app/android_sdk/cmdline-tools/latest
- Splash screen color: #6b46c1
- Maskable icon URL: https://aab016.github.io/studious-guide/assets/metaverso-a-scuola.black.square.512x512.png
- Monochrome icon URL: vuoto

Prima creazione del keystore
- First and Last names (eg: John Doe): Luigi Lagrange
- Organizational Unit (eg: Engineering Dept): Computer Science Dept
- Organization (eg: Company Name): MIIS038002

Ripristinare da Google Drive
https://drive.google.com/drive/folders/1VWvVyD0qJnHImTOUMDNK-xhmSnemyxK1
- Keystore: /workspaces/studious-guide/app/my-pwa/android.keystore
- Gradle: /workspaces/studious-guide/app/my-pwa/gradle/wrapper/gradle-wrapper.jar

Per evitare che i log di gradle sfondino il maxBuffer di node...
- `export ANDROID_HOME=/workspaces/studious-guide/app/android_sdk`
- chmod +x gradlew
- ./gradlew assembleRelease
- unset ANDROID_HOME

`Caused by: java.lang.IllegalStateException: Failed to find target with hash string 'android-32' in: /workspaces/studious-guide/app/android_sdk/cmdline-tools/latest`

- sdkmanager "platforms;android-32" "build-tools;32.0.0"
- sdkmanager --licenses

FTW
`cp ../GradleWrapper.js /workspaces/studious-guide/app/node_modules/@meta-quest/bubblewrap-core/dist/lib/GradleWrapper.js`

`bubblewrap build`

# Create Digital Asset Link for your PWA
https://developers.meta.com/horizon/documentation/web/pwa-packaging/#create-digital-asset-link-for-your-pwa

keytool -list -v \
    -keystore /workspaces/studious-guide/app/my-pwa/android.keystore \
    -alias android \
    -keypass '' \
    -storepass '' | grep SHA256

bubblewrap fingerprint add B8:FC:20:E0:B4:2C:95:C7:FD:CD:57:51:95:43:49:13:A9:80:51:E6:3D:BA:C4:26:00:E4:73:09:7C:A5:B0:C1

# Android SDK e JDK 17 per Windows

https://developer.android.com/studio#command-line-tools-only

https://adoptium.net/en-GB/temurin/releases?version=17

Estrarre in C:/, modificare variabili d'ambiente ANDROID_SDK e JAVA_HOME, aggiungere le bin (sia JDK che cmdline-tools/platform-tools) alla PATH.

Dal cancello ho rimosso dalla PATH
- C:\Program Files (x86)\Common Files\Oracle\Java\java8path
- C:\Program Files (x86)\Common Files\Oracle\Java\javapath
