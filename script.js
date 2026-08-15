const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

const modal = document.getElementById("modal");
const close = document.getElementById("close");

const title = document.getElementById("modalTitle");
const price = document.getElementById("modalPrice");
const text = document.getElementById("orderText");

const copy = document.getElementById("copy");
const wa = document.getElementById("wa");

// =====================================================
// WHATSAPP NUMBER
// =====================================================
// Put your WhatsApp number here WITHOUT + or spaces.
//
// Example:
// const WA_NUMBER = "201234567890";
//
// Leave empty if you want WhatsApp to open normally.
// =====================================================

const WA_NUMBER = "";

// =====================================================
// MOBILE NAVIGATION
// =====================================================

if (menu && nav) {
    menu.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");

        menu.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );
    });
}

// Close mobile menu when clicking a link
if (nav) {
    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");

            if (menu) {
                menu.setAttribute("aria-expanded", "false");
            }
        });
    });
}

// =====================================================
// ORDER MODAL
// =====================================================

const orderButtons = document.querySelectorAll(".order");

orderButtons.forEach((button) => {
    button.addEventListener("click", () => {

        const product = button.dataset.product;
        const productPrice = button.dataset.price;

        if (!modal || !title || !price || !text || !wa) {
            return;
        }

        title.textContent = product;

        price.textContent = "Price: " + productPrice;

        const orderMessage =
`Hello GameNest!

I would like to order:
${product}

Price:
${productPrice}

Please let me know the next steps.`;

        text.value = orderMessage;

        const encodedMessage =
            encodeURIComponent(orderMessage);

        if (WA_NUMBER.trim() !== "") {

            wa.href =
                "https://wa.me/" +
                WA_NUMBER +
                "?text=" +
                encodedMessage;

        } else {

            wa.href =
                "https://wa.me/?text=" +
                encodedMessage;
        }

        modal.classList.add("open");

        document.body.style.overflow = "hidden";
    });
});

// =====================================================
// CLOSE MODAL
// =====================================================

function closeModal() {

    if (!modal) {
        return;
    }

    modal.classList.remove("open");

    document.body.style.overflow = "";
}

if (close) {
    close.addEventListener("click", closeModal);
}

// Close by clicking outside modal
if (modal) {
    modal.addEventListener("click", (event) => {

        if (event.target === modal) {
            closeModal();
        }

    });
}

// =====================================================
// ESCAPE KEY
// =====================================================

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeModal();
    }

});

// =====================================================
// COPY ORDER INFORMATION
// =====================================================

if (copy) {

    copy.addEventListener("click", async () => {

        if (!text) {
            return;
        }

        try {

            await navigator.clipboard.writeText(
                text.value
            );

            copy.textContent = "Copied ✓";

            setTimeout(() => {

                copy.textContent =
                    "Copy Order Information";

            }, 1500);

        } catch (error) {

            text.select();

            text.setSelectionRange(
                0,
                text.value.length
           
