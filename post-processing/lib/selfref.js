// Detects frontmatter that misclassifies local content as managed.
//
// Background: docforge aggregates upstream markdown into hugo/content/ and marks
// each file with `github_repo` pointing at its upstream source. The banner
// classifier (see banner.js) treats any file with `github_repo` as MANAGED.
//
// A file whose `github_repo` points at gardener/documentation itself is a
// self-reference: real upstream content never lives in the documentation repo,
// so such a value almost certainly means locally maintained content was
// accidentally tagged as aggregated. That file then gets a MANAGED banner and
// is treated as read-only, even though it is the source of truth.

// Matches https://github.com/gardener/documentation with optional scheme,
// trailing slash or .git suffix, case-insensitive. Only the exact repo counts;
// e.g. gardener/documentation-foo must not match.
const SELF_REPO_RE =
  /^(?:https?:\/\/)?github\.com\/gardener\/documentation(?:\.git)?\/?$/i;

// Returns true if github_repo points at the documentation repo itself.
export function isSelfReference(githubRepo) {
  if (typeof githubRepo !== 'string') return false;
  return SELF_REPO_RE.test(githubRepo.trim());
}

// Inspects a single file's parsed frontmatter and returns a list of violation
// objects. Empty array means the file is fine.
//
// Two independent checks:
//  - self-reference: github_repo points at gardener/documentation
//  - contradiction: `local: true` combined with any `github_repo`, which asserts
//    both "source of truth" and "aggregated from upstream" at the same time
export function findViolations(filePath, data) {
  const violations = [];
  const githubRepo = data?.github_repo;

  if (isSelfReference(githubRepo)) {
    violations.push({
      file: filePath,
      rule: 'self-reference',
      message: `github_repo points at gardener/documentation itself (${githubRepo}); local content must not be tagged as aggregated`,
    });
  }

  if (data?.local === true && typeof githubRepo === 'string') {
    violations.push({
      file: filePath,
      rule: 'local-and-github_repo',
      message: `frontmatter sets local: true and github_repo (${githubRepo}) at the same time; a file is either local or aggregated, not both`,
    });
  }

  return violations;
}
