class Product {
  title = "DEFAULT";
  imageUrl;
  price;
  description;

  constructor(title, image, price, desc) {
    this.title = title;
    this.imageUrl = image;
    this.price = price;
    this.description = desc;
  }
};

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    if (shouldRender) {
      this.render();
    }
  }
  
  render() {}

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ShoppingCart extends Component {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`;
  }

  get totalAmount() {
    const sum = this.items.reduce((preValue, curTime) => 
      preValue + curItem.price,
      0);
    return sum;
  }

  constructor(renderHookId) {
    super(renderHookId, false);
    this.orderProducts = () => {
      console.log("Ordering...");
      console.log(this.items);
    }
    this.render();
  };


  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  render() {
    const cartEl = this.createRootElement("section", "cart");
    cartEl.innerHTML = `
    <h2>Total: \$${0}</h2>
    <button>Order Now</button>
    `;
    const orderButton = cartEl.querySelector("button");
    // orderButton.addEventListener("click", () => this.orderProducts()); or
    orderButton.addEventListener("click", () => this.orderProducts);
    this.totalOutput = cartEl.querySelector('h2');
  }
}

class ProductItem extends Component
{
  constructor(product, renderHookId) {
    super(renderHookId, false);
    this.product = product;
    this.render();
  }

  addToCart() { 
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement("li", "product-item");

    prodEl.innerHTML = `
      <div>
        <img src= "${this.product.imageUrl}" alt="${this.product.title}">
        <div className="product-item__content">
          <h2>${this.product.title}</h2>
          <h3>\$${this.product.price}</h3>
          <p>${this.product.description}</p>
          <button>Add to Cart</button>
        </div>
      </div>
      `;
    const addCartButton = prodEl.querySelector("button");
    addCartButton.addEventListener("click", this.addToCart.bind(this))
  }
}

class ProductList extends Component{
  #products = [];
  
  constructor(renderHookId) {
    super(renderHookId, false);
    this.render();
    this.fectchProducts();
  }
  fectchProducts(){
    this.#products = [
      new Product(
        "A Pillow",
        "https://b3h2.scene7.com/is/image/BedBathandBeyond/15364655025932m?$690$&wid=690&hei=690",
        "19.99",
        "A good ass pillow"),
        new Product(
          "The Keyblade",
          "https://cdna.artstation.com/p/assets/images/images/007/616/394/large/carlos-chuaunsu-d1d18da4-b80d-4328-a0f1-6957f0768e5f.jpg?1507357245",
          "Priceless",
          "Only the chosen few can wield it"
          )
    ];
    this.renderProducts();
  }
  
  renderProducts() {
    for (const prod of this.#products) {
      new ProductItem(prod, "prod-list");
      }
  }

  render() {
    this.createRootElement("ul", "product-list", [new ElementAttribute("id", 'prod-list')
    ]);
    if (this.#products && this.#products.length > 0) {
      this.renderProducts();
    }
  }
}

class Shop {
  constructor() {
    this.render();
  }

  render() {
    this.cart = new ShoppingCart("app");
    new ProductList("app");
    
  }
}

class App {
  static init() {
    const shop = new Shop();
    this.cart = shop.cart
  }
  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();