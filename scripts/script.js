module.exports = function(robot) {
  robot.hear(/(Hello|hello|Hi|hi|你好|安安|早安|午安|晚安|哈囉|安)/, function(response) {
    re = ['Hello', 'hello', 'Hi', 'hi',response.match[1]];
    response.send(response.random(re));
  });
}