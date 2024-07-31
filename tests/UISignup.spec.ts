import { test, expect, Locator,Keyboard } from '@playwright/test';
test('Create account - signup', async ({ page }) => {
  await page.goto('');
  console.log (await page.title());
  await expect(page).toHaveTitle(/Home Page/);
  await expect(page).toHaveScreenshot('landing.png');
  const createaccountlink : Locator = page.getByRole('link', { name: 'Create an Account' })
  
  await  Promise.all(
    [
      page.waitForURL('**\/customer/account/create/**/'),
      createaccountlink.click()
    ]
  )
  console.log (await page.title());
  await expect(page).toHaveTitle(/New Customer/);
  await expect(page).toHaveScreenshot('Signup.png');
  const Firstname :Locator = page.getByLabel('First Name');
  await Firstname.fill('Kundan');
  const Lasttname :Locator = page.locator('.control #lastname');
  await Lasttname.fill('Kumar');
  const Emaild :Locator = page.locator('.control  input[title="Email"]');
  await Emaild.fill('kundankumar_111@yahoo.com');
  const Password :Locator = page.locator('//input[@id="password"]')
  await Password.scrollIntoViewIfNeeded();
  await Password.pressSequentially('Kundan#@$1997');
  const confirmPassword :Locator = page.locator('//input[@id="password-confirmation"]');
  await confirmPassword.pressSequentially('Kundan#@$1997');
  const signupbtn :Locator= page.getByRole('button',{name:'Create an Account'});
  await signupbtn.hover();
  await  Promise.all(
    [
      page.waitForURL('**\/customer/account**/'),
      signupbtn.click()
    ]
  )
  await page.waitForLoadState('networkidle');
  const H1UI : Locator = page.getByRole('heading', { level: 1, name: 'My Account' } );
  await H1UI.isVisible();

});

test('Signin using account created', async ({ page }) => {
  await page.goto('');
  console.log (await page.title());
  const SigninLink : Locator = page.getByRole('link', { name: 'Sign In' });
  SigninLink.waitFor();
  await  Promise.all(
    [
      page.waitForURL('**\/customer/account/login/**/'),
      SigninLink.click()
    ]
  )
  await expect(page).toHaveTitle(/Customer Login/);
  await expect(page).toHaveScreenshot('Signin page Landing.png');
  const Emaild :Locator = page.locator('.control  input[title="Email"]');
  await Emaild.fill('kundankumar_111@yahoo.com');
  const Password :Locator = page.locator('//input[@name="login[password]"]')
  await Password.fill('Kundan#@$1997');
  const signinbtn :Locator= page.locator('//*[@type="submit" and @class="action login primary"]');
  await signinbtn.click();
  await page.waitForLoadState('networkidle');
  console.log (await page.title());
  await expect(page).toHaveScreenshot('signin successful.png');

});
