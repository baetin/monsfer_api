const express = require('express');
const router = express.Router();
const { getAllOrders, addNewOrder, deleteOrder, deleteAllOrders } = require('../db');

/**
 * @swagger
 * tags:
 *   name: order
 *   description: 주문 추가 조회 삭제
 */

/**
 * @swagger
 * /order:
 *   get:
 *     summary: 모든 주문 조회
 *     description: 모든 주문의 목록을 조회합니다.
 *     tags:
 *       - order
 *     responses:
 *       '200':
 *         description: 주문 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       '500':
 *         description: 데이터베이스 오류
 *         content:
 *           application/json:
 *             example:
 *               message: "데이터베이스 오류 발생"
 */
router.get('/', async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '데이터베이스 오류 발생' });
  }
});

/**
 * @swagger
 * /order:
 *   post:
 *     summary: 새로운 주문 추가
 *     description: 새로운 주문을 목록에 추가합니다.
 *     tags:
 *       - order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewOrder'
 *     responses:
 *       '201':
 *         description: 새로운 주문이 성공적으로 추가됨
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
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
  const { order_custom_case_id, order_product_folder_name, order_goods_name, order_date, order_check1, order_check2, order_download } = req.body;

  if (!order_custom_case_id || !order_product_folder_name || !order_goods_name || !order_date || !order_check1 || !order_check2 || !order_download) {
    return res.status(400).json({ message: '잘못된 요청 - 필수 정보가 누락되었습니다.' });
  }

  try {
    const newOrder = await addNewOrder(order_custom_case_id, order_product_folder_name, order_goods_name, order_date, order_check1, order_check2, order_download);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '데이터베이스 오류 발생' });
  }
});

/**
 * @swagger
 * /order/{id}:
 *   delete:
 *     summary: 주문 삭제
 *     description: ID를 기반으로 주문을 삭제합니다.
 *     tags:
 *       - order
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 삭제할 주문의 ID
 *     responses:
 *       '200':
 *         description: 주문 삭제 성공
 *         content:
 *           application/json:
 *             example:
 *               message: "주문이 성공적으로 삭제됨"
 *       '404':
 *         description: 주문을 찾을 수 없음
 *         content:
 *           application/json:
 *             example:
 *               message: "주문을 찾을 수 없습니다."
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
    const isDeleted = await deleteOrder(id);

    if (!isDeleted) {
      return res.status(404).json({ message: '주문을 찾을 수 없습니다.' });
    }

    res.status(200).json({ message: '주문이 성공적으로 삭제됨' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '데이터베이스 오류 발생' });
  }
});

/**
 * @swagger
 * /order/all:
 *   delete:
 *     summary: 모든 주문 삭제
 *     description: 모든 주문을 삭제합니다.
 *     tags:
 *       - order
 *     responses:
 *       '200':
 *         description: 모든 주문 삭제 성공
 *         content:
 *           application/json:
 *             example:
 *               message: "모든 주문이 성공적으로 삭제됨"
 *       '500':
 *         description: 데이터베이스 오류
 *         content:
 *           application/json:
 *             example:
 *               message: "데이터베이스 오류 발생"
 */
router.delete('/all', async (req, res) => {
  try {
    const isDeleted = await deleteAllOrders();

    if (!isDeleted) {
      return res.status(404).json({ message: '모든 주문을 찾을 수 없습니다.' });
    }

    res.status(200).json({ message: '모든 주문이 성공적으로 삭제됨' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '데이터베이스 오류 발생' });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         order_custom_case_id:
 *           type: integer
 *         order_product_folder_name:
 *           type: string
 *         order_goods_name:
 *           type: string
 *         order_date:
 *           type: string
 *         order_check1:
 *           type: string
 *         order_check2:
 *           type: string
 *         order_download:
 *           type: string
 *     NewOrder:
 *       type: object
 *       properties:
 *         order_custom_case_id:
 *           type: integer
 *         order_product_folder_name:
 *           type: string
 *         order_goods_name:
 *           type: string
 *         order_date:
 *           type: string
 *         order_check1:
 *           type: string
 *         order_check2:
 *           type: string
 *         order_download:
 *           type: string
 */

module.exports = router;
