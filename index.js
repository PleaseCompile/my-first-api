const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'สวัสดีจาก API ของฉัน!' });
});

app.get('/test', (req, res) => {
  res.json({ status: 'API ทำงานปกติ', time: new Date() });
});

app.listen(PORT, () => {
  console.log(`Server กำลังทำงานที่ port ${PORT}`);
});
