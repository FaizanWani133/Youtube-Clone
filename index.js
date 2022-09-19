const API_KEY = "AIzaSyDowwRX94PVNPGEwC2FPAIRbWXYRO7MF9U";
const api =
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=[YOUR_API_KEY]";
  trending();

document.getElementById("searchBtn").addEventListener("click", getData);


async function getData() {
  event.preventDefault();
  let name = document.getElementById("searchInput").value;
  try {
    const val = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=${name}&key=${API_KEY}`
    );
    const result = await val.json();
    displayData(result.items);
    console.log(result);
    document.getElementById("filter-by-type").addEventListener("change",()=>{
      handleType(result.items);
    })
    document.getElementById("filter-by-time").addEventListener("change",()=>{
      handleDate(result.items);
    })
   
    
  } catch (err) {
    console.log(err);
  }
}

function displayData(data) {
    // function handleTime(data){
    //     let val = document.getElementById("filter-by-type").value;
    //     // let newArr  = data.filter((elem)=>{
    //     //     return elem.snippet.publishTime 
    //     // })
        
    //   }
    
  document.getElementById("contentBox").innerText = "";
  data.map((elem) => {
    // console.log(elem.snippet.publishedAt)
    // myDateFormatter(elem.snippet.publishTime);
    // console.log(newdate)
    let div = document.createElement("div");
    div.id = "videoCard";
    
    let img = document.createElement("img");
    img.id = "thumbnail";
    img.style.width="100%"
    
    let title = document.createElement("p");
    title.id = "title";
    img.src = elem.snippet.thumbnails.medium.url;
    title.innerText = elem.snippet.title;
    div.append(img, title);
    document.getElementById("contentBox").append(div);
    div.addEventListener("click", () => {
      modalOpen(elem);
    });
  });
}


function modalOpen(elem) {
    // document.addEventListener("click",removeModal)
  let modalbg = document.createElement("div");
  modalbg.id="modalBg"
  let div = document.createElement("div");
  div.id="modalBox"
  div.className="videowrapper"
 
  
  let iframe =`<button id="closeBtn">X</button><iframe width="560" height="315" src="https://www.youtube.com/embed/${elem.id.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  div.innerHTML=iframe;
  
  modalbg.append(div);
  document.querySelector("body").append(modalbg);
  document.querySelector("body").style.overflow="hidden"
  document.getElementById("closeBtn").addEventListener("click",removeModal);

}



function removeModal(){
    event.target.parentNode.parentNode.remove();
    document.querySelector("body").style.overflow="visible"
    
}


async function trending() {
   
    
    try {
      const val = await fetch(`https://youtube.googleapis.com/youtube/v3/search?order=viewCount&part=snippet&maxResults=30&q=trending&key=${API_KEY}`);
      const result = await val.json();
      
      console.log(result);
      displayData(result.items);
      document.getElementById("filter-by-type").addEventListener("change",()=>{
        handleType(result.items);
      })
      document.getElementById("filter-by-time").addEventListener("change",()=>{
        handleDate(result.items);
      })
      
    } catch (err) {
      console.log(err);
    }
  }

//   function myDateFormatter(date) {
//     var isODate = new Date(date);

//    var shortDate = new Date(isODate);
//     var day = shortDate.getDate();
//    var month = shortDate.getMonth() + 1;
//     var year = shortDate.getFullYear();

//    var stringdate = day+"-"+month+"-"+year;
// console.log(stringdate); 
//   }
  
  function darkmode(){
    if(document.querySelector("body").id==="light"){
        document.querySelector("body").id="dark"
        var a = document.querySelectorAll("#title");
        for(let i=0;i<a.length;i++){
            a[i].style.color="white"
        }
        document.getElementById("navbar").style.backgroundColor="#202124"
        document.getElementById("navbar").style.borderColor="white"
        
        var c = document.querySelectorAll("#modalBtn");
        for(let i=0;i<c.length;i++){
            c[i].style.backgroundColor="#202124"
        }
        document.getElementById("filter-by-time").style.backgroundColor="#202124"
        document.getElementById("filter-by-time").style.color="white"
        document.getElementById("filter-by-type").style.backgroundColor="#202124"
        document.getElementById("filter-by-type").style.color="white"
        document.querySelector("#navbar>div>button").id="lightMode"
        document.querySelector("#navbar>div>button").innerText="Light"
        document.getElementById("logo").src="https://www.logo.wine/a/logo/YouTube/YouTube-White-Full-Color-Dark-Background-Logo.wine.svg"
        
    }else{
        document.querySelector("body").id="light"
        var b = document.querySelectorAll("#title");
        for(let i=0;i<b.length;i++){
            b[i].style.color="#202124"
        }
        document.getElementById("navbar").style.backgroundColor="white"
        document.getElementById("navbar").style.borderColor="#202124"
        
        

        var c = document.querySelectorAll("#modalBtn");
        for(let i=0;i<c.length;i++){
            c[i].style.backgroundColor="white"
        }
        document.getElementById("filter-by-time").style.backgroundColor="white"
        document.getElementById("filter-by-time").style.color="#202124"
        document.getElementById("filter-by-type").style.backgroundColor="white"
        document.getElementById("filter-by-type").style.color="#202124"
        document.querySelector("#navbar>div>button").id="darkMode"
        document.querySelector("#navbar>div>button").innerText="Dark"
        document.getElementById("logo").src="https://www.logo.wine/a/logo/YouTube/YouTube-Logo.wine.svg"
        
    }
    

  }
  function handleType(data){
    let val = document.getElementById("filter-by-type").value;
    if(val == "video"){
      let newArr  = data.filter((elem)=>{
        return elem.id.kind == "youtube#video"
      })
      
      console.log(newArr)
      displayData(newArr)
    }else if(val == "channel"){
      let newArr  = data.filter((elem)=>{
        return elem.id.kind == "youtube#channel"
      })
     
      console.log(newArr)
      displayData(newArr)
    }
    else if(val == "movie"){
      let newArr  = data.filter((elem)=>{
        return elem.id.kind == "youtube#movie"
      })
      
      console.log(newArr)
      displayData(newArr)
    }
    else if(val == "playlist"){
      let newArr  = data.filter((elem)=>{
        return elem.id.kind == "youtube#playlist"
      })
      
      console.log(newArr)
      displayData(newArr)
    }else{
      displayData(data)
    }
    
  }
  function handleDate(data){
    let val = document.getElementById("filter-by-time").value;
    let currentDate = new Date();
    
    if(val == "hour"){
      let newArr  = data.filter((elem)=>{
        let date = new Date(elem.snippet.publishTime);
        
        return parseInt(currentDate.getTime()) - parseInt(date.getTime()) <= 3600000 ;
      })
      
      console.log(newArr)
      displayData(newArr)
    }else if(val == "week"){
      let newArr  = data.filter((elem)=>{
        let date = new Date(elem.snippet.publishTime);
        return parseInt(currentDate.getTime()) - parseInt(date.getTime()) <= 604800000;
      })
      
      console.log(newArr)
      displayData(newArr)
    }
    else if(val == "month"){
      let newArr  = data.filter((elem)=>{
        let date = new Date(elem.snippet.publishTime);
        return parseInt(currentDate.getTime()) - parseInt(date.getTime()) <= 2628003600;
      })
      
      console.log(newArr)
      displayData(newArr)
    }
    else if(val == "year"){
      let newArr  = data.filter((elem)=>{
        let date = new Date(elem.snippet.publishTime);
        return parseInt(currentDate.getTime()) - parseInt(date.getTime()) <= (2628003600*12);
      })
      
      console.log(newArr)
      displayData(newArr)
    }else{
      displayData(data)
    }
    
  }


  
 
  // console.log(date.getTime())
  // console.log()
  
 



