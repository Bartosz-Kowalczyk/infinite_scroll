class InfiniteScroll {

    constructor(container) {
        this.container = container;
        this.init();
    }

    init() {
        window.onload = this.getData;
    }

    getData = async () => {
        const apiUrl = `https://jsonplaceholder.typicode.com/posts?_page=1&_limit=4`;
        try {
            const response = await fetch(apiUrl);
            const photosArray = await response.json();
            this.displayPosts(photosArray);
        } catch (error) {
            console.error(error);
        }
    }

    displayPosts(posts) {
        this.container.innerHTML += posts.map( post => {
            return `
                <div class='post'>
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                </div>
            `
        }).join('');
    }

}

const iScroll = new InfiniteScroll(document.querySelector('.container'));
