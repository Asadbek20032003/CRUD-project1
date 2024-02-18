// https://react-bootstrap.netlify.app/docs/components/pagination/
const posts = document.getElementById("posts");
const currentLimit = document.getElementById("limit");
const btnCuttentLimit = document.getElementById("btn-limit");
const pagination = document.getElementById("pagination");

let total = 100;
let limit = 10;
let page = 1;
let currentPage = 1;

const getData = async (page = 1, limit) => {
  while (posts.firstChild) {
    posts.removeChild(posts.firstChild);
  }
  await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
    .then((res) => res.json())
    .then((res) => {
      res.forEach((element) => {
        const post = document.createElement("div");
        post.innerText = element.title;
        posts.appendChild(post);
      });
      setPagination();
    })
    .catch((err) => {
      console.log(err);
    });
};

const handlePage = (page) => {
  page = page;
  getData(page);
};

getData();

btnCuttentLimit.addEventListener("click", async () => {
  limit = currentLimit.value;
  getData(page, limit); 
});

const ellipsis = "...";

// ellipsis.classList.add("dots")

const btnPages = () => {

  const c = currentPage;
  const t = Math.ceil(total / limit); 

   if (t <= 7) {
    const pages = [];
    for (let i = 1; i <= t; i++) pages.push(i);
    return pages;
   } else {
    let pages = [];    
    if (c <= 3) {
      
      pages = [1, 2, 3, 4, 5, ellipsis, t];
    } else if (c >= t - 3) {
      pages = [1, ellipsis, t - 4, t - 3, t - 2, t - 1, t];
    }
    
     else {
      pages = [1, ellipsis, c, c + 1, c + 2, ellipsis, t];
    }
   
    return pages;
   }


};



function setPagination() {
  while (pagination.firstChild) {
    pagination.removeChild(pagination.firstChild);
  }
  
   const prevBtn = document.createElement('button')
   prevBtn.textContent = 'prev'
   pagination.appendChild(prevBtn)

prevBtn.classList.add("prev")

   prevBtn.addEventListener( "click" ,()=>{   
     

    getData(currentPage,limit)
    currentPage -= 1;

   });
   if(currentPage <= 1 && currentPage == 1 ){
    prevBtn.remove();
   }


  btnPages().forEach((i) => {
    
    
    const btn = document.createElement("button");
 

    btn.addEventListener("click", () => {
      getData(i, limit); 
      currentPage = i;
      
    });    
    btn.textContent = i;
     btn.classList.add("numb");
     pagination.appendChild(btn);
   
     if( currentPage == i){
      btn.classList.add("active")     
    }

    if(i == ellipsis){
      btn.classList.remove("numb")
      btn.remove();  
  const ptag = document.createElement("p")
      ptag.classList.add("dots")
  pagination.appendChild(ptag)
  ptag.textContent = "..."

        // preventDefault();
      //   const dots = document.getElementsByClassName("dots");
      // dots.preventDefault();
    }
    });
    



  const nextBtn = document.createElement('button')
  nextBtn.textContent = 'next'
  pagination.appendChild(nextBtn)
 
nextBtn.classList.add("next")
  nextBtn.addEventListener( "click" ,()=>{
     
    getData(currentPage , limit)

    currentPage  += 1;

    
    

  })

  if( currentPage == Math.ceil(total / limit) ){
    nextBtn.remove();
   } 
}