const axios = require('axios');
const async = require('async');
const minimist = require('minimist');
const sqlite = require('./utils/sqllite')
const instance = axios.create({
    baseURL: 'http://61.28.235.239:5400/api/',
    timeout: 60 * 2 * 1000,
    headers: { 'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDk5ODc1NzksInVzZXJJZCI6NTkyfQ.M9KvoqEfHTtzcOLUulJ6PzGCR2WnfheZvHD9x_P99E0' }
});

const tokenId = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJBdmF0YXIiOiJodHRwczovL3N3LWhjbS0xLnZpbmFkYXRhLnZuL3YxL0FVVEhfNmU4OWUyN2MxODgyNGU3MGI4NGEwMjQ4N2E5M2M2OWYvUERGL0FWQVRBUl81OTJfMTU3Njc1MTcyNjIzMi5qcGciLCJpZCI6IjU5MjE1NzM1NDEyNDUiLCJmdWxsX25hbWUiOiJMxrDGoW5nIFRo4bq_IEjDuW5nIiwicG9saWN5X3JvbGUiOiJVc2VyIiwibmJmIjoxNTc5MDc4Nzc5LCJleHAiOjE1ODE2NzA3NzksImlhdCI6MTU3OTA3ODc3OSwiaXNzIjoiR2VzbyIsImF1ZCI6Ikdlc28gVXNlcnMifQ.0OmS28H-Y6KKIHZlPnWwcGCkRC-rK0dnFytdCGdQ2Qr4vwGu5ru-srdmNvcEm3PLPnCAjX1qMwHqexo-yJ-SKw";
const instanceMXH = axios.create({
    baseURL: 'http://61.28.235.214/',
    timeout: 60 * 2 * 1000,
    headers: { 'Authorization': `bearer ${tokenId}` }
});

const get_courses = (cb) => {
    instance.get("/Course/getalls")
        .then(function (response) {
            // console.log(response)
            process.stdout.write(`.`);
            if (response.data.StatusCode == 1) {
                cb(null, 1);
            } else {
                cb(null, -1);
            }
        })
        .catch(function (error) {
            process.stdout.write(`.`);
            if (error.code === 'ECONNABORTED')
                cb(null, 2);
            else
                cb(null, -1);
        })
}

const get_getlessions = (cb) => {
    instance.get("/Course/getlessions?course=71")
        .then(function (response) {
            // console.log(response)
            process.stdout.write(`.`);
            if (response.data.StatusCode == 1) {
                cb(null, 1);
            } else {
                cb(null, -1);
            }
        })
        .catch(function (error) {
            process.stdout.write(`.`);
            if (error.code === 'ECONNABORTED')
                cb(null, 2);
            else
                cb(null, -1);
        })
}

const exercises = (cb) => {
    instance.get("/Course/exercises?courseId=71")
        .then(function (response) {
            // console.log(response)
            process.stdout.write(`.`);
            if (response.data.StatusCode == 1) {
                cb(null, 1);
            } else {
                cb(null, -1);
            }
        })
        .catch(function (error) {
            process.stdout.write(`.`);
            if (error.code === 'ECONNABORTED')
                cb(null, 2);
            else
                cb(null, -1);
        })
}


const get_timeStudyLesson = (cb) => {
    instance.post("/Course/timeStudyLesson", {
        LESSON_FK: 161,
        TIME_SEEN_VIDEO: 12
    })
        .then(function (response) {
            process.stdout.write(`.`);
            // console.log(response)
            if (response.data.StatusCode == 1) {
                cb(null, 1);
            } else {
                cb(null, -1);
            }
        })
        .catch(function (error) {
            process.stdout.write(`.`);
            if (error.code === 'ECONNABORTED')
                cb(null, 2);
            else
                cb(null, -1);
        })
}


// mxh 

const laybaidang = (cb) => {
    instanceMXH.get("/products")
        .then(function (response) {
            // console.log(response)
            process.stdout.write(`.`);
            if (response.status === 200 && response.data.StatusCode) {
                cb(null, 1);
            } else {
                cb(null, -1);
            }
        })
        .catch(function (error) {
            process.stdout.write(`.`);
            if (error.code === 'ECONNABORTED')
                cb(null, 2);
            else
                cb(null, -1);
        })
}

const taobaidang = (cb, index) => {
    instanceMXH.post("/products", {
        "title": "Tạo bài đăng " + index + " tự động by GESO ",
        "content": "Tạo bài đăng " + index + " tự động by GESO",
        "status": "1",
        "isPublic": true,
        "postMode": "3",
        "background": "4",
        "mediaType": "1"
    })
        .then(function (response) {
            // console.log(response)
            process.stdout.write(`.`);
            if (response.status === 200 && response.data) {
                taolike_commentlientuc(response.data.id);
                cb(null, 1);
            } else {
                cb(null, -1);
            }
        })
        .catch(function (error) {
            process.stdout.write(`.`);
            if (error.code === 'ECONNABORTED')
                cb(null, 2);
            else
                cb(null, -1);
        })
}


const taocomment = (cb, productId, index) => {
    instanceMXH.post("/comments", {
        "comment": "Tạo bình luận " + index + " tự động by GESO",
        "productId": productId,
        "commentId": null,
        "conversationId": null,
        "type": "0",
        "tokenId": tokenId
    })
        .then(function (response) {
            process.stdout.write(`.`);
            // console.log(response)
            if (response.status === 200 && response.data) {
                cb(null, 1);
            } else {
                cb(null, -1);
            }
        })
        .catch(function (error) {
            process.stdout.write(`.`);
            if (error.code === 'ECONNABORTED')
                cb(null, 2);
            else
                cb(null, -1);
        })
}


const taolike = (cb, productId) => {
    instanceMXH.post("/product_likes", {
        "productId": productId,
        "icon": "Like"
    })
        .then(function (response) {
            process.stdout.write(`.`);
            // console.log(response)
            if (response.status === 200) {
                cb(null, 1);
            } else {
                cb(null, -1);
            }
        })
        .catch(function (error) {
            process.stdout.write(`.`);
            if (error.code === 'ECONNABORTED')
                cb(null, 2);
            else
                cb(null, -1);
        })
}

const taolike_commentlientuc = (productId) => {
    var argv = minimist(process.argv.slice(2));
    const num = argv.n || 1000;
    const startTime = new Date();
    const funs = [];


    for (let i = 0; i < num / 4; i++) {
        funs.push(function (callback) {
            taocomment(callback, productId, i + 1);
        })
    }

    for (let i = 0; i < num / 4; i++) {
        funs.push(function (callback) {
            taolike(callback, productId, i);
        })
    }

    async.parallel(funs,
        // optional callback
        function (err, results) {
            const success = results.filter(x => x === 1);
            const fail = results.filter(x => x === -1);
            const timeout = results.filter(x => x === 2);
            const endTime = new Date();

            // console.log(" Success post : " + success.length);
            // console.log(" Fail post : " + fail.length);
            // console.log(" Timeout post : " + timeout.length);
            // console.log(" Time post : " + parseFloat((endTime - startTime) / 1000).toFixed(2) + "s");

        });
}

const main = async (crease) => {

    const n = 6;

    // var argv = minimist(process.argv.slice(2));
    const num = crease || 1000;
    const startTime = new Date();
    const funs = [];
    for (let i = 0; i < num / n; i++) {
        funs.push(function (callback) {
            get_courses(callback);
        })
    }

    for (let i = 0; i < num / n; i++) {
        funs.push(function (callback) {
            get_getlessions(callback);
        })
    }

    for (let i = 0; i < num / n; i++) {
        funs.push(function (callback) {
            exercises(callback);
        })
    }

    for (let i = 0; i < num / n; i++) {
        funs.push(function (callback) {
            get_timeStudyLesson(callback);
        })
    }

    for (let i = 0; i < num / n; i++) {
        funs.push(function (callback) {
            taobaidang(callback, i + 1);
        })
    }

    for (let i = 0; i < num / n; i++) {
        funs.push(function (callback) {
            laybaidang(callback);
        })
    }

    async.parallel(funs,
        // optional callback
        function (err, results) {
            const success = results.filter(x => x === 1);
            const fail = results.filter(x => x === -1);
            const timeout = results.filter(x => x === 2);
            const endTime = new Date();
            console.log([n, success.length, fail.length, timeout.length, parseFloat((endTime - startTime) / 1000)]);
            sqlite.insertLog([success.length + fail.length + timeout.length, success.length, fail.length, timeout.length, parseFloat((endTime - startTime) / 1000)])

            console.log("\n");
            console.log("==================");
            console.log(" Success : " + success.length);
            console.log(" Fail : " + fail.length);
            console.log(" Timeout : " + timeout.length);
            console.log(" Time : " + parseFloat((endTime - startTime) / 1000).toFixed(2) + "s");

        });

}


repeat = async () => {

    for (let num = 100; num < 100000; num += 100) {
        await main(num)
    }

}


repeat();