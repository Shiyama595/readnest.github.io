const books = [
    { id: 1, title: "The 7 Habits of Highly Effective People", price: 499, image: "images/book1.jpg" },
    { id: 2, title: "Better Than The Movies", price: 699, image: "images/book2.jpg" },
    { id: 3, title: "Harry Potter and the Sorcerer's Stone", price: 599, image: "images/book3.jpg" },
    { id: 4, title: "Nothing Ever Happen's Here", price: 450, image: "images/book4.jpg" },
    { id: 5, title: "Why On Earth", price: 599, image: "images/book5.jpg" },
    { id: 6, title: "Famous Last Words", price: 399, image: "images/book6.jpg" },
    { id: 7, title: "JUNIE", price: 399, image: "images/book7.jpg" },
    { id: 8, title: "Moonlight Healers", price: 299, image: "images/book8.jpg" },
    { id: 9, title: "A Girl Like Us", price: 799, image: "images/book9.jpg" },
    { id: 10, title: "Black Woods Blue Sky", price: 399, image: "images/book10.jpg" },
    { id: 11, title: "Under The Same Stars", price: 499, image: "images/book11.jpg" },
    { id: 12, title: "Our Infinite Fates", price: 299, image: "images/book12.jpg" },
    { id: 13, title: "Something in the Walls", price: 199, image: "images/book13.jpg" },
    { id: 14, title: "Before the Coffee Gets COld", price: 599, image: "images/book14.jpg" },
    { id: 15, title: "Ruthless Vows", price: 499, image: "images/book15.jpg" },
    { id: 16, title: "The Third Gilmore Girl", price: 599, image: "images/book16.jpg" },
    { id: 17, title: "Harry Potter and the Chamber of Secrets ", price: 399, image: "images/book17.jpg" },
    { id: 18, title: "Harry Potter and the Prisoner of Azkaban", price: 399, image: "images/book18.jpg" },
    { id: 19, title: "Ikigai", price: 299, image: "images/book19.jpg" },
    { id: 20, title: "The Beasts We Bury", price: 649, image: "images/book20.jpg" },
    { id: 21, title: "Funny Story", price: 599, image: "images/book21.jpg" },
    { id: 22, title: "The Women", price: 799, image: "images/book22.jpg" },
    { id: 23, title: "You Like it Darker", price: 599, image: "images/book23.jpg" },
    { id: 24, title: "The Midnight LIbrary", price: 699, image: "images/book24.jpg" },
    { id: 25, title: "Harry Potter and the Goblet of Fire", price: 699, image: "images/book25.jpg" },
    { id: 26, title: "Harry potter and the order of pheonix", price: 649, image: "images/book26.jpg" },
    { id: 27, title: "Harry Potter and the Half Blood Prince", price: 649, image: "images/book27.jpg" },
    { id: 28, title: "Harry Potter and the Deathly Hallows", price: 699, image: "images/book28.jpg" }

];
function loadBooks() {
    const container = document.getElementById("books-container");
    if (!container) return; // Prevent errors if the container is missing

    container.innerHTML = "";
    books.forEach(book => {
        let bookElement = document.createElement("div");
        bookElement.classList.add("book");
        bookElement.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>₹${book.price}</p>
            <button onclick="addToCart('${book.title}', ${book.price})">Add to Cart</button>
        `;
        container.appendChild(bookElement);
    });
}

// Search Books
function searchBooks() {
    let query = document.getElementById("search-box").value.toLowerCase();
    const container = document.getElementById("books-container");

    if (!container) return;

    if (query.trim() === "") {
        loadBooks();
        return;
    }

    container.innerHTML = "";
    books.filter(book => book.title.toLowerCase().includes(query)).forEach(book => {
        let bookElement = document.createElement("div");
        bookElement.classList.add("book");
        bookElement.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>₹${book.price}</p>
            <button onclick="addToCart('${book.title}', ${book.price})">Add to Cart</button>
        `;
        container.appendChild(bookElement);
    });
}

// Add to Cart
function addToCart(bookName, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name: bookName, price: price });
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    alert(bookName + " added to cart!");
}

// Update Cart Count
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.innerText = cart.length;
    }
}

// Display Cart Items
function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartList = document.getElementById("cart-list");
    let totalPriceElement = document.getElementById("total-price");

    if (!cartList || !totalPriceElement) return;

    cartList.innerHTML = "";
    let totalPrice = 0;

    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${item.name} - ₹${item.price} 
            <button onclick="removeItem(${index})">Remove</button>`;
        cartList.appendChild(li);
        totalPrice += item.price;
    });

    totalPriceElement.innerText = totalPrice;
}

// Remove Item from Cart
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

// Clear Cart

function clearCart() {
    localStorage.removeItem("cart"); // Remove from storage
    document.getElementById("cart-list").innerHTML = ""; // Clear UI
    document.getElementById("total-price").innerText = "0"; // Reset total
    updateCartCount(); // Update the cart count
    alert("Cart cleared!");
}

// Load Books and Cart on Page Load
document.addEventListener("DOMContentLoaded", function () {
    loadBooks();
    updateCartCount();
    displayCart(); // ✅ This ensures cart updates when opened
});


// Load Cart Data on Page Load
document.addEventListener("DOMContentLoaded", function () {
    const chatbot = document.getElementById("chatbot");
    const toggleButton = document.getElementById("chatbot-toggle");
    const closeButton = document.getElementById("close-chatbot");
    const chatMessages = document.getElementById("chat-messages");
    const chatInput = document.getElementById("chat-input");
    const sendButton = document.getElementById("send-btn");

    // Show and Hide Chatbot
   toggleButton.addEventListener("click", () => {
        chatbot.style.display = "flex";
    });

    closeButton.addEventListener("click", () => {
        chatbot.style.display = "none";
    });

    // Send Message on Button Click
    sendButton.addEventListener("click", sendMessage);

    // Send Message on Enter Key Press
    chatInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
        const userMessage = chatInput.value.trim();
        if (userMessage === "") return;

        appendMessage("You", userMessage);
        chatInput.value = "";

        // Generate a response
        let botResponse = getBotResponse(userMessage);
        setTimeout(() => {
            appendMessage("Bot", botResponse);
        }, 500);
    }

    function appendMessage(sender, message) {
        let messageElement = document.createElement("div");
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getBotResponse(userMessage) {
        let message = userMessage.toLowerCase();

        if (message.includes("recommend")) {
            return "Looking for book recommendations? Our bestsellers are 'Ruthless Vows' and 'The Midnight Library'.";
        } else if (message.includes("price")) {
            return "Our books range from ₹199 to ₹799. Browse the store for more details!";
        } else if (message.includes("cart")) {
            return "Check your cart by clicking on 'Cart' in the menu.";
        } else if (message.includes("hello") || message.includes("hi")) {
            return "Hello! Welcome to ReadNest Bookstore. How can I help you today?";
        }    
          else if (message.includes("600")   || message.includes("700")) {
            return "Books that range from 600 to 700 are: The Beasts We Bury,The Midnight Library,Harry Potter and the Goblet of Fire,Harry potter and the order of pheonix";
       } 
        else if (message.includes("100")   || message.includes("300")) {
            return "Books that range from 100 to 300 are: Moonlight Healers,Our infinite Fates,Something in the walls";
       } 
       else if (message.includes("author")) {  
        return "Looking for books by a specific author? Let me know the name, and I'll find recommendations for you!";  
    } else if (message.includes("bestseller")) {  
        return "Our current bestsellers are: 'Fourth Wing', 'Iron Flame', and 'It Ends With Us'.";  
    } else if (message.includes("genre")) {  
        return "We have books in various genres like Fiction, Mystery, Fantasy, Romance, and Science Fiction. What genre are you interested in?";  
    } else if (message.includes("stock")) {  
        return "Most of our books are in stock! Let me know which book you're looking for, and I'll check availability.";  
    } else if (message.includes("order status")) {  
        return "To track your order, go to 'My Orders' in your account section.";  
    } else if (message.includes("delivery")) {  
        return "Standard delivery takes 3-5 business days. Express delivery is available for select locations.";  
    } else if (message.includes("discount") || message.includes("offer")) {  
        return "We currently have a 10% discount on orders above ₹500. Use code READ10 at checkout!";  
    } else if (message.includes("return policy")) {  
        return "You can return books within 7 days if they are in original condition. Check our return policy page for more details.";  
    } 

        
        else {
            return "I'm here to help! Ask about books, prices, or your cart.";
        }
    }
});
