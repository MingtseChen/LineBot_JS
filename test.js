function do_a(callback) {
  setTimeout(function() {
    // 模擬一個需要長間的 function
    console.log('`do_a`: 這個需要的時間比 `do_b` 長');

    // 如果 callback 存在的話就執行他
    callback && callback();
  }, 3000);
}

function do_b() {
  console.log('`do_b`: 現在我們就可以肯定 `do_b` 出現在 `do_a` 之後了');
}

do_a(function() {
  do_b();
});