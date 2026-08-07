package com.khashbah.familytree;

import android.content.Intent;
import android.content.res.Configuration;
import android.net.Uri;
import android.os.Bundle;
import android.util.Base64;
import android.view.ViewGroup;
import android.view.Window;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.core.content.FileProvider;

import java.io.File;
import java.io.FileOutputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;

public class MainActivity extends android.app.Activity {

    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // إخفاء شريط العنوان الافتراضي لأندرويد — الصفحة نفسها لها عنوانها
        // وتصميمها الخاص، وشريط أندرويد الإضافي كان يقتطع جزءًا من أعلى
        // الشاشة ويسبب قطع زر "خروج" فى وضع ملء الشاشة.
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        super.onCreate(savedInstanceState);

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
                            "com.khashbah.familytree.fileprovider",
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

        // مشاركة التطبيق نفسه: يستخرج ملف الـ APK المثبت فعليًا على الجهاز
        // ويشاركه مباشرة، حتى يقدر الشخص المُستقبِل تثبيت التطبيق فورًا
        // دون الحاجة لأي رابط تنزيل خارجي.
        @JavascriptInterface
        public void shareApk(final String caption) {
            runOnUiThread(() -> {
                try {
                    String apkPath = getPackageManager()
                            .getApplicationInfo(getPackageName(), 0).sourceDir;
                    File srcFile = new File(apkPath);
                    File dir = new File(getCacheDir(), "shared");
                    if (!dir.exists()) dir.mkdirs();
                    File destFile = new File(dir, "شجرة_عائلة_خشبه.apk");

                    InputStream in = new FileInputStream(srcFile);
                    OutputStream out = new FileOutputStream(destFile);
                    byte[] buffer = new byte[8192];
                    int len;
                    while ((len = in.read(buffer)) > 0) {
                        out.write(buffer, 0, len);
                    }
                    in.close();
                    out.close();

                    Uri contentUri = FileProvider.getUriForFile(
                            MainActivity.this,
                            "com.khashbah.familytree.fileprovider",
                            destFile);

                    Intent shareIntent = new Intent(Intent.ACTION_SEND);
                    shareIntent.setType("application/vnd.android.package-archive");
                    shareIntent.putExtra(Intent.EXTRA_STREAM, contentUri);
                    if (caption != null && !caption.isEmpty()) {
                        shareIntent.putExtra(Intent.EXTRA_TEXT, caption);
                    }
                    shareIntent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                    startActivity(Intent.createChooser(shareIntent, "مشاركة التطبيق"));
                } catch (Exception e) {
                    // تجاهل بصمت — الصفحة نفسها تعرض رسالة بديلة عند الفشل
                }
            });
        }
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
