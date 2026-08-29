package khashaba.family.tree;

import android.content.Context;
import android.content.Intent;
import android.content.res.Configuration;
import android.net.Uri;
import android.os.Bundle;
import android.print.PrintAttributes;
import android.print.PrintManager;
import android.util.Base64;
import android.view.ViewGroup;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.os.Build;
import java.security.NoSuchAlgorithmException;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.core.content.FileProvider;

import java.io.File;
import java.io.FileOutputStream;

public class MainActivity extends android.app.Activity {

    private WebView webView;
    private boolean immersiveFullscreen = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // إخفاء شريط العنوان الافتراضي لأندرويد — الصفحة نفسها لها عنوانها
        // وتصميمها الخاص، وشريط أندرويد الإضافي كان يقتطع جزءًا من أعلى
        // الشاشة ويسبب قطع زر "خروج" فى وضع ملء الشاشة.
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        super.onCreate(savedInstanceState);

        getWindow().setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE);
        webView = new WebView(this);
        webView.setLayoutParams(new ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT));
        setContentView(webView);

        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setAllowFileAccess(true);
        webSettings.setAllowContentAccess(true);
        webSettings.setCacheMode(WebSettings.LOAD_DEFAULT);
        webSettings.setUseWideViewPort(true);
        webSettings.setLoadWithOverviewMode(true);
        webSettings.setSupportZoom(true);
        webSettings.setBuiltInZoomControls(true);
        webSettings.setDisplayZoomControls(false);
        webSettings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);

        webView.setWebChromeClient(new WebChromeClient());

        // بدون هذا الجسر، أي رابط غير http/https (مثل روابط واتساب) كان
        // يفشل داخل الـ WebView برسالة "unknown URL scheme" — الآن يتم
        // تمريره لتطبيق أندرويد المناسب (واتساب، البريد، إلخ) مباشرة.
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                String scheme = uri.getScheme();
                if (scheme != null && !scheme.equals("http") && !scheme.equals("https")
                        && !scheme.equals("file")) {
                    try {
                        startActivity(new Intent(Intent.ACTION_VIEW, uri));
                    } catch (Exception e) {
                        // لا يوجد تطبيق مناسب مثبت للتعامل مع هذا الرابط
                    }
                    return true;
                }
                return false;
            }
        });

        // جسر مشاركة أصلي: الصفحة تستدعى AndroidShare.shareImageBase64(...)
        // من جافاسكريبت، فيقوم أندرويد بفتح قائمة المشاركة الأصلية للجهاز
        // (بدلاً من محاولة استخدام Web Share API غير المدعومة داخل WebView).
        webView.addJavascriptInterface(new AndroidShareBridge(), "AndroidShare");
        webView.addJavascriptInterface(new AndroidFullscreenBridge(), "AndroidFullscreen");

        webView.loadUrl("file:///android_asset/index.html");
    }

    private class AndroidShareBridge {
        @JavascriptInterface
        public void shareImageBase64(final String base64Data, final String filename, final String title) {
            runOnUiThread(() -> {
                try {
                    byte[] bytes = Base64.decode(base64Data, Base64.DEFAULT);
                    File dir = new File(getCacheDir(), "shared");
                    if (!dir.exists()) dir.mkdirs();
                    File file = new File(dir, filename);
                    FileOutputStream fos = new FileOutputStream(file);
                    fos.write(bytes);
                    fos.close();

                    Uri contentUri = FileProvider.getUriForFile(
                            MainActivity.this,
                            "khashaba.family.tree.fileprovider",
                            file);

                    Intent shareIntent = new Intent(Intent.ACTION_SEND);
                    shareIntent.setType("image/jpeg");
                    shareIntent.putExtra(Intent.EXTRA_STREAM, contentUri);
                    if (title != null && !title.isEmpty()) {
                        shareIntent.putExtra(Intent.EXTRA_TEXT, title);
                    }
                    shareIntent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                    startActivity(Intent.createChooser(shareIntent, "مشاركة الكتاب"));
                } catch (Exception e) {
                    // تجاهل بصمت — الصفحة نفسها تعرض رسالة بديلة عند الفشل
                }
            });
        }


        // التحقق يتم Native عبر PBKDF2؛ لا يوجد الرقم السري كنص داخل التطبيق.
        @JavascriptInterface
        public boolean verifyFamilyPassword(final String candidate) {
            if (candidate == null || candidate.length() > 64) return false;
            final byte[] salt = new byte[] { (byte) 0xc9, (byte) 0xb4, (byte) 0x0b, (byte) 0xdf, (byte) 0x4d, (byte) 0x54, (byte) 0x82, (byte) 0x9e, (byte) 0x63, (byte) 0x82, (byte) 0xa8, (byte) 0xdb, (byte) 0x7b, (byte) 0x18, (byte) 0x24, (byte) 0x75 };
            final byte[] expected = new byte[] { (byte) 0xcc, (byte) 0xe5, (byte) 0xbb, (byte) 0xa0, (byte) 0x29, (byte) 0x21, (byte) 0xcb, (byte) 0x3c, (byte) 0x01, (byte) 0xb0, (byte) 0x6b, (byte) 0xe5, (byte) 0xfa, (byte) 0x21, (byte) 0xc9, (byte) 0x79, (byte) 0xc8, (byte) 0xa6, (byte) 0x2c, (byte) 0x75, (byte) 0xa7, (byte) 0xbf, (byte) 0x7b, (byte) 0x9a, (byte) 0x3b, (byte) 0xa9, (byte) 0x6d, (byte) 0xa3, (byte) 0xa5, (byte) 0x15, (byte) 0x85, (byte) 0x16 };
            try {
                PBEKeySpec spec = new PBEKeySpec(candidate.toCharArray(), salt, 220000, 256);
                byte[] actual = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256").generateSecret(spec).getEncoded();
                if (actual.length != expected.length) return false;
                int diff = 0;
                for (int i = 0; i < actual.length; i++) diff |= actual[i] ^ expected[i];
                return diff == 0;
            } catch (Exception e) {
                return false;
            }
        }

        // مشاركة التطبيق نفسه: تشارك نصًا يتضمن رابط التطبيق على متجر Play.
        // هذه الطريقة (وليس مشاركة ملف الـ APK مباشرة) هى الصحيحة بعد نشر
        // التطبيق فعليًا على المتجر، لأن الرابط سيعمل تلقائيًا فور النشر
        // (باستخدام نفس applicationId المحدد فى build.gradle)، ولا يحتاج أى
        // تعديل إضافى فى الكود عند النشر.
        @JavascriptInterface
        public void shareText(final String text) {
            runOnUiThread(() -> {
                try {
                    Intent shareIntent = new Intent(Intent.ACTION_SEND);
                    shareIntent.setType("text/plain");
                    shareIntent.putExtra(Intent.EXTRA_TEXT, text);
                    startActivity(Intent.createChooser(shareIntent, "مشاركة التطبيق"));
                } catch (Exception e) {
                    // تجاهل بصمت — الصفحة نفسها تعرض رسالة بديلة عند الفشل
                }
            });
        }

        // طباعة حقيقية عبر أندرويد: استدعاء window.print() من جافاسكريبت
        // وحده لا يعمل إطلاقًا داخل WebView (بعكس المتصفح العادي) — فهو
        // يحتاج ربطًا صريحًا بخدمة الطباعة الخاصة بالنظام (PrintManager).
        // هذه الدالة هى الجسر الذي يجعل زر "طباعة PDF" يعمل فعليًا داخل
        // التطبيق، باستخدام نفس محرك الطباعة فى WebView الذي يحترم تنسيق
        // @media print الموجود بالصفحة (البرواز، العنوان، حجم الورقة...).
        @JavascriptInterface
        public void triggerPrint() {
            runOnUiThread(() -> {
                try {
                    PrintManager printManager =
                            (PrintManager) getSystemService(Context.PRINT_SERVICE);
                    String jobName = "شجرة عائلة خشبه بسمالوط";
                    android.print.PrintDocumentAdapter printAdapter =
                            webView.createPrintDocumentAdapter(jobName);
                    // نحدد حجم ورقة افتراضي يطابق تصميم البرواز (يقارب نسبة
                    // 380×250مم) — بحيث تكون الطباعة الافتراضية (بدون تغيير
                    // المستخدم لحجم الورق يدويًا) مضبوطة تمامًا من أول مرة.
                    PrintAttributes.MediaSize khashbahSize = new PrintAttributes.MediaSize(
                            "khashbah_tree", "Khashbah Tree", 14960, 9840);
                    PrintAttributes attrs = new PrintAttributes.Builder()
                            .setMediaSize(khashbahSize)
                            .setColorMode(PrintAttributes.COLOR_MODE_COLOR)
                            .build();
                    printManager.print(jobName, printAdapter, attrs);
                } catch (Exception e) {
                    // تجاهل بصمت — لا توجد خدمة طباعة متاحة على هذا الجهاز
                }
            });
        }
    }


    private class AndroidFullscreenBridge {
        @JavascriptInterface
        public void enterImmersive() {
            runOnUiThread(() -> {
                immersiveFullscreen = true;
                applyImmersiveFlags();
            });
        }

        @JavascriptInterface
        public void exitImmersive() {
            runOnUiThread(() -> {
                immersiveFullscreen = false;
                getWindow().getDecorView().setSystemUiVisibility(0);
            });
        }
    }

    private void applyImmersiveFlags() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            getWindow().getInsetsController().hide(android.view.WindowInsets.Type.systemBars());
            getWindow().getInsetsController().setSystemBarsBehavior(
                    android.view.WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
        } else {
            getWindow().getDecorView().setSystemUiVisibility(
                    View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                            | View.SYSTEM_UI_FLAG_FULLSCREEN
                            | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                            | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                            | View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
        }
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus && immersiveFullscreen) applyImmersiveFlags();
    }

    @Override
    public void onBackPressed() {
        if (immersiveFullscreen) {
            immersiveFullscreen = false;
            getWindow().getDecorView().setSystemUiVisibility(0);
            webView.evaluateJavascript("if(window.exitTreeFullscreenFromNative){window.exitTreeFullscreenFromNative();}", null);
            return;
        }
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
