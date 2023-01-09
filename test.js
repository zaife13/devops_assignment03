const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { By } = require("selenium-webdriver");

const test = async () => {
  const driver = new webdriver.Builder()
    .forBrowser("firefox")
    .setFirefoxOptions(new firefox.Options().headless())
    .build();
  console.log("Loading Browser");
  await driver.get(`http://localhost:3000`);

  console.log("1: Open Website");
  const title = await driver.getTitle();
  console.log(title == "my app");

  console.log("2: Open new Article Page");
  await driver.findElement(By.css(".addArticleBtn")).click();
  console.log(await driver.findElement(By.css(".addNewTitle")).isDisplayed());

  console.log("3: Add new Article");
  await driver.findElement(By.css(".inputTitle")).sendKeys("New Article");
  await driver.findElement(By.css(".inputAuthor")).sendKeys("Huzaifa");
  await driver.findElement(By.css(".inputBody")).sendKeys("My new article");
  await driver.findElement(By.css(".inputSubmit")).click();
  console.log(
    await driver.findElement(By.css(".articleListTitle")).isDisplayed()
  );

  console.log("4: Check New item listed Article");
  const listedItems = await driver.findElements(By.css(".listedArticle"));
  console.log(
    (await listedItems[listedItems.length - 1].getText()) == "New Article"
  );

  console.log("5: Delete Listed Article");
  await listedItems[listedItems.length - 1].click();
  await driver.findElement(By.css(".delete-article")).click();
  const listedItemsUpdated = await driver.findElements(
    By.css(".listedArticle")
  );
  console.log(listedItemsUpdated.length == listedItems.length - 1);
};
test();
