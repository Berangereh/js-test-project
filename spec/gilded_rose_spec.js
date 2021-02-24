var { Item, Sulfuras, AgedBrie, BackstagedPasses, Shop } = require('../src/gilded_rose.js');
describe("GildedRose shop manager", function () {
  var listItems;

  beforeEach(function () {
    listItems = [];
  });


  it("Baisser de 1 la qualité et sellIn d'item normaux", function () {
    listItems.push(new Item("+5 Dexterity Vest", 10, 20));
    listItems.push(new Item("Conjured Mana Cake", -1, 6));

    listItems.forEach(item=>item.updateQuality());


    var expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: -2, quality: 2 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(listItems[idx].quality).toBe(testCase.quality);
      expect(listItems[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité de 1 pour Aged Brie et Backstage passes", function () {
    listItems.push(new AgedBrie("Aged Brie", 20, 30));
    listItems.push(new BackstagedPasses("Backstage passes to a TAFKAL80ETC concert", 20, 30));

    listItems.forEach(item=>item.updateQuality());


    var expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 19, quality: 31 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(listItems[idx].quality).toBe(testCase.quality);
      expect(listItems[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité par 3 s'il reste 5 ou moins sellIn pour Backstage passes", function () {
    listItems.push(new BackstagedPasses("Backstage passes to a TAFKAL80ETC concert", 5, 30));
    listItems.push(new BackstagedPasses("Backstage passes to a TAFKAL80ETC concert", 3, 30));

    listItems.forEach(item=>item.updateQuality());


    var expected = [
      { sellIn: 4, quality: 33 },
      { sellIn: 2, quality: 33 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(listItems[idx].quality).toBe(testCase.quality);
      expect(listItems[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Qualité de sulfuras ne se modifie pas", function () {
    listItems.push(new Sulfuras("Sulfuras, Hand of Ragnaros", Infinity, 80));

    listItems.forEach(item=>item.updateQuality());


    var expected = [
      { sellIn: Infinity, quality: 80 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(listItems[idx].quality).toBe(testCase.quality);
      expect(listItems[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Si sellIn négatif, qualité baisse 2x plus vite", function () {
    listItems.push(new Item("+5 Dexterity Vest", -4, 20));
    listItems.push(new Item("Mana Cake", -1, 6));

    listItems.forEach(item=>item.updateQuality());


    var expected = [
      { sellIn: -5, quality: 18 },
      { sellIn: -2, quality: 4 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(listItems[idx].quality).toBe(testCase.quality);
      expect(listItems[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Si conjured, qualité baisse 2x plus vite", function () {
    listItems.push(new Item("Conjured Dexterity Vest", 5, 20));
    listItems.push(new Item("Conjured Mana Cake", 3, 6));

    listItems.forEach(item=>item.updateQuality());


    var expected = [
      { sellIn: 4, quality: 18 },
      { sellIn: 2, quality: 4 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(listItems[idx].quality).toBe(testCase.quality);
      expect(listItems[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Si sellIn < 0, qualité = 0 pour le concert", function () {
    listItems.push(new BackstagedPasses("Backstage passes to a TAFKAL80ETC concert", 0, 10));

    listItems.forEach(item=>item.updateQuality());


    var expected = [
      { sellIn: -1, quality: 0 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(listItems[idx].quality).toBe(testCase.quality);
      expect(listItems[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Qualité jamais supérieur à 50", function () {
    listItems.push(new BackstagedPasses("Backstage passes to a TAFKAL80ETC concert", 12, 50));
    listItems.push(new Item("Mana Cake", 3, 6));

    listItems.forEach(item=>item.updateQuality());


    var expected = [
      { sellIn: 11, quality: 50 },
      { sellIn: 2, quality: 5 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(listItems[idx].quality).toBe(testCase.quality);
      expect(listItems[idx].sellIn).toBe(testCase.sellIn);
    });
  });
  it("Qualité jamais négative", function () {
    listItems.push(new Item("random product", 12, 0));
    listItems.push(new Item("Mana Cake", 3, 0));

    listItems.forEach(item=>item.updateQuality());


    var expected = [
      { sellIn: 11, quality: 0 },
      { sellIn: 2, quality: 0 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(listItems[idx].quality).toBe(testCase.quality);
      expect(listItems[idx].sellIn).toBe(testCase.sellIn);
    });
  });


});