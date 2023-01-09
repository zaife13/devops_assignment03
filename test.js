const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { By } = require("selenium-webdriver");

const test = async () => {
  const driver = new webdriver.Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options().headless())
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
  //   await driver.switchTo().alert().accept();

  //   console.log("3) Add new task");
  //   let added_tasks = await driver.findElements(By.css(".added-tasks"));
  //   const field = await driver.findElement(By.css(".add-task-input"));
  //   await field.sendKeys("New Task");
  //   await driver.findElement(By.css(".add-btn")).click();
  //   added_tasksUpdated = await driver.findElements(By.css(".added-tasks"));
  //   console.log(added_tasksUpdated.length == added_tasks.length + 1);

  //   console.log("4) Verify newely added task");
  //   added_tasks = await driver.findElements(By.css(".added-tasks-input"));
  //   console.log(
  //     (await added_tasks[added_tasks.length - 1].getText()) == "New Task"
  //   );

  //   console.log("5) Remove New Added Tasks");
  //   await driver.findElement(By.css(".remove-task")).click();
  //   added_tasks = await driver.findElements(By.css(".added-tasks-input"));
  //   console.log(added_tasks.length == 0);
};
test();
