export const ITEM_LIMIT_PER_PAGE = 10;
export const discountedPrice = (item) =>{
    return Math.round(item.price*((100-item.discountPercentage)/100),2);
}