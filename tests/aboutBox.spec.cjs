const { test, expect } = require('@playwright/test');

test.describe('About Box Functionality', () => {

  // Test: The About Box appears when the user clicks on the "About" menu item
  test('should display the About Box when the "About" menu item is clicked', async ({ page }) => {
    // Navigate to the page
    await page.goto('http://localhost:3000'); // Adjust URL based on your setup

    // Click on the "About" menu item
    await page.click('text=About'); 

    // Wait for the modal to be fully visible (Bootstrap modal may have fade-in animations)
    const aboutBox = await page.waitForSelector('#aboutSpeedScore', { state: 'visible' });
    await expect(aboutBox).toBeVisible(); // Verify the About Box is visible
  });

  // Test: The About Box is hidden when the user clicks on the "x" close button in the header
  test('should hide the About Box when the "x" button is clicked', async ({ page }) => {
    // Open the About Box
    await page.goto('http://localhost:3000');
    await page.click('text=About');

    // Wait for the modal to become visible
    const aboutBox = await page.waitForSelector('#aboutSpeedScore', { state: 'visible' });

    // Select the specific "x" close button in the modal header and click it
    await page.click('#aboutSpeedScore .modal-header .close-about-btn'); 

    // Ensure the modal is hidden
    await expect(aboutBox).toBeHidden(); // Verify that the About Box is hidden
  });

  // Test: The About Box is hidden when the user clicks on the "OK" button in the footer
  test('should hide the About Box when the "OK" button is clicked', async ({ page }) => {
    // Open the About Box
    await page.goto('http://localhost:3000');
    await page.click('text=About');

    // Wait for the modal to become visible
    const aboutBox = await page.waitForSelector('#aboutSpeedScore', { state: 'visible' });
   
    await page.click('#aboutSpeedScore .modal-footer .btn-theme'); 
    // Ensure the modal is hidden
    await expect(aboutBox).toBeHidden(); 
  });

});
