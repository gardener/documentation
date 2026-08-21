// Join by a single "/", stripping leading/trailing slashes at segment
// boundaries so that no "//" is produced.
function joinSegments(...segments) {
  return segments.map((s) => String(s).replace(/^\/+|\/+$/g, '')).join('/');
}

// Canonical derivation of the upstream file URL for managed content.
// Used by the banner HTML comment (post-processing) and by the visible
// "Edit this page" button (VitePress config) — one source, no divergence.
//
// Points to the file view (blob), not the directory (tree), because both
// callers link to the concrete source file. The local filename (index.md)
// differs from the upstream name (README.md), so path_base_for_github_subdir.to
// is preferred; if absent, it falls back to the basename of the filePath.
export function buildUpstreamUrl(data, filePath) {
  const repo = data.github_repo;
  if (!repo) throw new Error('buildUpstreamUrl: missing github_repo');
  const subdir = data.github_subdir;
  if (!subdir) throw new Error('buildUpstreamUrl: missing github_subdir');

  const to = data.path_base_for_github_subdir && data.path_base_for_github_subdir.to;
  const fileName = to || (filePath && filePath.split('/').pop());
  if (!fileName) {
    throw new Error('buildUpstreamUrl: cannot resolve upstream file name (no .to and no filePath)');
  }

  const branch = (data.params && data.params.github_branch) || 'master';
  return joinSegments(repo, 'blob', branch, subdir, fileName);
}
