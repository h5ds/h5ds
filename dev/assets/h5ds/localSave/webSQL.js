/** 
 *数据库操作辅助类,定义对象、数据操作方法都在这里定义 
 */
const conf = {
    dbName: 'h5ds',
    /*数据库名*/
    version: '2.0',
    /*数据库版本*/
    dbDesc: 'h5ds 本地本地数据库',
    /*数据库描述*/
    dbSize: 100 * 1024 /*数据库大小 kb*/
}

/** 
 * 打开数据库 
 * @returns  dataBase:打开成功   or 打开失败 
 */
export function openDB() {
    /*数据库有就打开 没有就创建*/
    let dataBase = window.openDatabase(conf.dbName, conf.version, conf.dbDesc, conf.dbSize, function() {});
    if (dataBase) {
        console.log("websql 数据库创建/打开成功!");
    } else {
        console.log("websql 数据库创建/打开失败！");
    }
    window.WEBSQL_DB = dataBase;
};

/** 
 * 新建数据库里面的表单 
 * @param tableName:表单名 
 */
export function creatImgTable(tableName) {
    var creatTableSQL = 'CREATE TABLE IF  NOT EXISTS ' + tableName + ' (rowid INTEGER PRIMARY KEY AUTOINCREMENT, NAME text,AGE text,HEIGHT text,WEIGTH text)';
    WEBSQL_DB.transaction(function(ctx, result) {
        ctx.executeSql(creatTableSQL, [], function(ctx, result) {
            alert("表创建成功 " + tableName);
        }, function(tx, error) {
            alert('创建表失败:' + tableName + error.message);
        });
    });
}
/** 
 * 往表单里面插入数据 
 * @param tableName:表单名 
 * @param NAME:姓名 
 * @param AGE:年龄 
 * @param HEIGHT:身高 
 * @param WEIGTH:体重 
 */
export function insterData(tableName, NAME, AGE, HEIGHT, WEIGTH) {
    var insterTableSQL = 'INSERT INTO ' + tableName + ' (NAME,AGE,HEIGHT,WEIGTH) VALUES (?,?,?,?)';
    WEBSQL_DB.transaction(function(ctx) {
        ctx.executeSql(insterTableSQL, [NAME, AGE, HEIGHT, WEIGTH], function(ctx, result) {
                console.log("插入" + tableName + NAME + "成功");
            },
            function(tx, error) {
                console.error('插入失败: ' + error.message);
            });
    });
}
/** 
 * 获取数据库一个表单里面的所有数据 
 * @param tableName:表单名 
 * 返回数据集合 
 */
export function getAllData(tableName) {
    var selectALLSQL = 'SELECT * FROM ' + tableName;
    WEBSQL_DB.transaction(function(ctx) {
        ctx.executeSql(selectALLSQL, [], function(ctx, result) {
            console.log('查询成功: ' + tableName + result.rows.length);
            var len = result.rows.length;
            for (var i = 0; i < len; i++) {
                console.log("NAME = " + result.rows.item(i).NAME);
                console.log("AGE = " + result.rows.item(i).AGE);
                console.log("HEIGHT = " + result.rows.item(i).HEIGHT);
                console.log("WEIGTH = " + result.rows.item(i).WEIGTH);
                console.log("-------- 我是分割线 -------");
            }
        },
        function(tx, error) {
            console.error('查询失败: ' + error.message);
        });
    });
}
/** 
 * 获取数据库一个表单里面的部分数据 
 * @param tableName:表单名 
 * @param name:姓名 
 */
export function getOneData(tableName, name) {
    var selectSQL = 'SELECT * FROM ' + tableName + ' WHERE NAME = ?'
    WEBSQL_DB.transaction(function(ctx) {
        ctx.executeSql(selectSQL, [name], function(ctx, result) {
                console.log('查询成功: ' + tableName + result.rows.length);
                var len = result.rows.length;
                for (var i = 0; i < len; i++) {
                    console.log("NAME = " + result.rows.item(i).NAME);
                    console.log("AGE = " + result.rows.item(i).AGE);
                    console.log("HEIGHT = " + result.rows.item(i).HEIGHT);
                    console.log("WEIGTH = " + result.rows.item(i).WEIGTH);
                }
            },
            function(tx, error) {
                console.error('查询失败: ' + error.message);
            });
    });
}
/** 
 * 删除表单里的全部数据 
 * @param tableName:表单名 
 */
export function deleteAllDataFromTable(tableName) {
    var deleteTableSQL = 'DELETE FROM ' + tableName;
    localStorage.removeItem(tableName);
    WEBSQL_DB.transaction(function(ctx, result) {
        ctx.executeSql(deleteTableSQL, [], function(ctx, result) {
            console.log("删除表成功 " + tableName);
        }, function(tx, error) {
            console.error('删除表失败:' + tableName + error.message);
        });
    });
}
/** 
 * 根据name删除数据 
 * @param tableName:表单名 
 * @param name:数据的姓名 
 */
export function deleteOneDataFromTable(tableName, name) {
    var deleteDataSQL = 'DELETE FROM ' + tableName + ' WHERE NAME = ?';
    localStorage.removeItem(tableName);
    WEBSQL_DB.transaction(function(ctx, result) {
        ctx.executeSql(deleteDataSQL, [name], function(ctx, result) {
            console.log("删除成功 " + tableName + name);
        }, function(tx, error) {
            console.error('删除失败:' + tableName + name + error.message);
        });
    });
}
/** 
 * 根据name修改数据 
 * @param tableName:表单名 
 * @param name:姓名 
 * @param age:年龄 
 */
export function updateOneData(tableName, name, age) {
    var updateDataSQL = 'UPDATE ' + tableName + ' SET AGE = ? WHERE NAME = ?';
    WEBSQL_DB.transaction(function(ctx, result) {
        ctx.executeSql(updateDataSQL, [age, name], function(ctx, result) {
            console.log("更新成功 " + tableName + name);
        }, function(tx, error) {
            console.error('更新失败:' + tableName + name + error.message);
        });
    });
}