const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const authUtill = require('../module/authUtill');

// 임시 디비
const infoMap = [
  {
    id : 'study',
    pwd : '1234',
    name : 'study',
    phone : '010-1234-5678'
  },
  {
    id : 'hyunju',
    pwd : 'hello',
    name : '현주',
    phone : '010-1232-5765'
  },
  {
    id : 'junghun',
    pwd : 'sdf',
    name : '정훈',
    phone : '010-4664-2354'
  },
];

const user = {
    signin : (id, pwd) =>{
        return new Promise((resolve, reject) => {
            //TODO 2 : 존재하는 아이디인지 확인
            const arr = infoMap.filter((it) => it.id === id); // 원래 디비를 쓰면 SQL사용
            // arr = []이면 회원가입이 안되있다고 알려줘야 하는 것.
            if (arr.length === 0){
            resolve({
            code : statusCode.BAD_REQUEST,
            json : authUtill.successFalse(responseMessage.NO_USER)
            });
            return;
            }

        //TODO 3 : 비밀번호 일치하는지 확인
            const user = arr[0];
            // 원래는 비밀번호가 해시로 바뀌기 때문에 실제로는 이렇게 하지 않음.
            if(user.pwd !== pwd){
            resolve({
            code : statusCode.UNAUTHORIZED,
            json : authUtill.successTrue(responseMessage.MISS_MATCH_PW),
            });
            return;
            }

        //TODO 4 : 유저 정보 응답하기
            resolve({
            code : statusCode.OK,
            json : authUtill.successTrue(responseMessage.SIGN_IN_SUCCESS, user),
            });
                });
    },
    signup : (id, pwd, name, phone) => {
        return new Promise((resolve, reject) => {
        //TODO 2 : 존재하는 ID인지 확인한다.
        if(infoMap.filter((it) => it.id === id).length > 0){
            resolve({
            code : statusCode.UNAUTHORIZED,
            json : authUtill.successFalse(responseMessage.ALREADY_ID),
            });
            return;
        }

        //TODO 3 : 사용자 정보를 저장한다.
        const userIdx = infoMap.push({
            id,
            pwd,  // 암호화해서 저장해야 함.
            name,
            phone,
        });
        console.log(infoMap);

        //TODO 4 : 새로 추가된 유저 index 반환하기
        resolve({
        code : statusCode.OK,
        json : authUtill.successTrue(responseMessage.SIGN_IN_SUCCESS, userIdx),
            });
        });
    },
};

module.exports = user;