var mysql = require('mysql');

const config = require('config');
var state = {
    pool: null
}

function connect(mode) {
    console.log("This is the Enviorment: ");
    console.log(mode.sql);
    return new Promise((resolve, reject) => {
        state.pool = mysql.createPool(mode.sql);
        resolve();
        reject(new Error('Failed to Connect'));
    });
}

function get(type) {
    return new Promise((resolve,reject) => {
        if (type === exports.WRITE) {
            state.pool.getConnection('WRITE')
        } else if(type === exports.READ) {
            state.pool.getConnection('READ*');
        }
        else{
        }
        reject(new Error('Could Not connect to Database'));
        resolve(console.log("resolved"));
    })
}


///////////////////////////////////////////////////DOGS///////////////////////////////////////////////////



function queryAllDogs(){
    return new Promise((resolve, reject) => {
        let pool = state.pool;
        pool.query('SELECT * from tblDogs',
            (err,result)=>{
                if(err) {
                    console.log(err.code);
                    console.log(err.fatal);
                }
                resolve(result);
                reject(new Error('There is no dog with id =='))
            }
        );
    })
}
//GETS ADOPTABLE DOGS
function queryAdoptableDogs(){
    return new Promise((resolve, reject) => {
        let pool = state.pool;
        pool.query('SELECT * FROM tblDogs WHERE `fldStatus` = "Available" OR `fldStatus` = "Fostered"',
            (err,result)=>{
                if(err) {
                    console.log(err.code);
                    console.log(err.fatal);
                }
                resolve(result);
                reject(new Error('There is no dog with id =='))
            }
        );
    })
}

//GETS ADOPTABLE DOGS
function queryAdoptedDogs(){
    return new Promise((resolve, reject) => {
        let pool = state.pool;

        pool.query('SELECT * FROM tblDogs WHERE `fldStatus` = "Adopted"',
            (err,result)=>{
                if(err) {
                    console.log(err.code);
                    console.log(err.fatal);
                }
                resolve(result);
                reject(new Error('Error getting dogs'))
            }
        );
    })
}


//GETS ADOPTABLE DOGS
function queryFosterable(){
    return new Promise((resolve, reject) => {
        let pool = state.pool;
        console.log(pool.host);
        console.log(pool.database);
        console.log(pool.password);
        console.log(pool.user);
        pool.query('SELECT * FROM tblDogs WHERE `fldStatus` = "Available"',
            (err,result)=>{
                if(err) {
                    console.log(err.code);
                    console.log(err.fatal);
                }
                resolve(result);
                reject(new Error('There is no dog with id =='))
            }
        );
    })
}




function DeleteDogbyId(id){
    return new Promise((resolve, reject) => {
        let pool = state.pool;
        console.log(pool.host);
        console.log(pool.database);
        console.log(pool.password);
        console.log(pool.user);

        console.log(id);
        pool.query('DELETE FROM `tblDogs` WHERE ? = `pmkDogs`', id,
            (err,result)=>{
                if(err) {
                    console.log(err.code);
                    console.log(err.fatal);
                }
                resolve(result);
                reject(new Error('There is no dog with id ==' + id))
            }
        );
    })
}

function queryDogbyId(id){
    return new Promise((resolve, reject) => {
        let pool = state.pool;
        console.log(pool.host);
        console.log(pool.database);
        console.log(pool.password);
        console.log(pool.user);
        pool.query('SELECT `pmkDogs`, `fldName`,`fldBreed`,`fldPhoto`,`fldAge`,`fldDescription`, `fldStatus` FROM `tblDogs` WHERE ? = pmkDogs', id,
            (err,result)=>{
                if(err) {
                    console.log(err.code);
                    console.log(err.fatal);
                }
                resolve(result);
                reject(new Error('There is no dog with id ==' + id))
            }
        );
    })
}

function queryDogStatusbyName(name){
    return new Promise((resolve, reject) => {
        let pool = state.pool;
        console.log(pool.host);
        console.log(pool.database);
        console.log(pool.password);
        console.log(pool.user);


        pool.query('SELECT `fldStatus` FROM `tblDogs` WHERE `fldName`= ?', name,
            (err,result)=>{
                if(err) {
                    console.log(err.code);
                    console.log(err.fatal);
                }
                resolve(result);
                reject(new Error('There is no dog  ==' + name))
            }
        );
    })
}


function insertDog(values) {
    return new Promise((resolve, reject) => {
        let pool = state.pool;
        console.log(values);
        pool.query('INSERT INTO `tblDogs` (`fldName`, `fldBreed`, `fldAge`, `fldDescription`, `fldPhoto`, `fldStatus`) VALUES ?', [values],
            (err,result)=>{
                if(err) {
                    console.log(err.code);
                    console.log(err.fatal);
                }
                resolve(result);
                reject(new Error('error'));
            }
        );
    });
}

function updateDog(values,id) {
    return new Promise((resolve, reject) => {
        let pool = state.pool;
        console.log(values);
        console.log(id);
        pool.query('UPDATE `tblDogs` SET `fldName` = ?, `fldBreed` = ?, `fldAge` = ?, `fldDescription` = ?, `fldPhoto` = ?, `fldStatus` = ?  WHERE `pmkDogs` = ?',
            [values.fldName, values.fldBreed, values.fldAge, values.fldDescription, values.fldPhoto, values.fldStatus, id],
            (err,result)=>{
                if(err) {
                    console.log(err.code);
                    console.log(err.fatal);
                }
                resolve(result);
                reject(new Error('error'));
            }
        );
    });
}


///////////////////////////////////////////////////PEOPLE///////////////////////////////////////////////////
function insertPerson(values) {
    return new Promise((resolve, reject) => {
        let pool = state.pool;
        console.log(values);
        pool.query('INSERT INTO `tblPeople` (`fldFirstName`, `fldLastName`, `fldAddress`, `fldEmail`, `fldPhoneNumber`) VALUES ?', [values],
            (err,result)=>{
                if(err) {
                    console.log(err.code);
                    console.log(err.fatal);
                }
                resolve(result);
                reject(new Error('error'));
            }
        );
    });
}

function queryPersonbyId(id){
    return new Promise((resolve, reject) => {
        let pool = state.pool;
        pool.query('SELECT `pmkPeople`, `fldFirstName`,`fldLastName`,`fldAddress`,`fldEmail`,`fldPhoneNumber` FROM`tblPeople` WHERE ? = pmkPeople', id,
            (err,result)=>{
                if(err) {
                    console.log(err.code);
                    console.log(err.fatal);
                }
                resolve(result);
                reject(new Error('There is no Person with id ==' + id))
            }
        );
    })
}

function queryPerson(){
    return new Promise((resolve, reject) => {
        let pool = state.pool;
        pool.query('SELECT * FROM `tblPeople`',
            (err,result)=>{
                if(err) {
                    console.log(err.code);
                    console.log(err.fatal);
                }
                resolve(result);
                reject(new Error('There is no Person with id =='))
            }
        );
    })
}


function updatePerson(values,id) {
    return new Promise((resolve, reject) => {
        let pool = state.pool;
        console.log(values);
        console.log(id);
        pool.query('UPDATE `tblPeople` SET `fldFirstName` = ?, `fldLastName` = ?, `fldAddress` = ?, `fldEmail` = ?, `fldPhoneNumber` = ? WHERE `pmkPeople` = ?',
            [values.fldFirstName, values.fldLastName,values.fldAddress,values.fldEmail,values.fldPhoneNumber, id],
            (err,result)=>{
                if(err) {
                    console.log(err.code);
                    console.log(err.fatal);
                }
                resolve(result);
                reject(new Error('error'));
            }
        );
    });



///////////////////////////////////////////////////DogStatus - NOT USED///////////////////////////////////////////////////

// //Insert Dog Status
// function insertDogStatus(values) {
//     return new Promise((resolve, reject) => {
//         let pool = state.pool;
//         console.log(values);
//         pool.query('INSERT INTO `tblDogStatus` (`pfkDogs`, `pfkPeople`, `pfkStatus`) VALUES ?', [values],
//             (err,result)=>{
//                 if(err) {
//                     console.log(err.code);
//                     console.log(err.fatal);
//                 }
//                 resolve(result);
//                 reject(new Error('error'));
//             }
//         );
//     });
// }
//

// //Can be Fostered OR ADOPTED
// function queryAvailbleDogs() {
//     return new Promise((resolve, reject) => {
//         let pool = state.pool;
//         pool.query('SELECT`fldName`,`fldBreed`,`fldPhoto`,`fldAge`,`fldDescription`,`pfkStatus`' +
//             'FROM`tblDogs`' +
//             'JOIN`tblDogStatus` ' +
//             'ON `pmkDogs` = `pfkDogs`' +
//             'WHERE `pfkStatus` = "Available" OR `pfkStatus` = "Foster"',
//             (err,result)=>{
//                 if(err) {
//                 console.log(err.code);
//                 console.log(err.fatal);
//             }
//                 resolve(result);
//                 reject(new Error('Error!'))
//             }
//         );
//     })
// }
//
// function queryAdoptedDogs() {
//     return new Promise((resolve, reject) => {
//         let pool = state.pool;
//         pool.query('SELECT`fldName`,`fldBreed`,`fldPhoto`,`fldAge`,`fldDescription`,`pfkStatus`' +
//             'FROM`tblDogs`' +
//             'JOIN`tblDogStatus` ' +
//             'ON `pmkDogs` = `pfkDogs`' +
//             'WHERE `pfkStatus` = "Adopted" ',
//             (err,result)=>{
//                 if(err) {
//                 console.log(err.code);
//                 console.log(err.fatal);
//             }
//                 resolve(result);
//                 reject(new Error('Error!'))
//             }
//         );
//     })
// }
//
// function queryAdoptableDogs() {
//     return new Promise((resolve, reject) => {
//         let pool = state.pool;
//         pool.query('SELECT`fldName`,`fldBreed`,`fldPhoto`,`fldAge`,`fldDescription`,`pfkStatus`' +
//             'FROM`tblDogs`' +
//             'JOIN`tblDogStatus` ' +
//             'ON `pmkDogs` = `pfkDogs`' +
//             'WHERE `pfkStatus` = "Available" ',
//             (err,result)=>{
//                 if(err) {
//                 console.log(err.code);
//                 console.log(err.fatal);
//             }
//                 resolve(result);
//                 reject(new Error('Error!'))
//             }
//         );
//     })
// }
//
//
// function updateDogStatus(values,id) {
//     return new Promise((resolve, reject) => {
//         let pool = state.pool;
//         console.log(values);
//         console.log(id);
//         pool.query('UPDATE `tblDogStatus` SET `pfkDogs` = ?, `pfkPeople` = ?, `pfkStatus` = ? WHERE `pfkDog` = ?',
//             [values.fldFirstName, values.fldLastName,values.fldAddress,values.fldEmail,values.fldPhoneNumber, id],
//             (err,result)=>{
//                 if(err) {
//                 console.log(err.code);
//                 console.log(err.fatal);
//             }
//                 resolve(result);
//                 reject(new Error('error'));
//             }
//         );
//     });
// }

// //QueryDogs by Name
// function queryDogStatusbyName(name) {
//     return new Promise((resolve, reject) => {
//         let pool = state.pool;
//         pool.query('SELECT`fldName`,`fldBreed`,`fldPhoto`,`fldAge`,`fldDescription`,`pfkStatus`' +
//             'FROM`tblDogs`' +
//             'JOIN`tblDogStatus` ' +
//             'ON `pmkDogs` = `pfkDogs`' +
//             'WHERE (`pfkStatus` = "Available") OR (`pfkStatus` = "Foster") AND (`fldName`= ?)', [name],
//             (err,result)=>{
//                 if(err) {
//                 console.log(err.code);
//                 console.log(err.fatal);
//             }
//                 resolve(result);
//                 reject(new Error('Error!'))
//             }
//         );
//     })
}
///////////////////////////////////////////////////TAGS///////////////////////////////////////////////////

function queryTags(){
    return new Promise((resolve, reject) => {
        let pool = state.pool;
        pool.query('SELECT * FROM`tblTag`',
            (err,result)=>{
                if(err) {
                console.log(err.code);
                console.log(err.fatal);
            }
                resolve(result);
                reject(new Error('There are no tags'))
            }
        );
    })
}

function queryTagbyId(id){
    return new Promise((resolve, reject) => {
        let pool = state.pool;
        pool.query('SELECT `pmkTagId`, `fldTag` FROM`tblTag` WHERE ? = pmkTagId', id,
            (err,result)=>{
                if(err) {
                console.log(err.code);
                console.log(err.fatal);
            }
                resolve(result);
                reject(new Error('There is no dog with id ==' + id))
            }
        );
    })
}

function insertTag(values) {
    return new Promise((resolve, reject) => {
        let pool = state.pool;
        console.log(values);
        pool.query('INSERT INTO `tblTag` (`fldTag`) VALUES ?', [values],
            (err,result)=>{
                if(err) {
                console.log(err.code);
                console.log(err.fatal);
            }
                resolve(result);
                reject(new Error('error'));
            }
        );
    });
}

function updateTag(values,id) {
    return new Promise((resolve, reject) => {
        let pool = state.pool;
        console.log(values);
        console.log(id);
        pool.query('UPDATE `tblTag` SET `fldTag` = ? WHERE `pmkTagId` = ?',
            [values.fldTag, id],
            (err,result)=>{
                if(err) {
                console.log(err.code);
                console.log(err.fatal);
            }
                resolve(result);
                reject(new Error('error'));
            }
        );
    });
}

///////////////////////////////////////////////////DOG TAGS///////////////////////////////////////////////////




function queryDogTags(){
    return new Promise((resolve, reject) => {
        let pool = state.pool;
        pool.query('SELECT * FROM`tblDogsTags`',
            (err,result)=>{
                if(err) {
                    console.log(err.code);
                    console.log(err.fatal);
                }
                resolve(result);
                reject(new Error('There are no tags'))
            }
        );
    })
}



function queryDogTagbyId(id){
    return new Promise((resolve, reject) => {
        let pool = state.pool;
        pool.query('SELECT `pmkTagId`,`pfkTagId`, `pfkDogId` FROM `tblTag` JOIN `tblDogsTags` ON `pmkTagId` = `pfkTagId` WHERE `pfkDogId` = ?', [id],
            (err,result)=>{
                if(err) {
                console.log(err.code);
                console.log(err.fatal);
            }
                resolve(result);
                reject(new Error('There are no tags'))
            }
        );
    })
}


function insertDogTag(values) {
    return new Promise((resolve, reject) => {
        let pool = state.pool;
        console.log(values);
        pool.query('INSERT INTO `tblDogsTags` (`pfkDogId`,`pfkTagId`) VALUES ?', [values],
            (err,result)=>{
                if(err) {
                console.log(err.code);
                console.log(err.fatal);
            }
                resolve(result);
                reject(new Error('ERROR IN insertDogTag query: DB.js'));
            }
        );
    });
}

function DELETE_Tags() {
    return new Promise((resolve, reject) => {
        let pool = state.pool;
        pool.query('DELETE FROM `tblDogsTags` WHERE (`pfkTagId`=?) AND (`pfkDogId`=?)',
            (err, result) => {
                if (err) throw err
                resolve(result);
                reject(new Error('There is no dog with this tag'))
            }
        );
    })
}

///////////////////////////////////////////////////News///////////////////////////////////////////////////

function insertNews(values) {
    return new Promise((resolve, reject) => {
        let pool = state.pool;
        console.log(values);
        pool.query('INSERT INTO `tblNews` (`fldAuthor`, `fldTitle`, `fldDate`, `fldContent`) VALUES ?', [values],
            (err,result)=>{
                if(err) {
                console.log(err.code);
                console.log(err.fatal);
            }
                resolve(result);
                reject(new Error('ERROR IN News query: DB.js'));
            }
        );
    });
}

function queryNews(){
    return new Promise((resolve, reject) => {
        let pool = state.pool;
        pool.query('SELECT `pmkNewsId`, `fldAuthor`, `fldTitle`, `fldDate`, `fldContent` FROM`tblNews`',
            (err,result)=>{
                if(err) {
                console.log(err.code);
                console.log(err.fatal);
            }
                resolve(result);
                reject(new Error('There is no dog with'))
            }
        );
    })
}


///////////////////////////////////////////////////Admin///////////////////////////////////////////////////



function Register(values) {
    return new Promise((resolve, reject) => {
        let pool = state.pool;
        pool.query('INSERT INTO `tblUsers` (`fldName`,`pmkEmail`, `fldPassword`, `fldAdmin`) VALUES ?', [values],
            (err,result)=>{
                if(err) {
                    console.log(err.code);
                    console.log(err.fatal);
                }
                resolve(result);
                reject(new Error('Registration Error'));
            }
        );
    });
}
//Is admin email unique
function isUnique(email){
    return new Promise((resolve, reject) => {
        let pool = state.pool;
        pool.query('SELECT `pmkEmail`, `fldAdmin` FROM `tblUsers` WHERE pmkEmail = ?',email,
            (err,results)=>{
                if(err) {
                    console.log("Email Already Exists- withing db.js");
                }
                //if email exists
                resolve(results);
                reject(new Error('Error fetching emails'))
            }
        );
    })
}

//Is admin email unique
function auth(email){
    return new Promise((resolve, reject) => {
        let pool = state.pool;
        pool.query('SELECT `pmkEmail`, `fldPassword`, `fldAdmin` FROM `tblUsers` WHERE pmkEmail = ?',email,
            (err,results)=>{
                if(err) {
                    console.log("Email Already Exists- withing db.js");
                }
                //if email exists
                resolve(results);
                reject(new Error('Error fetching emails'))
            }
        );
    })
}








//DOGS
exports.queryAllDogs = queryAllDogs;
exports.updateDog = updateDog;
exports.queryDogbyId=queryDogbyId;
exports.insertDog =insertDog;
exports.queryFosterable =queryFosterable;
exports.queryAdoptableDogs =queryAdoptableDogs;
exports.queryDogStatusbyName =queryDogStatusbyName;
//PEROPLE
exports.insertPerson =insertPerson;
exports.updatePerson = updatePerson;
exports.queryPersonbyId=queryPersonbyId;
exports.queryPerson=queryPerson;
exports.DeleteDogbyId = DeleteDogbyId;


//DogsStatus -NOT USED
// exports.insertDogStatus =insertDogStatus;
// exports.updateDogStatus =updateDogStatus;

exports.queryAdoptedDogs =queryAdoptedDogs;
//Tags
exports.queryTags = queryTags;
exports.queryTagbyId = queryTagbyId;
exports.insertTag = insertTag;
exports.updateTag = updateTag;
//DogTags
exports.queryDogTagbyId = queryDogTagbyId;
exports.insertDogTag = insertDogTag;
exports.DELETE_Tags = DELETE_Tags;
exports.queryDogTagbyId = queryDogTagbyId;
exports.queryDogTags = queryDogTags;
//News
exports.insertNews = insertNews;
exports.queryNews = queryNews;
//Admin
exports.Register =Register;
exports.isUnique=isUnique;
exports.auth=auth;


//DATABASE
exports.connect = connect;
exports.get=get;
exports.READ = 'read';
exports.WRITE = 'write';