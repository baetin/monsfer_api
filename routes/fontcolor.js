const express = require('express');
const router = express.Router();
const { getAllFontColors, addNewFontColor, updateFontColor, deleteFontColor } = require('../db');


/**
 * @swagger
 * tags:
 *   name: fontcolor
 *   description: 폰트 색상 추가 조회 수정 삭제
 */

/**
 * @swagger
 * /fontcolor:
 *   get:
 *     summary: 모든 폰트 색상 조회
 *     description: 모든 폰트 색상의 목록을 조회합니다.
 *     tags:
 *       - fontcolor
 *     responses:
 *       '200':
 *         description: 폰트 색상 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FontColor'
 *       '500':
 *         description: 데이터베이스 오류
 *         content:
 *           application/json:
 *             example:
 *               message: "데이터베이스 오류 발생"
 */
router.get('/', async (req, res) => {
  try {
    // 실제 로직 추가: 모든 폰트 색상 조회
    const fontColors = await getAllFontColors();
    res.status(200).json(fontColors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '데이터베이스 오류 발생' });
  }
});

/**
 * @swagger
 * /fontcolor:
 *   post:
 *     summary: 새로운 폰트 색상 추가
 *     description: 새로운 폰트 색상을 목록에 추가합니다.
 *     tags:
 *       - fontcolor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewFontColor'
 *     responses:
 *       '201':
 *         description: 새로운 폰트 색상 추가 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FontColor'
 *       '400':
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             example:
 *               message: "잘못된 요청 - name과 hexCode가 필요합니다."
 *       '500':
 *         description: 데이터베이스 오류
 *         content:
 *           application/json:
 *             example:
 *               message: "데이터베이스 오류 발생"
 */
router.post('/', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: '잘못된 요청 - name이 필요합니다.' });
  }

  try {
    // 실제 로직 추가: 새로운 폰트 색상 추가
    const newFontColor = await addNewFontColor(name);
    res.status(201).json(newFontColor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '데이터베이스 오류 발생' });
  }
});

/**
 * @swagger
 * /fontcolor/{id}:
 *   put:
 *     summary: 폰트 색상 수정
 *     description: ID를 기반으로 폰트 색상을 수정합니다.
 *     tags:
 *       - fontcolor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 수정할 폰트 색상의 ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewFontColor'
 *     responses:
 *       '200':
 *         description: 폰트 색상 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FontColor'
 *       '404':
 *         description: 폰트 색상을 찾을 수 없음
 *         content:
 *           application/json:
 *             example:
 *               message: "폰트 색상을 찾을 수 없습니다."
 *       '500':
 *         description: 데이터베이스 오류
 *         content:
 *           application/json:
 *             example:
 *               message: "데이터베이스 오류 발생"
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    // 실제 로직 추가: 폰트 색상 수정
    const updatedFontColor = await updateFontColor(id, name );

    if (!updatedFontColor) {
      return res.status(404).json({ message: '폰트 색상을 찾을 수 없습니다.' });
    }

    res.status(200).json(updatedFontColor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '데이터베이스 오류 발생' });
  }
});

/**
 * @swagger
 * /fontcolor/{id}:
 *   delete:
 *     summary: 폰트 색상 삭제
 *     description: ID를 기반으로 폰트 색상을 삭제합니다.
 *     tags:
 *       - fontcolor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 삭제할 폰트 색상의 ID
 *     responses:
 *       '200':
 *         description: 폰트 색상이 성공적으로 삭제됨
 *         content:
 *           application/json:
 *             example:
 *               message: "폰트 색상이 성공적으로 삭제되었습니다."
 *       '404':
 *         description: 폰트 색상을 찾을 수 없음
 *         content:
 *           application/json:
 *             example:
 *               message: "폰트 색상을 찾을 수 없습니다."
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
    // 실제 로직 추가: 폰트 색상 삭제
    const deletedFontColor = await deleteFontColor(id);

    if (!deletedFontColor) {
      return res.status(404).json({ message: '폰트 색상을 찾을 수 없습니다.' });
    }

    res.status(200).json({ message: '폰트 색상이 성공적으로 삭제되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '데이터베이스 오류 발생' });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     FontColor:
 *       type: object
 *       properties:
 *         fontcolor_id:
 *           type: integer
 *         fontcolor_name:
 *           type: string
 
 *     NewFontColor:
 *       type: object
 *       properties:
 *         font_id:
 *           type: integer
 *       fontcolor_name:
 *           type: string

 */

module.exports = router;
