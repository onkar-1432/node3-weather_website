console.log("client side javascript loaded")
var weatherform=document.querySelector('form')
const search=document.querySelector('input')
const paragraphs=document.querySelectorAll('p')

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location =search.value
    paragraphs[1].textContent="loading..."
    paragraphs[2].textContent=''
    fetch("http://localhost:3000/weather?address="+location).then((response) => {
    response.json().then((data)=>{
          if(data.error)
          {
              paragraphs[1].textContent=("Error")
          }
          else{
            
            paragraphs[1].textContent=(data.location)
            paragraphs[2].textContent=(data.forecast)
          }

        
    })
})
    
})


