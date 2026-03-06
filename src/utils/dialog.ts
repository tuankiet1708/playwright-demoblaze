import { expect, type Page } from '@playwright/test';

export async function expectDialogAndAccept(
  page: Page,
  trigger: () => Promise<void>,
  expectedMessage: string | RegExp,
): Promise<string> {
  const dialogPromise = page.waitForEvent('dialog', { timeout: 10_000 });
  const triggerPromise = trigger();
  const dialog = await dialogPromise;
  const message = dialog.message();

  if (typeof expectedMessage === 'string') {
    expect(message).toContain(expectedMessage);
  } else {
    expect(message).toMatch(expectedMessage);
  }

  await dialog.accept();
  await triggerPromise;
  return message;
}
