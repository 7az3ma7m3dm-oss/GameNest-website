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
// Example:
// const WA_NUMBER = "201234567890";
//
// Leave it empty if you want WhatsApp to open without
// a specific number.
//
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

// Close mobile menu when clicking a navigation link
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

        // Update modal information
        title.textContent = product;

        price.textContent = "Price: " + productPrice;

        // Create order message
        const orderMessage =
`Hello GameNest!

I would like to order:
${product}

Price:
${productPrice}

Please let me know the next steps.`;

        text.value = orderMessage;

        // Create WhatsApp link
        const encodedMessage = encodeURIComponent(orderMessage);

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

        // Open modal
        modal.classList.add("open");

        // Prevent background scrolling
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

    // Restore page scrolling
    document.body.style.overflow = "";
}

if (close) {
    close.addEventListener("click", closeModal);
}

// Close when clicking outside the modal
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

            await navigator.clipboard.writeText(text.value);

            copy.textContent = "Copied ✓";

            setTimeout(() => {
                copy.textContent = "Copy Order Information";
            }, 1500);

        } catch (error) {

            // Fallback for browsers where clipboard API
            // isn't available.

            text.select();
            text.setSelectionRange(
                0,
                text.value.length
            );

            try {
                document.execCommand("copy");

                copy.textContent = "Copied ✓";

                setTimeout(() => {
                    copy.textContent =
                        "Copy Order Information";
                }, 1500);

            } catch (copyError) {
                copy.textContent = "Copy failed";

                setTimeout(() => {
                    copy.textContent =
                        "Copy Order Information";
                }, 1500);
            }
        }
    });
}

// =====================================================
// SMOOTH SCROLLING
// =====================================================

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});

// =====================================================
// FAQ
// =====================================================

// Only allow one FAQ item to stay open at a time.
const faqItems = document.querySelectorAll(".faq details");

faqItems.forEach((item) => {

    item.addEventListener("toggle", () => {

        if (!item.open) {
            return;
        }

        faqItems.forEach((otherItem) => {

            if (otherItem !== item) {
                otherItem.removeAttribute("open");
            }

        });
    });
});

// =====================================================
// CLOSE MOBILE MENU WHEN RESIZING TO DESKTOP
// =====================================================

window.addEventListener("resize", () => {

    if (window.innerWidth > 680) {

        if (nav) {
            nav.classList.remove("open");
        }

        if (menu) {
            menu.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    }
});
