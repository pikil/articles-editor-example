import { tick } from 'svelte';

let dialog: HTMLDialogElement | null = null;

const actionBtnClasses = 'rounded-lg px-4 py-2 transition-colors cursor-pointer';

/**
 * @returns {void}
 */
const setDialog = () => {
  if (!dialog)
    dialog = document.getElementById('async-dialog') as HTMLDialogElement;

  if (dialog)
    dialog.textContent = '';
};

const closeDialog = () => {
  if (!dialog)
    return;

  dialog.textContent = '';
  dialog.className = '';
  dialog.close();
};

export const asyncConfirmation = (
  title: string,
  text: string,
  okLabel: string = 'Confirm',
  backLabel: string = 'Back'
): Promise<boolean> => new Promise((resolve) => {
  setDialog();

  if (!dialog) {
    console.error('No dialog container provided...'); // eslint-disable-line no-console
    return;
  }

  dialog.className = 'fixed inset-0 grid place-items-center bg-black/30 backdrop-blur-sm w-screen h-screen max-w-screen max-h-screen px-4';

  const container = document.createElement('div');
  container.className = 'bg-surface dark:text-white rounded-xl max-w-2xl p-6 pop-in';

  const titleEl = document.createElement('div');
  titleEl.className = 'text-2xl font-bold';
  titleEl.textContent = title;

  const txtEl = document.createElement('div');
  txtEl.className = 'mt-4 mb-8';
  txtEl.textContent = text;

  const actions = document.createElement('div');
  actions.className = 'flex flex-col-reverse sm:flex-row justify-end gap-2';

  const okBtn = document.createElement('button');
  const backBtn = document.createElement('button');

  okBtn.textContent = okLabel;
  okBtn.className = actionBtnClasses + ' bg-primary/90 hover:bg-primary text-white';

  backBtn.textContent = backLabel;
  backBtn.className = actionBtnClasses + ' bg-gray-300/50 hover:bg-gray-300 dark dark:bg-gray-600/90 dark:hover:bg-gray-600 dark:text-white';

  actions.appendChild(backBtn);
  actions.appendChild(okBtn);
  container.appendChild(titleEl);
  container.appendChild(txtEl);
  container.appendChild(actions);
  dialog.appendChild(container);

  const onKeydown = (evt: KeyboardEvent) => {
    let result = null;

    if (evt.key === 'Enter')
      result = true;
    else if (evt.key === 'Escape')
      result = false;

    if (typeof result === 'boolean') {
      doClose(result);

      evt.preventDefault();
      evt.stopPropagation();
    }
  };

  const doClose = async (status: boolean) => {
    document.removeEventListener('keydown', onKeydown);
    dialog?.removeEventListener('click', onBackdropClick);

    closeDialog();

    await tick();
    resolve(status);
  };

  const onBackdropClick = ({ target }: PointerEvent | MouseEvent) => {
    if (dialog && target !== dialog)
      return;

    doClose(false);
  };

  okBtn.addEventListener('click', doClose.bind(null, true));
  backBtn.addEventListener('click', doClose.bind(null, false));

  document.addEventListener('keydown', onKeydown);
  dialog?.addEventListener('click', onBackdropClick);

  dialog?.showModal();
});
