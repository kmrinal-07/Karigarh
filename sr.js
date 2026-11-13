
document.addEventListener("DOMContentLoaded", function () {

  

    const customizeForm = document.getElementById("customize-form");

    if (customizeForm) {

        const dish = document.getElementById("dish");
        const portion = document.getElementById("portion");
        const quantity = document.getElementById("quantity");

        const dishPrices = {
            "Paneer Tikka": 299,
            "Butter Chicken": 399,
            "Dal Makhani": 249,
            "Biryani": 349
        };

        const portionPrices = {
            "Regular": 0,
            "Large": 100,
            "Family Pack": 250
        };

        function calculateTotal() {

            let basePrice = dishPrices[dish.value] || 0;

            let portionPrice =
                portionPrices[portion.value] || 0;

            let addonPrice = 0;

            document.querySelectorAll(
                'input[name="addons"]:checked'
            ).forEach(function (addon) {

                addonPrice += Number(addon.dataset.price) || 0;

            });

            let qty = Number(quantity.value);

            if (!Number.isFinite(qty) || qty < 1) {
                qty = 1;
                quantity.value = 1;
            }

            if (qty > 20) {
                qty = 20;
                quantity.value = 20;
            }

            let spice = document.querySelector(
                'input[name="spice"]:checked'
            );

            let spiceValue = spice ? spice.value : "Medium";

            let total =
                (basePrice + portionPrice + addonPrice) * qty;

            document.getElementById("summary-dish").textContent =
                dish.value || "Not selected";

            document.getElementById("base-price").textContent =
                "₹" + basePrice;

            document.getElementById("portion-price").textContent =
                "₹" + portionPrice;

            document.getElementById("addon-price").textContent =
                "₹" + addonPrice;

            document.getElementById("summary-quantity").textContent =
                qty;

            document.getElementById("summary-spice").textContent =
                spiceValue;

            document.getElementById("final-price").textContent =
                "₹" + total;
        }

        dish.addEventListener("change", calculateTotal);
        portion.addEventListener("change", calculateTotal);
        quantity.addEventListener("input", calculateTotal);

        customizeForm.querySelectorAll(
            'input[name="addons"], input[name="spice"]'
        ).forEach(function (input) {

            input.addEventListener("change", calculateTotal);

        });

        customizeForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!customizeForm.checkValidity()) {
                customizeForm.reportValidity();
                return;
            }

            calculateTotal();

            alert(
                "Thank you for choosing KARIGAR!\n\n" +
                "Dish: " + dish.value +
                "\nQuantity: " + quantity.value +
                "\nFinal Price: " +
                document.getElementById("final-price").textContent +
                "\n\nThis is a demo order. No actual order or payment has been placed."
            );

        });

        calculateTotal();
    }



    const reservationForm =
        document.getElementById("reservation-form");

    if (reservationForm) {

        const dateInput = document.getElementById("date");

        function getToday() {

            const today = new Date();

            return today.getFullYear() + "-" +
                String(today.getMonth() + 1).padStart(2, "0") +
                "-" +
                String(today.getDate()).padStart(2, "0");

        }

        dateInput.min = getToday();

        reservationForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!reservationForm.checkValidity()) {
                reservationForm.reportValidity();
                return;
            }

            const name =
                document.getElementById("name").value.trim();

            const date = dateInput.value;

            const time =
                document.getElementById("time").value;

            const guests =
                document.getElementById("guests").value;

            const occasion =
                document.getElementById("occasion").value;

            if (date < getToday()) {
                alert("Please select today or a future date.");
                return;
            }

            document.getElementById("customer-message").textContent =

                "Thank you, " + name +
                "! Your demo reservation request is for " +
                guests + " guest(s) on " +
                date + " at " + time +
                ". Occasion: " + occasion + ".";

            reservationForm.hidden = true;

            document.getElementById("success-message").hidden = false;

            document.getElementById("success-message")
                .scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

        });

        const newReservation =
            document.getElementById("new-reservation");

        if (newReservation) {

            newReservation.addEventListener("click", function () {

                reservationForm.reset();

                reservationForm.hidden = false;

                document.getElementById("success-message").hidden = true;

                dateInput.min = getToday();

                reservationForm.scrollIntoView({
                    behavior: "smooth"
                });

            });

        }
    }



    const recommendationResult =
        document.getElementById("recommendation-result");

    const recommendations = {

        Happy: {
            cuisine: "Punjabi Cuisine",
            dish: "Chole Bhature",
            description:
                "Celebrate your happiness with delicious and flavourful Punjabi food."
        },

        Sad: {
            cuisine: "North Indian Comfort Food",
            dish: "Dal Makhani with Jeera Rice",
            description:
                "Enjoy a warm and comforting meal with creamy dal and aromatic rice."
        },

        Excited: {
            cuisine: "Hyderabadi Cuisine",
            dish: "Hyderabadi Dum Biryani",
            description:
                "Try something exciting with rich spices and authentic biryani flavours."
        },

        Relaxed: {
            cuisine: "Light North Indian Cuisine",
            dish: "Paneer Tikka",
            description:
                "Enjoy grilled paneer with refreshing mint chutney."
        },

        Hungry: {
            cuisine: "Royal North Indian Cuisine",
            dish: "Butter Chicken with Butter Naan",
            description:
                "Enjoy a rich, satisfying and delicious royal Indian meal."
        }

    };


   

    window.recommendFood = function (mood) {

        if (!recommendationResult) return;

        const food = recommendations[mood];

        if (!food) return;

        recommendationResult.replaceChildren();

        const heading = document.createElement("h2");
        heading.textContent = "Your Food Recommendation";

        const moodText = document.createElement("p");
        moodText.textContent = "Your Mood: " + mood;

        const cuisineText = document.createElement("p");
        cuisineText.textContent =
            "Recommended Cuisine: " + food.cuisine;

        const dishText = document.createElement("h3");
        dishText.textContent = food.dish;

        const description = document.createElement("p");
        description.textContent = food.description;

        const link = document.createElement("a");
        link.href = "customize.html";
        link.textContent = "Customize This Meal";
        link.className = "btn";

        recommendationResult.append(
            heading,
            moodText,
            cuisineText,
            dishText,
            description,
            link
        );

        recommendationResult.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    };



    const currentPage =
        window.location.pathname.split("/").pop() || "home.html";

    document.querySelectorAll(".nav-links a").forEach(function (link) {

        if (link.getAttribute("href") === currentPage) {

            link.classList.add("active");

            link.setAttribute("aria-current", "page");

        }

    });

});
