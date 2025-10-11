const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware เพื่ออ่าน JSON
app.use(express.json());

// 1. Endpoint เดิม - หน้าหลัก
app.get('/', (req, res) => {
  res.json({ 
    message: 'สวัสดีจาก API ของฉัน!',
    version: '2.0',
    endpoints: [
      'GET /',
      'GET /test',
      'GET /time',
      'GET /calculate/:num1/:num2',
      'POST /echo',
      'GET /user/:name'
    ]
  });
});

// 2. Test endpoint
app.get('/test', (req, res) => {
  res.json({ 
    status: 'API ทำงานปกติ', 
    time: new Date() 
  });
});

// 3. เพิ่มใหม่ - แสดงเวลาปัจจุบัน
app.get('/time', (req, res) => {
  const now = new Date();
  res.json({
    datetime: now.toISOString(),
    timezone: 'UTC',
    timestamp: now.getTime(),
    readable: now.toLocaleString('th-TH', { 
      timeZone: 'Asia/Bangkok' 
    })
  });
});

// 4. เพิ่มใหม่ - คำนวณตัวเลข
app.get('/calculate/:num1/:num2', (req, res) => {
  const num1 = parseFloat(req.params.num1);
  const num2 = parseFloat(req.params.num2);
  
  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ 
      error: 'กรุณาใส่ตัวเลขที่ถูกต้อง' 
    });
  }
  
  res.json({
    numbers: { num1, num2 },
    results: {
      sum: num1 + num2,
      difference: num1 - num2,
      product: num1 * num2,
      quotient: num2 !== 0 ? num1 / num2 : 'ไม่สามารถหารด้วย 0'
    }
  });
});

// 5. เพิ่มใหม่ - Echo (ส่งอะไรกลับมาอะไร)
app.post('/echo', (req, res) => {
  res.json({
    message: 'คุณส่งข้อมูลมาดังนี้:',
    data: req.body,
    receivedAt: new Date().toISOString()
  });
});

// 6. เพิ่มใหม่ - ทักทายตามชื่อ
app.get('/user/:name', (req, res) => {
  const name = req.params.name;
  const greeting = req.query.greeting || 'สวัสดี';
  
  res.json({
    message: `${greeting} คุณ${name}!`,
    name: name,
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'ไม่พบ endpoint นี้',
    path: req.path,
    suggestion: 'ลองดู GET / เพื่อดูรายการ endpoints ทั้งหมด'
  });
});

app.listen(PORT, () => {
  console.log(`Server กำลังทำงานที่ port ${PORT}`);
});
