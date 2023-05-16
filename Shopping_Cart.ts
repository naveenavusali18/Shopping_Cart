import * as promptSync from "prompt-sync";
const prompt = promptSync();

type Shopping = {
  itemName: string;
  quantity: number;
  price: number;
};

enum Action{
  DisplayList,
  AddItem,
  UpdateQty,
  EmptyCart,
  SearchItem,
  TotalPrice,
  RemoveItem,
  Exit,
};

let Cart: Shopping[] = [
  { itemName: "Tomato", quantity: 10, price: 10 },
  { itemName: "Mango", quantity: 10, price: 10 },
  { itemName: "Apple", quantity: 1, price: 10 },
  { itemName: "Potato", quantity: 1, price: 10 },
  { itemName: "carrot", quantity: 1, price: 10 },
];

const getTotalPrice = (Cart: Shopping[]) => {
  let totalPrice = 0;
  Cart.forEach((Item) => {
    totalPrice += Item.price * Item.quantity;
  });
  console.log("The total price is:" + totalPrice);
}

const getItemsList = (Cart: Shopping[]) => {
  Cart.forEach((Item) => {
    console.log(Item.itemName);
  });
}

const updateQty = (Cart: Shopping[], name: string, newQty: number) => {
  let status = 0;
  Cart.forEach((Item) => {
    if (Item.itemName === name) {
      Item.quantity = newQty;
      console.log("\nQuantity updated!");
      status = 1;
    }
  });
  if (status === 0) {
    console.log("\nInvalid item or item not present");
  } else {
    console.log(Cart);
  }
}

const searchItem = (Cart: Shopping[], name: string) => {
  let status = 0;
  Cart.forEach((Item) => {
    if (Item.itemName === name) {
      console.log("\nYay! Item found");
      status = 1;
    }
  });
  if (status === 0) {
    console.log("\nItem not found");
  }
}

const emptyCart = (Cart: Shopping[]) => {
  Cart.length = 0;
  console.log("Cart is empty now!");
}

const addItemToCart = (Cart: Shopping[]) => {
  let itemName2 = prompt("Enter Item name:");
  let status = 0;
  for (let i = 0; i < Cart.length; i++) {
    if (Cart[i].itemName === itemName2) {
      console.log("Item already excits in Cart!");
      status = 1;
      break;
    }
  }
  if (status === 0) {
    let Qty2 = parseInt(prompt("Enter quantity:"));
    let Price2 = parseInt(prompt("Enter price of item:"));

    Cart.push({
      itemName: itemName2,
      quantity: Qty2,
      price: Price2,
    });
    console.log("\nHola! Item added");
  }
}

const removeItem = (Cart: Shopping[]) => {
  let removeItem = prompt("Enter item to be removed:");
  let status = 0;
  let newCart = Cart.filter((Item) => {
    if (Item.itemName === removeItem) {
      status = 1;
      return false;
    } else {
      return true;
    }
  });
  if (status === 1) {
    Cart.length = 0;
    newCart.forEach((Element) => {
      Cart.push(Element);
    });
    console.log(Cart);
    console.log("\nItem removed!");
  } else {
    console.log("\nItem not present in Cart!");
  }
}




let status = true;
while (status) {
  console.log(
    "\nEnter:- 0:To get list of items , 1:To add item , 2:To update qty , 3:To empty cart , 4:To search item , 5:To get Total price , 6:To remove an Item , 7:To exit"
  );
  let action = parseInt(prompt());

  if (action === Action.DisplayList) {
    getItemsList(Cart);
  } else if (action === Action.AddItem) {
    addItemToCart(Cart);
  } else if (action === Action.UpdateQty) {
    console.log("Enter the name of item to change qty:");
    let name = prompt();
    let newQty = parseInt(prompt("Enter the qty:"));
    updateQty(Cart, name, newQty);
  } else if (action === Action.EmptyCart) {
    emptyCart(Cart);
  } else if (action === Action.SearchItem) {
    let itemSearch = prompt("Enter item to search:");
    searchItem(Cart, itemSearch);
  } else if (action === Action.TotalPrice) {
    getTotalPrice(Cart);
  } else if (action === Action.RemoveItem) {
    removeItem(Cart);
  } else if (action === Action.Exit) {
    status = false;
  } else {
    console.log("Enter a valid action");
  }
}