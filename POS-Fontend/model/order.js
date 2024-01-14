export class Order {
    constructor(id, date, cusId, items, discount, total) {
        this.id = id;
        this.date = date;
        this.cusId = cusId;
        this.items = items;
        this.discount = discount;
        this.total = total;
    }
}
