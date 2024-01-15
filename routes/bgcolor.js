const express = require('express');
const router = express.Router();
const { getAllBgColors, addNewBgColor, updateBgColor, deleteBgColor } = require('../db');

/**
 * @swagger
 * tags:
 *   name: bgcolor
 *   description: 배경 색상 추가 조회 수정 삭제
 */

/**
 * @swagger
 * /bgcolor:
 *   get:
 *     summary: 모든 배경 색상 조회
 *     description: 모든 배경 색상의 목록을 조회합니다.
 *     tags:
 *       - bgcolor
 *     responses:
 *       '200':
 *         description: 배경 색상 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BgColor'
 *       '500':
 *         description: 데이터베이스 오류
 *         content:
 *           application/json:
 *             example:
 *               message: "데이터베이스 오류 발생"
 */
router.get('/', async (req, res) => {
  try {
    // 실제 로직 추가: 모든 배경 색상 조회
    const bgColors = await getAllBgColors();
    res.status(200).json(bgColors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '데이터베이스 오류 발생' });
  }
});

/**
 * @swagger
 * /bgcolor:
 *   post:
 *     summary: 새로운 배경 색상 추가
 *     description: 새로운 배경 색상을 목록에 추가합니다.
 *     tags:
 *       - bgcolor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewBgColor'
 *     responses:
 *       '201':
 *         description: 새로운 배경 색상 추가 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BgColor'
 *       '400':
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             example:
 *               message: "잘못된 요청 - bgColorName과 hexCode가 필요합니다."
 *       '500':
 *         description: 데이터베이스 오류
 *         content:
 *           application/json:
 *             example:
 *               message: "데이터베이스 오류 발생"
 */
router.post('/', async (req, res) => {
  const { bgcolor_name, hexcode_id } = req.body; // 변수명 수정

  if (!bgcolor_name || !hexcode_id) {
    return res.status(400).json({ message: '잘못된 요청 - bgColorName과 hexCode가 필요합니다.' });
  }

  try {
    // 실제 로직 추가: 새로운 배경 색상 추가
    const newBgColor = await addNewBgColor(bgcolor_name, hexcode_id); // 변수명 수정
    res.status(201).json(newBgColor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '데이터베이스 오류 발생' });
  }
});

/**
 * @swagger
 * /bgcolor/{id}:
 *   put:
 *     summary: 배경 색상 수정
 *     description: ID를 기반으로 배경 색상을 수정합니다.
 *     tags:
 *       - bgcolor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 수정할 배경 색상의 ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewBgColor'
 *     responses:
 *       '200':
 *         description: 배경 색상 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BgColor'
 *       '404':
 *         description: 배경 색상을 찾을 수 없음
 *         content:
 *           application/json:
 *             example:
 *               message: "배경 색상을 찾을 수 없습니다."
 *       '500':
 *         description: 데이터베이스 오류
 *         content:
 *           application/json:
 *             example:
 *               message: "데이터베이스 오류 발생"
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { bgcolor_name, hexcode_id } = req.body; // 변수명 수정

  try {
    // 실제 로직 추가: 배경 색상 수정
    const updatedBgColor = await updateBgColor(id, bgcolor_name, hexcode_id); // 변수명 수정

    if (!updatedBgColor) {
      return res.status(404).json({ message: '배경 색상을 찾을 수 없습니다.' });
    }

    res.status(200).json(updatedBgColor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '데이터베이스 오류 발생' });
  }
});

/**
 * @swagger
 * /bgcolor/{id}:
 *   delete:
 *     summary: 배경 색상 삭제
 *     description: ID를 기반으로 배경 색상을 삭제합니다.
 *     tags:
 *       - bgcolor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 삭제할 배경 색상의 ID
 *     responses:
 *       '200':
 *         description: 배경 색상이 성공적으로 삭제됨
 *         content:
 *           application/json:
 *             example:
 *               message: "배경 색상이 성공적으로 삭제되었습니다."
 *       '404':
 *         description: 배경 색상을 찾을 수 없음
 *         content:
 *           application/json:
 *             example:
 *               message: "배경 색상을 찾을 수 없습니다."
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
    // 실제 로직 추가: 배경 색상 삭제
    const deletedBgColor = await deleteBgColor(id);

    if (!deletedBgColor) {
      return res.status(404).json({ message: '배경 색상을 찾을 수 없습니다.' });
    }

    res.status(200).json({ message: '배경 색상이 성공적으로 삭제되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '데이터베이스 오류 발생' });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     BgColor:
 *       type: object
 *       properties:
 *         bgcolor_id:
 *           type: integer
 *         bgcolor_name:
 *           type: string
 *         hexcode_id:
 *           type: integer
 *     NewBgColor:
 *       type: object
 *       properties:
 *         bgcolor_name:
 *           type: string
 *         hexcode_id:
 *           type: integer
 */
module.exports = router;
