async function myButton() {
    const response = await fetch("https://derekzongnan-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/");
    const movies = await response.json();
    console.log(movies);
  }