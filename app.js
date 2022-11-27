class InfiniteScroll {

    constructor(container, loader) {
        this.container = container;
        this.loader = loader;
        this.loading = false;
        this.page = 1;
        this.init();
    }

    init() {
        window.onload = this.getData;

        window.addEventListener('scroll', () => {
            if (this.loading) return;
            if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
                this.setLoading(true);
                this.getData();
            }
        });
    }

    setLoading(flag) {
        if (flag) {
            this.loader.classList.remove('hidden');
        } else {
            this.loader.classList.add('hidden');
        }
        this.loading = flag;
    }

    getData = async () => {
        const apiUrl = `https://jsonplaceholder.typicode.com/posts?_page=${this.page}&_limit=8`;
        try {
            const response = await fetch(apiUrl);
            const photosArray = await response.json();
            this.displayPosts(photosArray);
        } catch (error) {
            console.error(error);
        }
        this.page++;
        this.setLoading(false);
    }

    displayPosts(posts) {
        this.container.innerHTML += posts.map( post => {
            return `
                <div class='post'>
                    <h3>${this.capitalizeFirstLetter(post.title)}</h3>
                    <p>${this.capitalizeFirstLetter(post.body)}</p>
                </div>
            `
        }).join('');
    }

    capitalizeFirstLetter(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

}

const iScroll = new InfiniteScroll(document.querySelector('.container'), document.querySelector('.loader-box'));
