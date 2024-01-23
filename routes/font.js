const express = require('express');
const router = express.Router();
const { getAllFonts, addNewFont, deleteFont } = require('../db');

/**
 * @swagger
 * tags:
 *   name: font
 *   description: 폰트 조회, 추가, 삭제
 */

/**
 * @swagger
 * /font:
 *   get:
 *     summary: 모든 폰트 조회
 *     description: 모든 폰트의 목록을 조회합니다.
 *     tags:
 *       - font
 *     responses:
 *       '200':
 *         description: 폰트 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Font'
 *       '500':
 *         description: 데이터베이스 오류
 *         content:
 *           application/json:
 *             example:
 *               message: "데이터베이스 오류 발생"
 */
router.get('/', async (req, res) => {
  try {
    const fonts = await getAllFonts();
    res.status(200).json(fonts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '데이터베이스 오류 발생' });
  }
});

/**
 * @swagger
 * /font:
 *   post:
 *     summary: 새로운 폰트 추가
 *     description: 새로운 폰트를 목록에 추가합니다.
 *     tags:
 *       - font
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewFont'
 *     responses:
 *       '201':
 *         description: 새로운 폰트가 성공적으로 추가됨
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Font'
 *       '400':
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             example:
 *               message: "잘못된 요청 - fontName, hexcodeId, fontFilePath가 필요합니다."
 *       '500':
 *         description: 데이터베이스 오류
 *         content:
 *           application/json:
 *             example:
 *               message: "데이터베이스 오류 발생"
 */
router.post('/', async (req, res) => {
  const { fontName, fontFilePath } = req.body;

  if (!fontName || !hexcodeId || !fontFilePath) {
    return res.status(400).json({ message: '잘못된 요청 - fontName, hexcodeId, fontFilePath가 필요합니다.' });
  }

  try {
    const newFont = await addNewFont(fontName, fontFilePath);
    res.status(201).json(newFont);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '데이터베이스 오류 발생' });
  }
});

/**
 * @swagger
 * /font/{id}:
 *   delete:
 *     summary: 폰트 삭제
 *     description: ID를 기반으로 폰트를 삭제합니다.
 *     tags:
 *       - font
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 삭제할 폰트의 ID
 *     responses:
 *       '200':
 *         description: 폰트가 성공적으로 삭제됨
 *         content:
 *           application/json:
 *             example:
 *               message: "폰트가 성공적으로 삭제되었습니다."
 *       '404':
 *         description: 폰트를 찾을 수 없음
 *         content:
 *           application/json:
 *             example:
 *               message: "폰트를 찾을 수 없습니다."
 *       '500':
 *         description: 데이터베이스 오류
 *         content:
 *           application/json:
 *             example:
 *               message: "데이터베이스 오류 발생"
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFont = await deleteFont(id);

    if (!deletedFont) {
      return res.status(404).json({ message: '폰트를 찾을 수 없습니다.' });
    }

    res.status(200).json({ message: '폰트가 성공적으로 삭제되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '데이터베이스 오류 발생' });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Font:
 *       type: object
 *       properties:
 *         font_id:
 *           type: integer
 *         font_name:
 *           type: string
 *         font_file_path:
 *           type: string
 *     NewFont:
 *       type: object
 *       properties:
 *         font_name:
 *           type: string
 *         font_file_path:
 *           type: string
 */

module.exports = router;
