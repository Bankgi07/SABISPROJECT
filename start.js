const { spawn, exec } = require('child_process');
const path = require('path');

console.log('================================================================');
console.log('🚀 เริ่มต้นระบบ TRAIN TMS (Dynamics Motion Training System)');
console.log('   บูรณาการรายวิชา SA & BIS · ภาควิชาคอมพิวเตอร์ ม.ศิลปากร');
console.log('================================================================\n');

const backendDir = path.join(__dirname, 'backend');
const frontendDir = path.join(__dirname, 'frontend');

// เริ่มต้น Backend Express Server (Port 5000)
console.log('⚙️  กำลังสตาร์ท Backend API Server (Port 5000)...');
const backend = spawn('node', ['server.js'], {
  cwd: backendDir,
  stdio: 'inherit',
  shell: true
});

// เริ่มต้น Frontend Vite Dev Server (Port 5173)
console.log('🎨 กำลังสตาร์ท Frontend React Application (Port 5173)...');
const frontend = spawn('npx', ['vite', '--host'], {
  cwd: frontendDir,
  stdio: 'inherit',
  shell: true
});

// เปิดเบราว์เซอร์อัตโนมัติ
setTimeout(() => {
  const url = 'http://localhost:5173';
  console.log(`\n🌐 กำลังเปิดเบราว์เซอร์ไปที่: ${url}`);
  const startCmd = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
  exec(`${startCmd} ${url}`);
}, 1500);

// จัดการการปิดโปรแกรม
function shutdown() {
  console.log('\n🛑 กำลังปิดการทำงานของระบบ...');
  try { backend.kill(); } catch (e) {}
  try { frontend.kill(); } catch (e) {}
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
