export const role = {
  VIEWER: 1,
  MODERATOR: 20,
  EDITOR: 30
};

export const userRoles = [
  { label: 'Viewer', value: role.VIEWER },
  { label: 'Moderator', value: role.MODERATOR },
  { label: 'Editor', value: role.EDITOR }
];

export const statuses = [
  'On Moderation',
  'Published',
  'Needs work'
];
