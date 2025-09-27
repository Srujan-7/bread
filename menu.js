function createComponent(data,sectn,catg,ind){
    let component = data[sectn][catg][ind];
    let compdiv = document.createElement("div");
    compdiv.classList.add("component");
    let imgdiv = document.createElement('div');
    imgdiv.classList.add("imagea");
    let image = document.createElement('img');
    image.src = component.image;
    image.alt = "image";
    imgdiv.appendChild(image);
    compdiv.appendChild(imgdiv);
    let pname = document.createElement('p');
    pname.classList.add("name");
    pname.innerHTML = component.name;
    compdiv.appendChild(pname);
    let pcap = document.createElement('p');
    pcap.classList.add("cap");
    pcap.innerHTML = component.cap;
    compdiv.appendChild(pcap);
    let bpdiv = document.createElement("div");
    bpdiv.classList.add("bp");
    let pricediv = document.createElement("div");
    pricediv.classList.add("price");
    let pprice = document.createElement('p');
    pprice.innerHTML = component.price;
    pricediv.appendChild(pprice);
    let tag = document.createElement('i');
    tag.classList.add("fa-solid");
    tag.classList.add("fa-tag");
    pricediv.appendChild(tag);
    bpdiv.appendChild(pricediv);
    let order = document.createElement('button');
    order.classList.add("order");
    order.innerHTML = "order";
    order.onclick = ()=>{opn(data,sectn,catg,ind)};
    bpdiv.appendChild(order);
    compdiv.appendChild(bpdiv);
    let bg = document.createElement('div');
    bg.classList.add("bg");
    compdiv.appendChild(bg);
    // compsdiv.appendChild(compdiv);
    return compdiv;
}

function opn(data,section,catg,comp){
    let component = data[section][catg][comp];
    let page = window.localStorage.getItem('page');
    if(page == "cart"){
        let compos = document.querySelector('.categ');
        compos.style.display = "none";
        let footer = document.querySelector('footer');
        footer.style.display = "none";
        let lnk = document.querySelector('.heding a');
        lnk.href = 'cart.html';
    }
    else{
        let secns = document.querySelectorAll(".mainbar section");
        for(let secn of secns){
            secn.style.display="none";
        }
    }
    let searchdiv = document.querySelector('.searchdiv');
    searchdiv.style.display = "none";
    let orderpage = document.querySelector(".orderpage");
    orderpage.style.display = "inline-block";
    let way = document.querySelector(".heding .heading");
    way.innerHTML = section + " > " + catg;
    let orderbox = document.querySelector(".orderbox");
    orderbox.style.display = "flex";
    let heading = document.querySelector(".orderbox .heading");
    heading.innerHTML = component.name+' - $'+component.price;
    let cap = document.querySelector(".orderbox .cap");
    cap.innerHTML = component.cap;
    let image = document.querySelector(".orderbox .image img");
    image.src = component.image;

    // add to cart
    let arr = [section,catg,comp];
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let flag = true;
    if(cartItems.length!=0){
        console.log("cart items");
        if((cartItems.some(item => JSON.stringify(item) === JSON.stringify(arr)))){
            flag = false;
            console.log("exists");
        }
    }
    let addtocart = document.querySelector(".cart");
    if(flag){
        addtocart.onclick = ()=>{addToCart(arr)};
    }
    else{
        addtocart.style.display = "none";
    }
    let buy = document.querySelector(".buy");
    buy.onclick = ()=>{
        let b = document.querySelector(".bought");
        b.style.display = "block";
        setTimeout(()=>{
            b.style.display = "none";
        },3000);
    };
}

function addToCart(item){
    let addtocart = document.querySelector(".cart");
    addtocart.style.display = "none";
    const popup = document.querySelector('.pop');
    popup.style.display = 'none';
    popup.style.display = 'block';
    setTimeout(() => {
        popup.style.display = 'none';
    }, 1000);
    console.log("adding to cart");
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(item);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    window.location.href = 'cart.html';
}

function displayData(data){
    let main = document.querySelector(".mainbar");
    for(let sectn in data){
        let secn = document.createElement("section");
        // let flag = true;
        // let ind = 0;
        for(let catg in data[sectn]){
            let catdiv = document.createElement("div");
            catdiv.classList.add("categ");

            let pele = document.createElement("p");
            pele.classList.add("heading");
            pele.innerHTML = catg;
            catdiv.appendChild(pele);
            let compsdiv = document.createElement("div");
            compsdiv.classList.add("components");
            for(let ind in data[sectn][catg]){
                let compdiv = createComponent(data,sectn,catg,ind);
                compsdiv.appendChild(compdiv);
            }
            catdiv.appendChild(compsdiv);
            secn.appendChild(catdiv);
        }
        main.append(secn);
    }
}

function mover(ind){
    let lnks = document.querySelectorAll(".sidebar a");
    for(let lnk of lnks){
        lnk.classList.remove("highlite");
    }
    lnks[ind].classList.add("highlite");
    let secns = document.querySelectorAll(".mainbar section");
    for(let secn of secns){
        secn.style.display="none";
    }
    secns[ind].style.display="unset";
}

document.addEventListener('DOMContentLoaded',() => {
    fetch('./components.json')
    .then(response => response.json())
    .then(data => {
        let page = window.localStorage.getItem('page');
        let main, dis;
        if(page == "cart"){
            displayCartItems(data);
            main = document.querySelector('.categ');
            dis = "block";
        }
        else{
            displayData(data);
            mover(0);
            main = document.querySelector('.mainbar');
            dis = "flex";
        }
        let ordr = document.querySelector('.orderpage');
        let empty ;
        if(page=="cart") empty= document.querySelector('.empty');
        let search = document.querySelector('.search input');
        let searchdiv = document.querySelector(".searchdiv");
        search.addEventListener('input',()=>{
            // console.log("in search");
            let txt = search.value;
            if(txt !=''){
                searchdiv.innerHTML = '';
                searchdiv.style.display = "grid";
                main.style.display = "none";
                if(page=="cart") 
                empty.style.display = "none";
                ordr.style.display = "none";
                for(let sect in data){
                    for(let catg in data[sect]){
                        for(let ind in data[sect][catg]){
                            let name = data[sect][catg][ind].name;
                            // console.log(name);
                            const regex = new RegExp(`${txt}`, 'i');
                            if(regex.test(name)){
                                searchdiv.appendChild(createComponent(data,sect,catg,ind));
                            }
                        }
                    }
                }
            }
            else{
                searchdiv.style.display = "none";
                main.style.display = dis;
            }
        });
    })
    .catch(error => console.log("error is: ",error))
});

function displayCartItems(data){
    let comps = document.querySelector(".components");
    let empty = document.querySelector(".empty");
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if(cartItems.length!=0){
        for(let item of cartItems){
            let comp = document.createElement('div');
            comp.style.position = "relative";
            let div = createComponent(data,item[0],item[1],item[2]);
            let cross = document.createElement('i');
            cross.classList.add('fa-solid');
            cross.classList.add('fa-circle-xmark');
            cross.classList.add('cross');
            cross.onclick = ()=>{removeFromCart(item)};
            comp.appendChild(cross);
            comp.appendChild(div);
            comps.appendChild(comp);
        }
    }
    else{
        let itag = document.createElement('i');
        itag.classList.add("fa-solid");
        itag.classList.add("fa-cart-shopping");
        let ptag = document.createElement('p');
        ptag.innerHTML = "Your Cart is Empty";
        empty.appendChild(itag);
        empty.appendChild(ptag);
    }
}

function removeFromCart(item){
    console.log("removing from cart",item);
    let cartItems = JSON.parse(window.localStorage.getItem('cartItems')) || [];
    if(cartItems.length != 0){
        cartItems = cartItems.filter(arr => JSON.stringify(arr) != JSON.stringify(item));
        window.localStorage.setItem('cartItems',JSON.stringify(cartItems));
        window.location.reload();
    }
}