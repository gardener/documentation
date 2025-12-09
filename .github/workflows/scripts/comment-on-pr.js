/**
 * Script: comment-on-pr.js
 * Purpose: Comment on PR with preview deployment URL
 * Usage: Called by actions/github-script with github and context objects
 * 
 * @param {Object} github - GitHub API client from actions/github-script
 * @param {Object} context - GitHub context from actions/github-script
 */
module.exports = async ({ github, context }) => {
  const prNumber = context.payload.pull_request.number;
  const previewUrl = `https://documentation-demo.gardener.cloud/pr-preview/pr-${prNumber}/`;
  const commentBody = `## 🚀 Preview Deployed

Your preview is being built and will be available at:
${previewUrl}

**Note:** The preview will only be available after the GitHub Pages deployment completes in the demo repository. 

To view the deployment status, visit: https://github.com/gardener/documentation-demo/actions`;

  // Find existing comment
  const { data: comments } = await github.rest.issues.listComments({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: prNumber
  });

  const botComment = comments.find(comment => 
    comment.user.type === 'Bot' && 
    comment.body.includes('Preview Deployed')
  );

  if (botComment) {
    // Update existing comment
    await github.rest.issues.updateComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      comment_id: botComment.id,
      body: commentBody
    });
  } else {
    // Create new comment
    await github.rest.issues.createComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: prNumber,
      body: commentBody
    });
  }
};
