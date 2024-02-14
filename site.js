const jsonObj=null;


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  

async function getRandomFlag() {
    const response = await fetch("https://flagcdn.com/en/codes.json");
    const codeList = await response.json();
    
  
    const image = document.getElementById("image");
    const countryName=document.getElementById("countryName");

    var data =JSON.parse(JSON.stringify(codeList));
    var flagData="";
    
    var objLength=Object.keys(data).length-1;

    var randomCountryKey=Object.keys(data)[getRandomInt(objLength)];
    console.log(randomCountryKey);
    
   

    image.src = "https://flagcdn.com/w2560/"+randomCountryKey+".png";
    //flagData="<img src=\"https://flagcdn.com/w2560/"+randomCountryKey+".png\" height=\"200px\" wdth=\"200px\"> ";

    // for (var key in data) {
      
    //    //    console.log(data[key],key);

    //        flagData=flagData+ "<img src=\"https://flagcdn.com/w2560/"+key+".png\" height=\"20px\" wdth=\"20px\"> ";
      
    //  }



     image.innerHTML=flagData;
     countryName.innerHTML=data[randomCountryKey];

     countryName.style.display="none";
     
   
    

  }

  function showCoountryName()
  {
    const countryName=document.getElementById("countryName");
    const showCountryName=document.getElementById("showCountryName");

    if (countryName.style.display === "none") {
        countryName.style.display = "block";
        showCountryName.textContent="Hide Country Name";
      } else {
        countryName.style.display = "none";
        showCountryName.textContent="Show Country Name";
      }
  }

  getRandomFlag();



  
// Get the share button element
const shareBtn = document.getElementById("share-btn");

// Add a click event listener to the button
shareBtn.addEventListener("click", async () => {
  // Check if the Web Share API is supported
  if (navigator.share) {
    // Try to share the data

    
    const image = document.getElementById("image");
    const countryName=document.getElementById("countryName");
    
    const response = await fetch(image.src);
    const blob = await response.blob();
    const filesArray = [
      new File(
        [blob],
        'randomflag.jpg',
        {
          type: "image/jpeg",          
          lastModified: new Date().getTime()
        }
     )
    ];

    const shareData = {
      files: filesArray,            
      title: "Random Flag",
      text: "Flag of "+countryName.innerHTML
      
    };



    try {
      await navigator.share(shareData);
      console.log("Data shared successfully");
    } catch (err) {
      // Handle any errors
      console.error("Error while sharing:", err);
    }
  } else {
    // Fallback to some other sharing method
    console.log("Web Share API not supported");
  }
});





