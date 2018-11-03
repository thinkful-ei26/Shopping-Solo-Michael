'use strict';
const store ={
        items: [{name:"lime",checked:false, edit: false},
        {name:"banana",checked:false, edit: false},
        {name:"apples",checked:false, edit: false},
        {name:"soup",checked:false, edit: false}],

        hideChecked : false,
        searchTerm : null,
};

const tempStore ={
        items: [],
        hideChecked : false,
        searchTerm : null,
};

function renderShoppingList(current){
    //for each item in STORE generate a string template for <li>
    //item name rendered as inner text
    const storeString = iterateListItemGenerator(current.items);
    console.log(storeString);
    $('.js-shopping-list').html(storeString);
    console.log('`renderShopping` ran');
}

function listItemGenerator(item, itemIndex){
    return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
        <span class="shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
            <div class="shopping-item-controls">
                <button class="shopping-item-toggle">
                    <span class="button-label">check</span>
                </button> 
                <button class="shopping-item-delete">
                    <span class="button-label">delete</span>
                </button>
                </button> <button class="shopping-item-edit">
                <span class="button-label">edit</span>
                </button>
                <input type="text" name="shopping-list-entry-edit" class="shopping-list-entry-edit" placeholder="...">
                </div>
        </li>`;    
    }

function iterateListItemGenerator(items) {
    if(store.hideChecked){
        return items.filter(check => !check.checked).map((item, index)=> listItemGenerator(item,index)).join('');
    }else{ 
        return items.map((item, index)=> listItemGenerator(item,index)).join('');              
    }
}

function uncheckItemsListed() {
    $('.js-check').click(() => {
        store.hideChecked = !store.hideChecked;
        renderShoppingList(store);
    });
}
   
function handleNewItemSubmit(){
    $('#js-shopping-list-form').submit(event => {
    event.preventDefault();
    const newItemName = $(".js-shopping-list-entry").val();
    addToList(newItemName);
    renderShoppingList(store);
    $('.js-shopping-list-entry').val('');
    });
}

function addToList(inputName) {
    store.items.push({name:`${inputName}`, checked: false});
}

function searchFor() {
    $('#js-shopping-list-form-search').submit(event => {
        event.preventDefault();
        console.log(store.items);
        if($(".js-shopping-list-entry-search").val() === ''){
            renderShoppingList(store);
        }else{
            tempStore.items = store.items.filter(item => item.name.indexOf($(".js-shopping-list-entry-search").val()) > -1);
            renderShoppingList(tempStore);
        }
    });
}

function handleItemCheckClicked() {
    //User clicks check button
    $('.js-shopping-list').on('click', `.shopping-item-toggle`, event => {
        const targetIndex = getItemIndexFromElement(event.currentTarget);
        store.items[targetIndex].checked = store.items[targetIndex].checked ? false : true;
        renderShoppingList(store);
      });
      
}

function handleDeleteItemClicked() {
    //User clicks delete item
    
    $('.js-shopping-list').on('click', '.shopping-item-delete' , function (event) {
        const targetIndex = getItemIndexFromElement(event.currentTarget);
        console.log(targetIndex);
        store.items.splice(targetIndex,1);
        console.log(store.items);
        renderShoppingList(store);
    } );
    console.log('`handleDeleteItemClicked` ran');
}

function editItems() {
    $('.js-shopping-list').on('click','.shopping-item-edit' ,function (event) {
        const targetIndex = getItemIndexFromElement(event.currentTarget);
        store.items[targetIndex].name = $('.shopping-list-entry-edit').val();
        renderShoppingList(store);
    })
}

function getItemIndexFromElement(item) {
    const itemIndexString = $(item)
      .closest('.js-item-index-element')
      .attr('data-item-index');
    return parseInt(itemIndexString, 10);
  }
//controller function run all other functions
function handleShoppingList(){
handleDeleteItemClicked();
handleItemCheckClicked();
handleNewItemSubmit();
uncheckItemsListed();
searchFor();
editItems();
renderShoppingList(store);
}

$(handleShoppingList);


