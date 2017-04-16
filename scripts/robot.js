"use strict";
 
module.exports = function(robot){
    robot.hear(/hello/i, function(res){
        res.reply('world');
    });
}