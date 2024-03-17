var resultList = [];

var h3Elements = document.querySelectorAll("h3");

h3Elements.forEach(function (element) {
  var parentAnchor = element.closest("a");
  if (parentAnchor) {
    var link = parentAnchor.getAttribute("href");
    var title = element.textContent.trim();
    var result = {
      link: link,
      title: title,
    };
    resultList.push(result);
  } else {
    console.log("No parent anchor found for element", element);
  }
});

resultJson = JSON.stringify(resultList);

if (confirm(resultJson)) {
  copy(resultJson);
} else {
  txt = "Cancelled";
}
