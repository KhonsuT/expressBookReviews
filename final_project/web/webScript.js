// async function myButton() {
//     const response = await fetch("https://derekzongnan-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/");
//     const movies = await response.json();
//     console.log(movies);
//   }

async function login() {
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  url = "";
  const response = await fetch(url+`/login?username={username}&password={passowrd}`);
  document.getElementById("UsernameSpan").innerHTML = response.json();
}