/**
 * Script: update-pr-comment.js
 * Purpose: Update PR comment to indicate preview has been removed
 * Usage: Called by actions/github-script with github and context objects
 * 
 * @param {Object} github - GitHub API client from actions/github-script
 * @param {Object} context - GitHub context from actions/github-script
 */
module.exports = async ({ github, context }) => {
  console.log('=== Starting update-pr-comment.js ===');

  const prNumber = context.payload.pull_request.number;
  console.log(`PR Number: ${prNumber}`);
  console.log(`Repository: ${context.repo.owner}/${context.repo.repo}`);
  console.log(`Event: ${context.eventName}`);

  const commentBody = `## 🧹 Preview Removed

The preview for this PR is no longer available since the PR has been closed.`;

  console.log('Comment body to post:');
  console.log(commentBody);

  // Find existing comment
  console.log(`Fetching comments for PR #${prNumber}...`);
  console.log(`API call: github.rest.issues.listComments({ owner: "${context.repo.owner}", repo: "${context.repo.repo}", issue_number: ${prNumber} })`);

  const { data: comments } = await github.rest.issues.listComments({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: prNumber
  });

  console.log(`Found ${comments.length} total comments on PR #${prNumber}`);

  const botComment = comments.find(comment => 
    comment.user.type === 'Bot' && 
    comment.body.includes('Preview Deployed')
  );

  if (botComment) {
    console.log(`Found existing preview comment (ID: ${botComment.id})`);
    console.log(`Comment author: ${botComment.user.login} (${botComment.user.type})`);
    console.log(`API call: github.rest.issues.updateComment({ owner: "${context.repo.owner}", repo: "${context.repo.repo}", comment_id: ${botComment.id}, body: "..." })`);

    // Update existing comment
    await github.rest.issues.updateComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      comment_id: botComment.id,
      body: commentBody
    });
    console.log(`✅ Successfully updated comment ID: ${botComment.id}`);
  } else {
    console.log('⚠️ No existing preview comment found to update');
    console.log('Searched for comments from Bot users containing "Preview Deployed"');
  }

  console.log('=== update-pr-comment.js completed ===');
};
