const modal = document.getElementById('blogPage');
const addBlogBtn = document.getElementById('addBlogBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const submit = document.getElementById('submit')
const title = document.getElementById('title')
const content = document.getElementById('content')
const author = document.getElementById('author')
const blogs = document.getElementById('blogs')
const displayTitle = document.getElementById('display-title')
const displayContent = document.getElementById('display-content')
const displayAuthor = document.getElementById('display-author')
submit.addEventListener('click',addPost)
blogs.addEventListener('load',load)
async function load() {
 try{
    const res = await fetch('https://crudcrud.com/api/d249efdd8e68411cb64f15b35abae469/blogs')
    const data = await res.json();
    data.forEach(blog => {
        blogs.innerHTML +=  `
        <div class="bg-white shadow-md rounded p-7">
            <h1 class="text-2xl font-semibold mb-4">${blog.title}</h1>
            <p class="text-base font-serif  mb-4">${blog.content}</p>
            <h6 class="text-sm text-gray-600">${blog.author}</h6>
        </div>
    `
    });
 }catch (e){
    blogs.innerHTML = e.message
 }
}
load()

function showModal() {
    modal.classList.remove('hidden');
}

function hideModal() {
    modal.classList.add('hidden');
}
async function addPost() {
    const blog = {
        title : title.value,
        content : content.value,
        author : author.value
    }
    try{
        await fetch('https://crudcrud.com/api/d249efdd8e68411cb64f15b35abae469/blogs',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blog),
        },
    console.log('blog added')
    )
      }
      catch (e){
        console.log(e.message)
      }
    }

addBlogBtn.addEventListener('click', (event) => {
      event.preventDefault();
      showModal();
});

closeModalBtn.addEventListener('click', hideModal);

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        hideModal();
    }
});

document.getElementById('blogForm').addEventListener('submit', (event) => {
    event.preventDefault();
    hideModal();
});