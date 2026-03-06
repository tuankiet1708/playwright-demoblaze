import { expect, type Page } from '@playwright/test';

export async function expectDialogAndAccept(
  page: Page,
  trigger: () => Promise<void>,
  expectedMessage: string | RegExp,
): Promise<string> {
  // Register the dialog listener before triggering the action.
  // DemoBlaze alerts can appear immediately, so late listeners can miss the event and flake tests.
  const dialogPromise = page.waitForEvent('dialog', { timeout: 10_000 });

  // Start trigger work without awaiting it yet.
  // Click actions that open alerts often pause until the alert is accepted.
  // Waiting for trigger first can deadlock if dialog handling is pending in this helper.
  const triggerPromise = trigger();

  const dialog = await dialogPromise;
  const message = dialog.message();

  if (typeof expectedMessage === 'string') {
    expect(message).toContain(expectedMessage);
  } else {
    expect(message).toMatch(expectedMessage);
  }

  // Accept first to unblock the page, then await the trigger completion.
  // This guarantees the caller gets a fully completed action state after this helper returns.
  await dialog.accept();
  await triggerPromise;
  return message;
}
