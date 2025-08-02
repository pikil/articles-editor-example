const portalCache: { [key: string]: HTMLElement | null } = {};

const getPortalElement = (id: string): HTMLElement | null => {
  if (!portalCache[id])
    portalCache[id] = document.getElementById(id);

  return portalCache[id];
};

export const portal = (node: HTMLElement, id: string = 'modals') => {
  const portalContainer = getPortalElement(id);

  if (!portalContainer)
    return;

  portalContainer.appendChild(node);
  node.focus();
};
