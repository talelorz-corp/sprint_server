const ds = require('../src/repository/datasource')

datasource = ds.mysqlDatasource()
function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 2000);
    });
}

async function asyncCall(){
    console.log('before call')
    val = await resolveAfter2Seconds()
    console.log('after call')
    return val
}

let q = asyncCall();
q.then((val) => {
    console.log("at main: ", val)
})

console.log('end main')
