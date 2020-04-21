// This script needs to be run in your console.
// It will output an array of your results values which can then be transformed into a JSON object.

var dataset = [];
var i;
for (i=0; i<document.querySelectorAll("<< id of your product results >>").length; i++) {
  product = {
    "id": i,
    "image": document.querySelectorAll("<< element id for images >>")[i].getAttribute("src"),
    "name": document.querySelectorAll("<< element id for titles >>")[i].textContent,
    "size": document.querySelectorAll("<< element id for additional attributes >>")[i].textContent,
    "price": document.querySelectorAll("<< element id for prices >>")[i].textContent.slice(13,18)
  };
  dataset.push(product);
}
console.log(dataset);
