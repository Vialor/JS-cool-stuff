// function addScriptTag(src) {
//     var script = document.createElement('script');
//     script.setAttribute("type","text/javascript");
//     script.src = src;
//     document.body.appendChild(script);
//   }
  
//   window.onload = function () {
//     const msg = encodeURI("你好");
//     addScriptTag(`http://api.qingyunke.com/api.php?key=free&appid=0&msg=${msg}&callback=foo`);
//   }
  
//   function foo(data) {
//     console.log(data);
//   };

function handleResponse(response){
    console.log(response);
}
window.onload = function() {
    var oBtn = document.getElementById('btn');

    oBtn.onclick = function() {     

    var script = document.createElement("script");
    script.src = "https://api.douban.com/v2/book/search?q=javascript&count=1&callback=handleResponse";
    document.body.insertBefore(script, document.body.firstChild);   
    };
};