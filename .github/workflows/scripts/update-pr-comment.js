/**
 * Script: update-pr-comment.js
 * Purpose: Update PR comment to indicate preview has been removed
 * Usage: Called by actions/github-script with github and context objects
 * 
 * @param {Object} github - GitHub API client from actions/github-script
 * @param {Object} context - GitHub context from actions/github-script
 */
module.exports = async ({ github, context }) => {
  const prNumber = context.payload.pull_request.number;
  const commentBody = `## 🧹 Preview Removed

The preview for this PR is no longer available since the PR has been closed.`;

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
    console.log('Updated existing comment');
  } else {
    console.log('No existing preview comment found to update');
  }
};
