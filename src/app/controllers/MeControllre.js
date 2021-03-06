const Course = require('../models/Course');
const { multipleMogooseToOject } = require('../../util/mongoose');
class MeController{ 

    storedCourses(req, res, next) {
        let CourseQuery = Course.find({});

        Promise.all([CourseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) =>
                //.course.find() là lấy hết giá trị trong database ra ngoài view
                //.then() giá trị trả về sẽ là 1 mảng
                //đối số thứ nhất sẽ là giá trị thành công của Course.find
                //đối số thứ 2 sẽ là giá trị thành công của Course.countDocumentsDeleted
                res.render('me/stored-courses', {
                    deletedCount: deletedCount,
                    courses: multipleMogooseToOject(courses)
                })
                    .catch(next)
            )
    }

    //[GET] /me/stored/courses
    // storedCourses(req, res, next) {
    //     Course.find({})
    //         .then(courses => 
    //             res.render('me/stored-courses', {
    //                 courses: multipleMogooseToOject(courses)
    //             })
    //         )
    //         .catch(next);
    // }

    //[GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => 
                res.render('me/trash-courses', {
                    courses: multipleMogooseToOject(courses)
                })
            )
            .catch(next);
    }
}

module.exports = new MeController();
