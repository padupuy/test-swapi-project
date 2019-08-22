const runYarnLock = 'yarn install --frozen-lockfile';

module.exports = {
  hooks: {
    'post-checkout': runYarnLock,
    'post-merge': runYarnLock,
    'post-rebase': 'yarn install',
    'pre-commit': 'yarn lint-staged'
  }
};
