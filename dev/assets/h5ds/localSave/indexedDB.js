// 关系型数据库 
// @param INDEXEDDB_DB : 全局的数据库实例化对象
const conf = {
    name: 'H5DS', // 数据库名字
    version: 1, // 版本
    ojstore: {
        "img": { keyPath: "id" } // 主健id
    }
};

/**
 * 打开数据库
 */
export function openDB() {

    return new Promise((resolve, reject) => {
        let indexedDB = window.indexedDB || window.webkitindexedDB;
        let request = indexedDB.open(conf.name);

        request.onerror = function (e) {
            console.error(e.currentTarget.error.message);
            reject(false);
        };
        request.onsuccess = function (e) {
            window.INDEXEDDB_DB_RET = e.target.result;
            console.log('成功建立并打开数据库:' + conf.name + ' version' + conf.version);
            resolve(true);
        };
        request.onupgradeneeded = function (e) {
            let db = e.target.result;
            let transaction = e.target.transaction;

            for (let key in conf.ojstore) {
                if (!db.objectStoreNames.contains(key)) {
                    //没有该对象空间时创建该对象空间
                    db.createObjectStore(key, conf.ojstore[key]);
                    console.log('成功建立对象存储空间：' + key);
                }
            }
        }
        window.INDEXEDDB_DB = indexedDB;
    });

}

/**
 * 删除数据库
 */
export function deleteDB(dbname) {
    let self = this;
    INDEXEDDB_DB.deleteDatabase(dbname);
    console.log(dbname + '数据库已删除')
}

//关闭数据库
export function closeDB() {
    INDEXEDDB_DB_RET.close();
    console.log('数据库已关闭')
}

//添加数据，重复添加会报错
export function addData(storename, data, callback) {
    let store = INDEXEDDB_DB_RET.transaction(storename, 'readwrite').objectStore(storename);
    for (let i = 0; i < data.length; i++) {
        let request = store.add(data[i]);
        request.onerror = function () {
            console.error('add添加数据库中已有该数据')
        };
        request.onsuccess = function () {
            console.log('add添加数据已存入数据库')
            callback();
        };
    }
}

// 添加数据，重复添加会更新原有数据
export function putData(storename, data) {
    console.log(data)
    let store = INDEXEDDB_DB_RET.transaction(storename, 'readwrite').objectStore(storename);
    for (let i = 0; i < data.length; i++) {
        let request = store.put(data[i]);
        request.onerror = function () {
            console.error('put添加数据库中已有该数据')
        };
        request.onsuccess = function () {
            console.log('put添加数据已存入数据库')
        };
    }
}

//根据存储空间的键找到对应数据
export function getDataByKey(storename, key, callback) {
    let store = INDEXEDDB_DB_RET.transaction(storename, 'readwrite').objectStore(storename);
    let request = store.get(key);
    request.onerror = function () {
        console.error('getDataByKey error');
    };
    request.onsuccess = function (e) {
        let result = e.target.result;
        console.log('查找数据成功')
        console.log(result);
        $(document).off('event_getDataByKey').on('event_getDataByKey', result);
        if (callback) {
            callback(result);
        }
    };
}

// 获取全部数据 ，根据 storename
export function getAllData(storename, callback) {
    let store = INDEXEDDB_DB_RET.transaction(storename, 'readwrite').objectStore(storename);
    let request = store.openCursor();
    let data = [];
    request.onerror = function () {
        console.error('getDataByKey error');
    };
    request.onsuccess = function (e) {
        let result = e.target.result;
        if (result && result !== null) {
            data.push(result.value);
            result.continue();
        } else {
            if (callback) {
                console.log('全部查找数据成功')
                callback(data);
            }
        }
    };
}

//删除某一条记录
export function deleteData(storename, key) {
    let store = store = INDEXEDDB_DB_RET.transaction(storename, 'readwrite').objectStore(storename);
    store.delete(key)
    console.log('已删除存储空间' + storename + '中' + key + '记录');
}

//删除存储空间全部记录
export function clearData(storename) {

    let store = INDEXEDDB_DB_RET.transaction(storename, 'readwrite').objectStore(storename);
    store.clear();
    console.log('已删除存储空间' + storename + '全部记录');
}