class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn; 
    this.quality = quality;
    if (this.quality >50) {this.quality = 50};
    if (this.quality <0) {this.quality = 0};
  }
  updateQuality() {
    const coef = this.isConjured();
    this.sellIn -= 1;
    if(this.sellIn>=0) {
      this.quality -= 1 * coef;
    } else {
      this.quality -= 2 * coef;
    }
    this.limitQuality();
    return this;
  }

  limitQuality() {
    if (this.quality <0) {this.quality = 0};
    if (this.quality>50) {this.quality=50};
  }

  isConjured() {
    if (/^Conjured/.test(this.name)) return 2;
    return 1;
  }
}

class Sulfuras extends Item {
  constructor(name, sellIn, quality){
    super (name, sellIn, quality)
      this.name = 'Sulfuras, Hand of Ragnaros';
      this.sellIn = Infinity;
      this.quality = 80;
  }
  updateQuality() {
    return this;
  }
}

class AgedBrie extends Item {
  constructor(name, sellIn, quality){
    super (name, sellIn, quality)
    this.name = 'Aged Brie';
  }
  updateQuality() {
    this.sellIn -= 1;
    this.quality += 1;
    this.limitQuality();
    return this;
  }
}

class BackstagedPasses extends Item {
 constructor(name, sellIn, quality){
  super (name, sellIn, quality)
    this.name = 'Backstage passes to a TAFKAL80ETC concert';
  }

  updateQuality() {
    this.sellIn -= 1;
    if (this.sellIn>10){this.quality += 1}
    if (this.sellIn<=10 && this.sellIn>5){this.quality += 2}
    if (this.sellIn<=5 && this.sellIn>=0){this.quality += 3}
    if (this.sellIn<0){this.quality =0}
    this.limitQuality();
    return this;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
}

module.exports = {
  Item,
  Sulfuras,
  AgedBrie,
  BackstagedPasses,
  Shop
}