const express = require('express');
const router = express.Router();
const { getAllCustomCases, addNewCustomCase, deleteCustomCase, deleteAllCustomCases } = require('../db'); // 경로는 실제 파일 위치에 맞게 수정

/**
 * @swagger
 * tags:
 *   name: case
 *   description: 케이스 추가 조회 삭제
 */

/**
 * @swagger
 * /case:
 *   get:
 *     summary: 모든 custom_case 조회
 *     description: 모든 custom_case의 목록을 조회합니다.
 *     tags:
 *       - case
 *     responses:
 *       '200':
 *         description: custom_case 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CustomCase'
 *       '500':
 *         description: 데이터베이스 오류
 *         content:
 *           application/json:
 *             example:
 *               message: "데이터베이스 오류 발생"
 */
router.get('/', async (req, res) => {
  try {
    const customCases = await getAllCustomCases();
    res.status(200).json(customCases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '데이터베이스 오류 발생' });
  }
});

/**
 * @swagger
 * /case:
 *   post:
 *     summary: 새로운 custom_case 추가
 *     description: 새로운 custom_case를 목록에 추가합니다.
 *     tags:
 *       - case
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCustomCase'
 *     responses:
 *       '201':
 *         description: 새로운 custom_case가 성공적으로 추가됨
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomCase'
 *       '400':
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             example:
 *               message: "잘못된 요청 - 필수 정보가 누락되었습니다."
 *       '500':
 *         description: 데이터베이스 오류
 *         content:
 *           application/json:
 *             example:
 *               message: "데이터베이스 오류 발생"
 */
router.post('/', async (req, res) => {
  const { artworkId, date, normalCaseId, fontId, hexcodeId } = req.body;

  if (!artworkId || !date || !normalCaseId || !fontId || !hexcodeId) {
    return res.status(400).json({ message: '잘못된 요청 - 필수 정보가 누락되었습니다.' });
  }

  try {
    const newCustomCase = await addNewCustomCase(artworkId, date, normalCaseId, fontId, hexcodeId);
    res.status(201).json(newCustomCase);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '데이터베이스 오류 발생' });
  }
});

/**
 * @swagger
 * /case/{id}:
 *   delete:
 *     summary: custom_case 삭제
 *     description: ID를 기반으로 custom_case를 삭제합니다.
 *     tags:
 *       - case
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 삭제할 custom_case의 ID
 *     responses:
 *       '200':
 *         description: custom_case 삭제 성공
 *         content:
 *           application/json:
 *             example:
 *               message: "custom_case가 성공적으로 삭제됨"
 *       '404':
 *         description: custom_case를 찾을 수 없음
 *         content:
 *           application/json:
 *             example:
 *               message: "custom_case를 찾을 수 없습니다."
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
    const isDeleted = await deleteCustomCase(id);

    if (!isDeleted) {
      return res.status(404).json({ message: 'custom_case를 찾을 수 없습니다.' });
    }

    res.status(200).json({ message: 'custom_case가 성공적으로 삭제됨' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '데이터베이스 오류 발생' });
  }
});

/**
 * @swagger
 * /case/all:
 *   delete:
 *     summary: 모든 custom_case 삭제
 *     description: 모든 custom_case를 삭제합니다.
 *     tags:
 *       - case
 *     responses:
 *       '200':
 *         description: 모든 custom_case 삭제 성공
 *         content:
 *           application/json:
 *             example:
 *               message: "모든 custom_case가 성공적으로 삭제됨"
 *       '500':
 *         description: 데이터베이스 오류
 *         content:
 *           application/json:
 *             example:
 *               message: "데이터베이스 오류 발생"
 */
router.delete('/all', async (req, res) => {
  try {
    const isDeleted = await deleteAllCustomCases();

    if (!isDeleted) {
      return res.status(404).json({ message: '모든 custom_case를 찾을 수 없습니다.' });
    }

    res.status(200).json({ message: '모든 custom_case가 성공적으로 삭제됨' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '데이터베이스 오류 발생' });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     CustomCase:
 *       type: object
 *       properties:
 *         custom_case_id:
 *           type: integer
 *         artwork_id:
 *           type: integer
 *         date:
 *           type: string
 *         normal_case_id:
 *           type: integer
 *         font_id:
 *           type: integer
 *         hexcode_id:
 *           type: integer
 *     NewCustomCase:
 *       type: object
 *       properties:
 *         artworkId:
 *           type: integer
 *         date:
 *           type: string
 *         normalCaseId:
 *           type: integer
 *         fontId:
 *           type: integer
 *         hexcodeId:
 *           type: integer
 */
module.exports = router;
