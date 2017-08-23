/**
 * Created by Administrator on 2016/1/16.
 */
var food = require('./food.json');
var food = require('./use.json');
var all = {errno:0,items:food.items.concat(use.items)};
var getInfo = function(type,response){
    //response.writeHead(200,{'content-type':''})
    if(type == 1){
        response.end(JSON.stringify(food)) //发送响应主体
    }else if(type == 2){
        response.end(JSON.stringify(use)) //发送响应主体
    }else{
        response.end(JSON.stringify(all)) //发送响应主体

    }
}
module.exports = getInfo;
