let url1 = "https://api.coindesk.com/v1/bpi/currentprice.json";
let bitcoinPrices = "";
// call API
fetch(url1)
  .then(function(response) {
    // make sure the request was successful
    if (response.status != 200) {
      return {
        text: "Error calling the API service: " + response.statusText
      }
    }
    return response.json();
  }).then(function(json) {
    // update DOM with response
    console.log(json);
    bitcoinPrices += '<div class = "item"><h2>USD: ' + json.bpi.USD.symbol + json.bpi.USD.rate + '</h2></div>';
    bitcoinPrices += '<div class = "item"><h2>EUR: ' + json.bpi.EUR.symbol + json.bpi.EUR.rate + '</h2></div>';
    bitcoinPrices += '<div class = "item"><h2>GBP: ' + json.bpi.GBP.symbol + json.bpi.GBP.rate + '</h2></div>';

    console.log(bitcoinPrices);
    document.getElementById('result2').innterHTML = bitcoinPrices;
    console.log(document.getElementById('result2').innterHTML);
  });


function onClick(e) {
  e.preventDefault();
  // get form values
  let s = document.getElementById('selector');
  let crypto_name = s.options[s.selectedIndex].value;
  let x = document.getElementById('date_selector');
  let date = x.options[x.selectedIndex].value;
  let results = "";

  //current rates
  // setup URL
  let url = "http://api.coinlayer.com/api/live?access_key=3fb3c9de05652f0fd5b1c6470b5f7623"; //change to list!!!????
  // call API
  fetch(url)
    .then(function(response) {
      // make sure the request was successful
      if (response.status != 200) {
        return {
          text: "Error calling the API service: " + response.statusText
        }
      }
      return response.json();
    }).then(function(json) {
      // update DOM with response
      console.log(json);

      results += '<div class = "item"><h2>Current Price: ' + json.rates[crypto_name] + ' USD</h2></div>';
      //add times spans

      document.getElementById('result').innerHTML = results;
    });

    //historical rates
    if(date != 'current'){
      // setup URL
      let url = "http://api.coinlayer.com/api/" + date + "-01-01?access_key=3fb3c9de05652f0fd5b1c6470b5f7623";
      // call API
      fetch(url)
        .then(function(response) {
          // make sure the request was successful
          if (response.status != 200) {
            return {
              text: "Error calling the API service: " + response.statusText
            }
          }
          return response.json();
        }).then(function(json) {
          // update DOM with response
          console.log(json);

          results += '<div class = "item"><h2>Price at start of ' + date + ': ' + json.rates[crypto_name] + ' USD</h2></div>';

          document.getElementById('result').innerHTML = results;
        });
    }
}

function onClick2(e) {
  e.preventDefault();

  let s = document.getElementById('currency_selector');
  let currency = s.options[s.selectedIndex].value;
  let results = "";

  let url = "https://api.coindesk.com/v1/bpi/currentprice/" + currency + ".json";
  // call API
  fetch(url)
    .then(function(response) {
      // make sure the request was successful
      if (response.status != 200) {
        return {
          text: "Error calling the API service: " + response.statusText
        }
      }
      return response.json();
    }).then(function(json) {
      // update DOM with response
      console.log(json);
      if(currency === 'CHF'){
          results += '<div class = "item"><h2>Current Price: ' + json.bpi.CHF.rate + " " + json.bpi.CHF.code + '</h2></div>';
      } else if(currency === 'CNY'){
          results += '<div class = "item"><h2>Current Price: ' + json.bpi.CNY.rate + " " + json.bpi.CNY.code + '</h2></div>';
      } else if(currency === 'DKK'){
          results += '<div class = "item"><h2>Current Price: ' + json.bpi.DKK.rate + " " + json.bpi.DKK.code + '</h2></div>';
      } else if(currency === 'HKD'){
          results += '<div class = "item"><h2>Current Price: ' + json.bpi.HKD.rate + " " + json.bpi.HKD.code + '</h2></div>';
      } else if(currency === 'JPY'){
          results += '<div class = "item"><h2>Current Price: ' + json.bpi.JPY.rate + " " + json.bpi.JPY.code + '</h2></div>';
      } else if(currency === 'PHP'){
          results += '<div class = "item"><h2>Current Price: ' + json.bpi.PHP.rate + " " + json.bpi.PHP.code + '</h2></div>';
      }
      document.getElementById('result3').innerHTML = results;
    });

}

function updateResult(info) {
  document.getElementById('result').textContent = info;
}

document.getElementById('submit').addEventListener('click', onClick);
document.getElementById('submit3').addEventListener('click', onClick2);
