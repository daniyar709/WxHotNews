export default class NetTool {
  getArticle = function(page, callback) {
    let url =
      "http://api.tianapi.com/guonei/?key=deafa6c952869e3b7d80291ce3d3c20d&num=10";
    fetch(url, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        callback(data);
      })
      .catch(err => {
        console.log(err);
      });
  };
}
