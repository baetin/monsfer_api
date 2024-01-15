// artwork.js (라우터 파일)

const express = require('express');
const router = express.Router();
const { getRepository } = require('typeorm');
const { Artwork } = require('../db');

/**
 * @swagger
 * tags:
 *   name: artwork
 *   description: 아트워크 추가, 조회, 삭제
 */

/**
 * @swagger
 * /artwork:
 *   get:
 *     summary: 모든 아트워크 조회
 *     description: 모든 아트워크의 목록을 조회합니다.
 *     tags:
 *       - artwork
 *     responses:
 *       '200':
 *         description: 아트워크 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Artwork'
 *       '500':
 *         description: 데이터베이스 오류
 *         content:
 *           application/json:
 *             example:
 *               message: "데이터베이스 오류 발생"
 */

router.get('/', async (req, res) => {
  const artworkRepository = getRepository(Artwork);
  const artworks = await artworkRepository.find();
  res.status(200).json(artworks);
});

/**
 * @swagger
 * /artwork:
 *   post:
 *     summary: 새로운 아트워크 추가
 *     description: 새로운 아트워크를 목록에 추가합니다.
 *     tags:
 *       - artwork
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewArtwork'
 *     responses:
 *       '201':
 *         description: 새로운 아트워크가 성공적으로 추가됨
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artwork'
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
  const { title, artist, image_path } = req.body;

  if (!title || !image_path) {
    return res.status(400).json({ message: '잘못된 요청 - title, image_path가 필요합니다.' });
  }

  const artworkRepository = getRepository(Artwork);
  const newArtwork = artworkRepository.create({ title, artist, image_path });
  await artworkRepository.save(newArtwork);

  res.status(201).json(newArtwork);
});

/**
 * @swagger
 * /artwork/{id}:
 *   delete:
 *     summary: 아트워크 삭제
 *     description: ID를 기반으로 아트워크를 삭제합니다.
 *     tags:
 *       - artwork
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 삭제할 아트워크의 ID
 *     responses:
 *       '200':
 *         description: 아트워크 삭제 성공
 *         content:
 *           application/json:
 *             example:
 *               message: "아트워크가 성공적으로 삭제됨"
 *       '404':
 *         description: 아트워크를 찾을 수 없음
 *         content:
 *           application/json:
 *             example:
 *               message: "아트워크를 찾을 수 없습니다."
 *       '500':
 *         description: 데이터베이스 오류
 *         content:
 *           application/json:
 *             example:
 *               message: "데이터베이스 오류 발생"
 */

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const artworkRepository = getRepository(Artwork);

  try {
    await artworkRepository.delete(id);
    res.status(200).json({ message: '아트워크가 성공적으로 삭제됨' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '데이터베이스 오류 발생' });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Artwork:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         artist:
 *           type: string
 *         image_path:
 *           type: string
 *     NewArtwork:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         artist:
 *           type: string
 *         image_path:
 *           type: string
 */
module.exports = router;
