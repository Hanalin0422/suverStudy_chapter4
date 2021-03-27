const express = require('express');
const router = express.Router();
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const authUtill = require('../module/authUtill');
const board = require('../model/board')

router.get('/', (req, res) => {
    /* TODO : 게시글 전체 보기*/
    board.readAll().then(({
        code,
        json
    })=> {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtill.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

router.get('/:id', (req, res) => {
    /* TODO : 게시글 개별 보기 */
    const id = req.params.id;
    if(!id){
        res.status(statusCode.BAD_REQUEST,
            authUtill.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    board.read(id).then(({
        code,
        json
    }) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtill.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

router.post('/', (req, res) => {
    /* TODO : 게시글 작성 하기*/
    const{
        title,
        content,
        writer,
        pwd,
    } = req.body;

    if(!title || !content || !writer || !pwd){
        res.status(statusCode.BAD_REQUEST).send(
            authUtill.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    board.create(title, content, writer, pwd).then(({
        code,
        json
    })=> {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtill.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

router.put('/', (req, res) => {
    /* TODO : 게시글 수정 하기*/
    const{
        idx,
        title,
        content,
        writer,
        pwd
    } = req.body;
    if( !title || !content || !content || !writer || !pwd){
        res.status(statusCode.BAD_REQUEST,
            authUtill.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    board.update(idx, title, content, writer, pwd).then(({
        code,
        json
    }) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtill.successFalse(responseMessage.INTERNAL_SERVER_ERROR));    })
});

router.delete('/', (req, res) => {
    /* TODO : 게시글 삭제 하기 */
    const{
        idx,
        pwd
    } = req.body;
    if (!idx || !pwd){
        res.status(statusCode.BAD_REQUEST,
            authUtill.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    board.delete(idx, pwd).then(({
        code,
        json
    }) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtill.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

module.exports = router;