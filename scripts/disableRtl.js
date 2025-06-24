const fs = require('fs');
const path = require('path');

const manifestPath = path.join(__dirname, '../android/app/src/main/AndroidManifest.xml');

if (!fs.existsSync(manifestPath)) {
  console.error('❌ AndroidManifest.xml not found.');
  process.exit(1);
}

let content = fs.readFileSync(manifestPath, 'utf8');

if (content.includes('android:supportsRtl="true"')) {
  content = content.replace('android:supportsRtl="true"', 'android:supportsRtl="false"');
  fs.writeFileSync(manifestPath, content, 'utf8');
  console.log('✅ android:supportsRtl changed to false in AndroidManifest.xml');
} else if (!content.includes('android:supportsRtl=')) {
  content = content.replace('<application ', '<application android:supportsRtl="false" ');
  fs.writeFileSync(manifestPath, content, 'utf8');
  console.log('✅ android:supportsRtl=false inserted into <application> tag');
} else {
  console.log('ℹ️ No changes made. android:supportsRtl is already set to false.');
}
