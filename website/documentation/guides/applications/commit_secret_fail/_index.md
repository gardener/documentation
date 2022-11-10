---
title: Remove Committed Secrets in Github 💀
description: "Never ever commit a kubeconfig.yaml into github"
level: intermediate
category: Fails
scope: app-developer
---

## Overview
If you commit sensitive data, such as a `kubeconfig.yaml` or `SSH key` into a Git repository, you can remove it from 
the history. To entirely remove unwanted files from a repository's history you can use the git `filter-branch` command.

The git `filter-branch` command rewrites your repository's history, which changes the SHAs for existing commits that you alter and any dependent commits. Changed commit SHAs may affect open pull requests in your repository. **Merging or closing all open pull requests before removing files from your repository is recommended.** 

{{% alert color="warning"  title="Warning" %}}
If someone has already checked out the repository, then of course they have the secret on their computer. So ALWAYS revoke the OAuthToken/Password or whatever it was immediately.
{{% /alert %}}

## Purging a File from Your Repository's History

{{% alert color="warning"  title="Warning" %}}
If you run `git filter-branch` after stashing changes, you won't be able to retrieve your changes with other 
stash commands. Before running `git filter-branch`, we recommend unstashing any changes you've made. To unstash the 
last set of changes you've stashed, run `git stash show -p | git apply -R`. For more information, see [Git Tools - Stashing and Cleaning](https://git-scm.com/book/en/v2/Git-Tools-Stashing-and-Cleaning).
{{% /alert %}}

To illustrate how `git filter-branch` works, we'll show you how to remove your file with sensitive data from the 
history of your repository and add it to .gitignore to ensure that it is not accidentally re-committed.

**1. Navigate into the repository's working directory:**

```bash
cd YOUR-REPOSITORY
```

**2. Run the following command, replacing `PATH-TO-YOUR-FILE-WITH-SENSITIVE-DATA` with the path to the file you want to remove, 
not just its filename.**

These arguments will:
* Force Git to process, but not check out, the entire history of every branch and tag
* Remove the specified file, as well as any empty commits generated as a result
* Overwrite your existing tags

```bash
git filter-branch --force --index-filter \
'git rm --cached --ignore-unmatch PATH-TO-YOUR-FILE-WITH-SENSITIVE-DATA' \
--prune-empty --tag-name-filter cat -- --all
```

**3. Add your file with sensitive data to `.gitignore` to ensure that you don't accidentally commit it again:**
```bash
 echo "YOUR-FILE-WITH-SENSITIVE-DATA" >> .gitignore
```

Double-check that you've removed everything you wanted to from your repository's history, and that all of your 
branches are checked out. Once you're happy with the state of your repository, continue to the next step.

**4. Force-push your local changes to overwrite your GitHub repository, as well as all the branches you've pushed up:**

```bash
git push origin --force --all
```

**4. In order to remove the sensitive file from your tagged releases, you'll also need to force-push against your Git tags:**
```bash
git push origin --force --tags
```

{{% alert color="warning"  title="Warning" %}}
Tell your collaborators to **rebase, not merge**, any branches they created off of your old (tainted) repository history. 
One merge commit could reintroduce some or all of the tainted history that you just went to the trouble of purging.
{{% /alert %}}

## Related Links
- [Removing Sensitive Data from a Repository](https://help.github.com/articles/removing-sensitive-data-from-a-repository/)