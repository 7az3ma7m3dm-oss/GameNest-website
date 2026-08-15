const WA_NUMBER = "201000000000";

const modal = document.getElementById("modal");
const sp = document.getElementById("sp");
const spr = document.getElementById("spr");
const wa = document.getElementById("wa");

function openOrder(product, price) {
    sp.textContent = product;
    spr.textContent = price;

    const msg =
        `Hello GameNest!%0A%0A` +
        `I would like to order:%0A` +
        `Product: ${encodeURIComponent(product)}%0A` +
        `Price: ${encodeURIComponent(price)}%0A%0A` +
        `Please confirm the order details.`;

    wa.href = `https://wa.me/${WA_NUMBER}?text=${msg}`;

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeOrder() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
}

document.querySelectorAll(".products button").forEach(button => {
    button.onclick = () => {
        openOrder(
            button.dataset.p,
            button.dataset.price
        );
    };
});

document.getElementById("close").onclick = closeOrder;

document.querySelector(".back").onclick = closeOrder;

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeOrder();
    }
});

document.getElementById("copy").onclick = async () => {
    const text =
        `GameNest Order Request\n` +
        `Product: ${sp.textContent}\n` +
        `Price: ${spr.textContent}`;

    try {
        await navigator.clipboard.writeText(text);

        document.getElementById("copy").textContent = "Copied ✓";

        setTimeout(() => {
            document.getElementById("copy").textContent =
                "Copy order text ↗";
        }, 1400);

    } catch {
        alert(text);
    }
};

document.getElementById("menu").onclick = () => {
    document.body.classList.toggle("mobile-open");
};

document.querySelectorAll("#mobile a").forEach(link => {
    link.onclick = () => {
        document.body.classList.remove("mobile-open");
    };
});
