"use strict";

/* =========================================================
   GAMENEST.SHOP
   COMPLETE WEBSITE JAVASCRIPT
   ========================================================= */


/* =========================================================
   SETTINGS
   ========================================================= */

// Put your WhatsApp number here.
//
// IMPORTANT:
// Country code included.
// NO +
// NO spaces
// NO brackets
//
// Example:
// Egypt: 201234567890
//
// If left empty, WhatsApp will open with the message
// and allow the customer to choose a contact.
const WHATSAPP_NUMBER = "";


/* =========================================================
   WEBSITE READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTS
       ===================================================== */

    const menu =
        document.getElementById("menu");

    const nav =
        document.getElementById("nav");

    const modal =
        document.getElementById("modal");

    const closeButton =
        document.getElementById("close");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalPrice =
        document.getElementById("modalPrice");

    const orderText =
        document.getElementById("orderText");

    const copyButton =
        document.getElementById("copy");

    const whatsappButton =
        document.getElementById("wa");


    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    if (menu && nav) {

        menu.addEventListener("click", () => {

            nav.classList.toggle("open");

            const open =
                nav.classList.contains("open");

            menu.setAttribute(
                "aria-expanded",
                open ? "true" : "false"
            );

        });


        // Close menu when a navigation link is clicked

        nav.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                nav.classList.remove("open");

                menu.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =====================================================
       SMOOTH SCROLLING
       ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener("click", (event) => {

                const targetID =
                    link.getAttribute("href");

                if (
                    !targetID ||
                    targetID === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetID);

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


    /* =====================================================
       ORDER BUTTONS
       ===================================================== */

    const orderButtons =
        document.querySelectorAll(".order");


    orderButtons.forEach((button) => {

        button.addEventListener("click", (event) => {

            event.preventDefault();


            /* ---------------------------------------------
               GET PRODUCT
               --------------------------------------------- */

            const product =
                button.getAttribute("data-product") ||
                button.dataset.product ||
                "GameNest Product";


            /* ---------------------------------------------
               GET PRICE
               --------------------------------------------- */

            const productPrice =
                button.getAttribute("data-price") ||
                button.dataset.price ||
                "Contact GameNest";


            /* ---------------------------------------------
               CHECK MODAL
               --------------------------------------------- */

            if (!modal) {

                console.error(
                    "GameNest: #modal was not found."
                );

                return;
            }


            /* ---------------------------------------------
               UPDATE MODAL
               --------------------------------------------- */

            if (modalTitle) {

                modalTitle.textContent =
                    product;

            }


            if (modalPrice) {

                modalPrice.textContent =
                    "Price: " +
                    productPrice;

            }


            /* ---------------------------------------------
               CREATE ORDER MESSAGE
               --------------------------------------------- */

            const message =
`Hello GameNest! 👋

I would like to order:

Product: ${product}
Price: ${productPrice}

Please let me know the next steps.`;


            /* ---------------------------------------------
               PUT MESSAGE IN TEXTAREA
               --------------------------------------------- */

            if (orderText) {

                orderText.value =
                    message;

            }


            /* ---------------------------------------------
               CREATE WHATSAPP LINK
               --------------------------------------------- */

            if (whatsappButton) {

                const encodedMessage =
                    encodeURIComponent(message);

                let whatsappURL;


                if (
                    WHATSAPP_NUMBER &&
                    WHATSAPP_NUMBER.trim() !== ""
                ) {

                    whatsappURL =
                        "https://wa.me/" +
                        WHATSAPP_NUMBER.trim() +
                        "?text=" +
                        encodedMessage;

                } else {

                    whatsappURL =
                        "https://wa.me/?text=" +
                        encodedMessage;

                }


                whatsappButton.href =
                    whatsappURL;

            }


            /* ---------------------------------------------
               OPEN MODAL
               --------------------------------------------- */

            modal.classList.add("open");

            document.body.style.overflow =
                "hidden";


            /* ---------------------------------------------
               FOCUS COPY BUTTON
               --------------------------------------------- */

            setTimeout(() => {

                if (copyButton) {

                    copyButton.focus();

                }

            }, 150);

        });

    });


    /* =====================================================
       CLOSE MODAL
       ===================================================== */

    function closeModal() {

        if (!modal) {
            return;
        }

        modal.classList.remove("open");

        document.body.style.overflow =
            "";

    }


    /* =====================================================
       CLOSE BUTTON
       ===================================================== */

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeModal
        );

    }


    /* =====================================================
       CLICK OUTSIDE MODAL
       ===================================================== */

    if (modal) {

        modal.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === modal
                ) {

                    closeModal();

                }

            }
        );

    }


    /* =====================================================
       ESCAPE KEY
       ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" ||
                event.key === "Esc"
            ) {

                closeModal();

            }

        }
    );


    /* =====================================================
       COPY ORDER INFORMATION
       ===================================================== */

    if (copyButton) {

        copyButton.addEventListener(
            "click",
            async () => {

                if (!orderText) {

                    console.error(
                        "GameNest: #orderText was not found."
                    );

                    return;

                }


                const message =
                    orderText.value;


                if (!message) {
                    return;
                }


                /* -----------------------------------------
                   MODERN CLIPBOARD
                   ----------------------------------------- */

                try {

                    await navigator.clipboard.writeText(
                        message
                    );

                    copySuccess();

                    return;

                } catch (error) {

                    console.warn(
                        "Clipboard API failed. Using fallback."
                    );

                }


                /* -----------------------------------------
                   FALLBACK COPY
                   ----------------------------------------- */

                try {

                    orderText.focus();

                    orderText.select();

                    orderText.setSelectionRange(
                        0,
                        orderText.value.length
                    );


                    const copied =
                        document.execCommand("copy");


                    if (copied) {

                        copySuccess();

                    } else {

                        copyFailed();

                    }

                } catch (error) {

                    copyFailed();

                }

            }
        );

    }


    /* =====================================================
       COPY SUCCESS
       ===================================================== */

    function copySuccess() {

        if (!copyButton) {
            return;
        }


        const originalText =
            copyButton.dataset.originalText ||
            "Copy Order Information";


        copyButton.dataset.originalText =
            originalText;


        copyButton.textContent =
            "Copied ✓";


        copyButton.disabled =
            true;


        setTimeout(() => {

            copyButton.textContent =
                originalText;

            copyButton.disabled =
                false;

        }, 1600);

    }


    /* =====================================================
       COPY FAILED
       ===================================================== */

    function copyFailed() {

        if (!copyButton) {
            return;
        }


        const originalText =
            copyButton.dataset.originalText ||
            "Copy Order Information";


        copyButton.textContent =
            "Copy Failed";


        setTimeout(() => {

            copyButton.textContent =
                originalText;

        }, 1600);

    }


    /* =====================================================
       WHATSAPP BUTTON
       ===================================================== */

    if (whatsappButton) {

        whatsappButton.addEventListener(
            "click",
            () => {

                // The href is generated when an
                // Order Now button is clicked.

                if (
                    !whatsappButton.href ||
                    whatsappButton.href ===
                    window.location.href
                ) {

                    const fallbackMessage =
`Hello GameNest! 👋

I would like to place an order.

Please let me know the available products and prices.`;

                    const encoded =
                        encodeURIComponent(
                            fallbackMessage
                        );


                    if (
                        WHATSAPP_NUMBER &&
                        WHATSAPP_NUMBER.trim() !== ""
                    ) {

                        whatsappButton.href =
                            "https://wa.me/" +
                            WHATSAPP_NUMBER.trim() +
                            "?text=" +
                            encoded;

                    } else {

                        whatsappButton.href =
                            "https://wa.me/?text=" +
                            encoded;

                    }

                }

            }
        );

    }


    /* =====================================================
       FAQ ACCORDION
       ===================================================== */

    const faqItems =
        document.querySelectorAll(
            ".faq details"
        );


    faqItems.forEach((item) => {

        item.addEventListener(
            "toggle",
            () => {

                if (!item.open) {
                    return;
                }


                faqItems.forEach(
                    (otherItem) => {

                        if (
                            otherItem !== item
                        ) {

                            otherItem.removeAttribute(
                                "open"
                            );

                        }

                    }
                );

            }
        );

    });


    /* =====================================================
       RESIZE HANDLER
       ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 680
            ) {

                if (nav) {

                    nav.classList.remove(
                        "open"
                    );

                }


                if (menu) {

                    menu.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }
    );


    /* =====================================================
       CUSTOM GAMENEST CURSOR
       DESKTOP ONLY
       ===================================================== */

    if (
        window.matchMedia(
            "(pointer: fine)"
        ).matches &&
        window.innerWidth >= 901
    ) {


        /* -----------------------------------------------
           CREATE CURSOR
           ----------------------------------------------- */

        const cursorDot =
            document.createElement("div");

        const cursorRing =
            document.createElement("div");


        cursorDot.id =
            "gnCursorDot";

        cursorRing.id =
            "gnCursorRing";


        document.body.appendChild(
            cursorDot
        );

        document.body.appendChild(
            cursorRing
        );


        /* -----------------------------------------------
           CURSOR POSITION
           ----------------------------------------------- */

        let mouseX =
            window.innerWidth / 2;

        let mouseY =
            window.innerHeight / 2;


        let ringX =
            mouseX;

        let ringY =
            mouseY;


        document.addEventListener(
            "mousemove",
            (event) => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;


                cursorDot.style.left =
                    mouseX + "px";

                cursorDot.style.top =
                    mouseY + "px";

            }
        );


        /* -----------------------------------------------
           SMOOTH RING
           ----------------------------------------------- */

        function animateCursor() {

            ringX +=
                (mouseX - ringX) *
                0.16;


            ringY +=
                (mouseY - ringY) *
                0.16;


            cursorRing.style.left =
                ringX + "px";


            cursorRing.style.top =
                ringY + "px";


            requestAnimationFrame(
                animateCursor
            );

        }


        animateCursor();


        /* -----------------------------------------------
           CURSOR HOVER TARGETS
           ----------------------------------------------- */

        const cursorTargets =
            document.querySelectorAll(
                "a, button, " +
                ".order, " +
                ".card, " +
                ".feature, " +
                ".crew-cards article, " +
                ".payments div, " +
                ".steps article, " +
                "summary, " +
                "textarea, " +
                "input"
            );


        cursorTargets.forEach(
            (element) => {


                element.addEventListener(
                    "mouseenter",
                    () => {

                        document.body.classList.add(
                            "gn-cursor-hover"
                        );

                    }
                );


                element.addEventListener(
                    "mouseleave",
                    () => {

                        document.body.classList.remove(
                            "gn-cursor-hover"
                        );

                    }
                );


            }
        );


        /* -----------------------------------------------
           CURSOR CLICK ANIMATION
           ----------------------------------------------- */

        document.addEventListener(
            "mousedown",
            () => {

                document.body.classList.add(
                    "gn-cursor-click"
                );

            }
        );


        document.addEventListener(
            "mouseup",
            () => {

                document.body.classList.remove(
                    "gn-cursor-click"
                );

            }
        );

    }


    /* =====================================================
       SCROLL REVEAL ANIMATION
       ===================================================== */

    if (
        "IntersectionObserver" in window
    ) {


        const revealElements =
            document.querySelectorAll(
                ".feature, " +
                ".card, " +
                ".crew-cards article, " +
                ".payments div, " +
                ".steps article"
            );


        revealElements.forEach(
            (element) => {

                element.style.opacity =
                    "0";


                element.style.transform =
                    "translateY(18px)";


                element.style.transition =
                    "opacity .6s ease, " +
                    "transform .6s " +
                    "cubic-bezier(.2,.8,.2,1)";

            }
        );


        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            entry.target.style.opacity =
                                "1";


      
