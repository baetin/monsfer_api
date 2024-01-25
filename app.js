const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { session, sessionStore } = require('./session');
const { swaggerUi, specs } = require('./swagger.js');
const { initializeDatabase } = require('./db');
const artworkRouter = require('./routes/artwork');
const bgcolorRouter = require('./routes/bgcolor');
const orderRouter = require('./routes/order');
const fontRouter = require('./routes/font');
const fontcolorRouter = require('./routes/fontcolor');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 데이터베이스 초기화
initializeDatabase()
  .then(() => {
    // 미들웨어 등록
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // 세션 미들웨어 등록
    app.use(
      session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: sessionStore,
      })
    );

    // Swagger UI 미들웨어 설정
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

    // 라우트 등록
    app.use('/artwork', artworkRouter);
    app.use('/bgcolor', bgcolorRouter);
    app.use('/order', orderRouter);
    app.use('/font', fontRouter);
    app.use('/fontcolor', fontcolorRouter);

    app.listen(PORT, () => {
      console.log(`서버가 포트 ${PORT}에서 실행 중입니다`);
    });
  })
  .catch((error) => {
    console.error('Error initializing database:', error.message);
  });
