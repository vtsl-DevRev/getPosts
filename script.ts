const getButton = document.getElementById('getPosts') as HTMLButtonElement;
const refreshButton = document.getElementById("refresh") as HTMLButtonElement;
const output = document.getElementById('output') as HTMLDivElement;

// navButtons 
const homeButton = document.getElementById('home') as HTMLButtonElement;
const recentlyDeletedButton = document.getElementById('recentlyDeleted') as HTMLButtonElement;
const likedButton = document.getElementById('liked') as HTMLButtonElement;

interface Post {
    delete: number;
    like: boolean;
    userId: string;
    id: string;
    title: string;
    body: string;
}

let posts: Post[] = JSON.parse(localStorage.getItem("posts") || '[]');
let index: number = JSON.parse(localStorage.getItem("index") || '1');

getButton.addEventListener('click', async () => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${index}`);
        const data = await response.json();
        if (data.id) {
            const postData: Post = {
                delete: 0,
                like: false,
                userId: data.userId,
                id: data.id,
                title: data.title,
                body: data.body
            };
            posts.push(postData);
            localStorage.setItem("posts", JSON.stringify(posts));
            appendRecentlyFetchedPost(postData);
            index++;
            localStorage.setItem("index", JSON.stringify(index));
        } else {
            const finalText = document.createElement('h2');
            finalText.className = 'finalText';
            finalText.innerText = 'No more posts to show';
            output.appendChild(finalText);
        }
    } catch (error) {
        console.log(error);
    }
});

window.onload = () => {
    output.innerHTML = '';
    homeButton.click();
};  

function appendRecentlyFetchedPost(postData: Post): void {
    const newPost = document.createElement('div');
    newPost.className = 'posts';
    newPost.innerHTML = `
        <h2>${postData.title}</h2>
        <p>${postData.body}</p>
        <div id="postAction">
            <button id="likeToggleIcon"><img src="assets/like.svg" class="icons"></button>
            <button id="deleteIcon"><img src="assets/delete.svg" class="icons"></button>
        </div>
    `;

    output.appendChild(newPost);
    newPost.scrollIntoView();

    const likedButton = newPost.querySelector('#likeToggleIcon') as HTMLButtonElement;
    const deleteButton = newPost.querySelector('#deleteIcon') as HTMLButtonElement;

    likedButton.addEventListener('click', () => {
        const currTitle = likedButton.parentElement?.parentElement?.querySelector('h2')?.innerText;
        const likedIndex = posts.findIndex(post => post.title === currTitle);

        if (posts[likedIndex].like) {
            likedButton.setAttribute('style', 'background-color: #fff');
        } else {
            likedButton.setAttribute('style', 'background-color: #4caf50');
        }
        posts[likedIndex].like = !posts[likedIndex].like;
        localStorage.setItem("posts", JSON.stringify(posts));
    });

    deleteButton.addEventListener('click', () => {
        const currTitle = likedButton.parentElement?.parentElement?.querySelector('h2')?.innerText;
        const deletedIndex = posts.findIndex(post => post.title === currTitle);

        newPost.style.display = 'none';
        posts[deletedIndex].delete = 1;
        localStorage.setItem("posts", JSON.stringify(posts));
    });
};

homeButton.addEventListener('click', () => {
    output.innerHTML = '';
    posts.forEach(post => {
        if (!post.delete) {
            const newPost = document.createElement('div');
            newPost.className = 'posts';
            newPost.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <div id="postAction">
                    <button id="likeToggleIcon"><img src="assets/like.svg" class="icons"></button>
                    <button id="deleteIcon"><img src="assets/delete.svg" class="icons"></button>
                </div>
            `;

            output.appendChild(newPost);

            const likedButton = newPost.querySelector('#likeToggleIcon') as HTMLButtonElement;
            const deleteButton = newPost.querySelector('#deleteIcon') as HTMLButtonElement;

            likedButton.setAttribute('style', `background-color: ${post.like ? '#4caf50' : '#fff'}`);

            likedButton.addEventListener('click', () => {
                const currTitle = likedButton.parentElement?.parentElement?.querySelector('h2')?.innerText;
                const likedIndex = posts.findIndex(post => post.title === currTitle);

                if (posts[likedIndex].like) {
                    likedButton.setAttribute('style', 'background-color: #fff');
                } else {
                    likedButton.setAttribute('style', 'background-color: #4caf50');
                }
                posts[likedIndex].like = !posts[likedIndex].like;
                localStorage.setItem("posts", JSON.stringify(posts));
            });

            deleteButton.addEventListener('click', () => {
                const currTitle = likedButton.parentElement?.parentElement?.querySelector('h2')?.innerText;
                const deletedIndex = posts.findIndex(post => post.title === currTitle);

                newPost.style.display = 'none';
                posts[deletedIndex].delete = 1;
                localStorage.setItem("posts", JSON.stringify(posts));
            });
        }
    });
});

likedButton.addEventListener('click', () => {
    output.innerHTML = '';
    posts.forEach(post => {
        if (post.like && !post.delete) {
            const newPost = document.createElement('div');
            newPost.className = 'posts';
            newPost.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <div id="postAction">
                    <button id="likeToggleIcon"><img src="assets/like.svg" class="icons"></button>
                    <button id="deleteIcon"><img src="assets/delete.svg" class="icons"></button>
                </div>
            `;

            output.appendChild(newPost);

            const likedButton = newPost.querySelector('#likeToggleIcon') as HTMLButtonElement;
            const deleteButton = newPost.querySelector('#deleteIcon') as HTMLButtonElement;

            likedButton.setAttribute('style', `background-color: ${post.like ? '#4caf50' : '#fff'}`);

            likedButton.addEventListener('click', () => {
                const currTitle = likedButton.parentElement?.parentElement?.querySelector('h2')?.innerText;
                const likedIndex = posts.findIndex(post => post.title === currTitle);

                if (posts[likedIndex].like) {
                    likedButton.setAttribute('style', 'background-color: #fff');
                } else {
                    likedButton.setAttribute('style', 'background-color: #4caf50');
                }
                posts[likedIndex].like = !posts[likedIndex].like;
                localStorage.setItem("posts", JSON.stringify(posts));
            });

            deleteButton.addEventListener('click', () => {
                const currTitle = likedButton.parentElement?.parentElement?.querySelector('h2')?.innerText;
                const deletedIndex = posts.findIndex(post => post.title === currTitle);

                newPost.style.display = 'none';
                posts[deletedIndex].delete = 1;
                localStorage.setItem("posts", JSON.stringify(posts));
            });
        }
    });
});

recentlyDeletedButton.addEventListener('click', () => {
    output.innerHTML = '';
    posts.forEach(post => {
        if (post.delete == 1) {
            const newPost = document.createElement('div');
            newPost.className = 'posts';
            newPost.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <div id="postAction">
                    <button id="restoreIcon"><img src="assets/restore.svg" class="icons"></button>
                    <button id="deleteIcon"><img src="assets/delete.svg" class="icons"></button>
                </div>
            `;

            output.appendChild(newPost);

            const restoreButton = newPost.querySelector('#restoreIcon') as HTMLButtonElement;
            const deleteButton = newPost.querySelector('#deleteIcon') as HTMLButtonElement;

            restoreButton.addEventListener('click', () => {
                const currTitle = restoreButton.parentElement?.parentElement?.querySelector('h2')?.innerText;
                const restoreIndex = posts.findIndex(post => post.title === currTitle);

                newPost.style.display = 'none';
                posts[restoreIndex].delete = 0;
                localStorage.setItem("posts", JSON.stringify(posts));
            });

            deleteButton.addEventListener('click', () => {
                const currTitle = likedButton.parentElement?.parentElement?.querySelector('h2')?.innerText;
                const deletedIndex = posts.findIndex(post => post.title === currTitle);

                const modalDialog = document.getElementById("modalDialog") as HTMLDialogElement;
                modalDialog?.showModal();

                const postTitle = post.title;;
                const confirmDelete = document.getElementById("confirmDelete") as HTMLButtonElement;
                const cancelDelete = document.getElementById("cancelDelete") as HTMLButtonElement;

                confirmDelete.addEventListener('click', () => {
                    const deletedIndex = posts.findIndex(post => post.title === postTitle);
                    posts[deletedIndex].delete = 2;
                    newPost.style.display = 'none';
                    modalDialog?.close();
                });

                cancelDelete.addEventListener('click', () => {
                    modalDialog?.close();
                });

                localStorage.setItem("posts", JSON.stringify(posts));
            });
        }
    });
});

refreshButton.addEventListener('click', () => {
    output.innerHTML = '';
    index = 1;
    posts = [];
    localStorage.setItem("index", JSON.stringify(index));
    localStorage.setItem("posts", JSON.stringify(posts));
});