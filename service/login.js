/**
 * Created by zhaoxiaoqiang on 15/6/6.
 */
module.exports = {
    contentType: 'json',
    data: function (request, response, response200, response500) {

        return {
            code: 0,   // 0 成功，1 失败
            message: '',
            data: {
                uid: '1',
                userName: 'jack123',
                sign: '1234',
                email: 'longze@163.com'
            }
        };
    }
}
;