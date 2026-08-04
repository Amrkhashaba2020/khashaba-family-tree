# تطبيق شجرة عائلة خشبه

## التعديلات المُجراة

1. ✅ تم استبدال كلمة "ضريح" بـ "قبر" (25 استبدال)
2. ✅ تم استبدال كلمة "أضرحة" بـ "قبور" (1 استبدال)
3. ✅ تم إضافة زر "ملء الشاشة" للشجرة التفاعلية
4. ✅ تم إضافة توقيع في أسفل الصفحة

## كيفية بناء التطبيق

### الطريقة 1: Android Studio

1. قم بفك ضغط ملف المشروع
2. افتح Android Studio
3. اختر `File > Open` وحدد مجلد المشروع
4. انتظر حتى ينتهي Gradle من التحميل
5. اضغط `Run > Run 'app'` أو `Build > Build Bundle(s) / APK(s) > Build APK(s)`

### الطريقة 2: استخدام سطر الأوامر

```bash
cd KhashbahFamilyTree
./gradlew assembleDebug
```

سيتم إنشاء ملف APK في:
`app/build/outputs/apk/debug/app-debug.apk`

### متطلبات
- Android Studio Hedgehog (2023.1.1) أو أحدث
- SDK 34
- JDK 17

## هيكل المشروع

```
KhashbahFamilyTree/
├── app/
│   ├── src/main/
│   │   ├── java/com/khashbah/familytree/
│   │   │   └── MainActivity.java
│   │   ├── res/
│   │   │   ├── layout/activity_main.xml
│   │   │   └── values/
│   │   │       ├── strings.xml
│   │   │       ├── colors.xml
│   │   │       └── styles.xml
│   │   ├── assets/
│   │   │   └── index.html
│   │   └── AndroidManifest.xml
│   ├── build.gradle
│   └── proguard-rules.pro
├── build.gradle
├── settings.gradle
└── gradle.properties
```

## ملاحظات
- التطبيق يستخدم WebView لعرض شجرة العائلة التفاعلية
- يدعم اللغة العربية والاتجاه من اليمين لليسار
- يدعم تكبير/تصغير الشاشة
- يعمل على Android 5.0 (API 21) وأحدث
