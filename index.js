/* <div class="productcard">
<img class="productthumbnail"
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvDadB3StZpcQoDRDxZ9YiVriVzFDCk_zK_A&s" />
<div class="productbottomsheet">


</div>
</div> */

let products = [];
const cart = {};

const updateCart = () => {
    let totalPrice = 0;
    document.querySelector('#cartsummary_item').replaceChildren([]);

    for (const key of Object.keys(cart)){
        const item = products.find((product) => {
            return `${product.id}` === key;
        });

        const quantity = cart[key];
        //cart.key
        const price = item.price;

        const itemRow = document.createElement('tr');
        const itemName = document.createElement('th');
        itemName.innerText = item.title;

        const itemQuantity = document.createElement('td');
        itemQuantity.innerText = quantity;

        const itemPrice = document.createElement('td');
        itemPrice.innerText = quantity * price;

        const deleteItem = document.createElement('td');
        const deletebtn = document.createElement('button');
        deletebtn.innerText = '-'
        deletebtn.className = 'removefromcart';
        deletebtn.addEventListener('click', () => {
            if (cart[key] > 1) {
                cart[key] -= 1;
            } else {
                delete cart[key];
            }
            updateCart();
        });

        deleteItem.append(deletebtn);

        const addItem = document.createElement('td');
        const addbtn = document.createElement('button');
        addbtn.innerText = '+'
        addbtn.className = 'addcart';
        addbtn.addEventListener('click', () => {
            cart[key] += 1;
            updateCart();
        });

        addItem.append(addbtn);

        itemRow.append(itemName,itemPrice,itemQuantity,deleteItem,addItem);
        document.querySelector('#cartsummary_item').append(itemRow);


        totalPrice = totalPrice + price * quantity;

    }

    document.querySelector('#cartsummary_total').innerText = totalPrice;
}

const CreateCard = (product) => {
    const productcard = document.createElement('div');
    productcard.className = 'productcard';

    const productthumbnail = document.createElement('img');
    productthumbnail.className = 'productthumbnail';
    productthumbnail.src = product.thumbnail;

    const productbottomsheet = document.createElement('div');
    productbottomsheet.className = 'productbottomsheet';

    const productinfocontainer = document.createElement('div');
    productinfocontainer.className = 'productinfocontainer';

    const productname = document.createElement('strong');
    productname.className = 'productname';
    productname.innerText = product.title;

    const productprice = document.createElement('strong');
    productprice.className = 'productprice';
    productprice.innerText = 'price $ ' + product.price;

    const addtoclass = document.createElement('button');
    addtoclass.className = 'addtoclass';
    addtoclass.innerText = '+';

    addtoclass.addEventListener('click', () => {
        if (cart[product.id] === undefined) cart[product.id] = 0;

        cart[product.id] = cart[product.id] + 1;

        updateCart();
    })

    productinfocontainer.append(productname, productprice);

    productbottomsheet.append(productinfocontainer, addtoclass);

    productcard.append(productthumbnail, productbottomsheet);

    document.querySelector('#productlist').appendChild(productcard);

};

const hookViewCart = () => {
    const viewCartButton = document.querySelector('#viewCart');
    viewCartButton.addEventListener('click', () => {
        const Cartsummary = document.querySelector('#cartsummary');
        const display = Cartsummary.style.display;

        if (display === 'none'){
            Cartsummary.style.display = 'block';
        } else {
            Cartsummary.style.display = 'none';
        }

    });
};

const fetchProduct = () => {
    fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then((productResponse) => {
            products = productResponse.products;

            products.forEach(product => {
                CreateCard(product);
            })
            console.log(products);
        });
}


fetchProduct();
hookViewCart();