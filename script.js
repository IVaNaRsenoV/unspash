const CLIENT_ID = "fHj1txp1l1lQ6kZXyG9MajjQcRgPbs6DXv_bqQdOTwE";
const slider = document.getElementById("slider");

let state = [];
let currentSlide;

const fetchPhotos = async () => {
    try {
        const url = `https://api.unsplash.com/photos/random?client_id=${CLIENT_ID}&count=4&query=cars`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (response.ok && data.length) {
            state = data;
            currentSlide = data[0].id;
            setPhotos();
        }

    } catch (error) {
        console.log(error);
    }
};

const renderItem = () => {
    return state.map(({ urls: { regular }, user: { name }, id }) => {

        const isActive = currentSlide === id ? "active" : "";

        return `
            <div class="slide ${isActive}" data-id="${id}" style="background-image: url(${regular})">
                <div class="slide-text">
                    <span>Photo by</span>
                    ${name}
                </div>
            </div>
        `;
    }).join("");
}

const handleClick = ({ currentTarget }) => {
    const slides = document.querySelectorAll(".slide");
    const { id } = currentTarget.dataset;

    if (currentSlide === id) return;

    slides.forEach(slide => slide.classList.remove("active"));
    currentTarget.classList.add("active");
    currentSlide = id;
}

const setPhotos = () => {
    slider.innerHTML = renderItem();
    const slides = document.querySelectorAll(".slide");

    slides.forEach((slide) => {
        slide.addEventListener("click", handleClick);
    })
}

fetchPhotos();