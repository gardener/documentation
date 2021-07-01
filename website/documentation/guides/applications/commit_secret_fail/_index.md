---
title: Storing secrets in git 💀
description: "Never ever commit a kubeconfig.yaml into github"
level: intermediate
category: Fails
scope: app-developer
---



## Problem
If you commit sensitive data, such as a `kubeconfig.yaml` or `SSH key` into a Git repository, you can remove it from 
the history. To entirely remove unwanted files from a repository's history you can use the git `filter-branch` command.

The git filter-branch command rewrite your repository's history, which changes the SHAs for 
existing commits that you alter and any dependent commits. Changed commit SHAs may affect open pull requests 
in your repository. **I recommend merging or closing all open pull requests before removing files from your repository.** 

> **Warning:** - if someone has already checked out the repository, then of course he has the secret on his computer. So ALWAYS revoke the OAuthToken/Password or whatever it was imediately.


## Purging a file from your repository's history

> **Warning:** If you run `git filter-branch` after stashing changes, you won't be able to retrieve your changes with other 
stash commands. Before running git filter-branch, we recommend unstashing any changes you've made. To unstash the 
last set of changes you've stashed, run `git stash show -p | git apply -R`. For more information, see Git Tools Stashing.


To illustrate how `git filter-branch` works, we'll show you how to remove your file with sensitive data from the 
history of your repository and add it to .gitignore to ensure that it is not accidentally re-committed.

**Navigate into the repository's working directory.**

```bash
cd YOUR-REPOSITORY
```

**Run the following command, replacing `PATH-TO-YOUR-FILE-WITH-SENSITIVE-DATA` with the path to the file you want to remove, 
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

**Add your file with sensitive data to `.gitignore` to ensure that you don't accidentally commit it again.**
```bash
 echo "YOUR-FILE-WITH-SENSITIVE-DATA" >> .gitignore
```

**Double-check that you've removed everything you wanted to from your repository's history, and that all of your 
branches are checked out.**

**Once you're happy with the state of your repository, force-push your local changes to overwrite your GitHub repository, 
as well as all the branches you've pushed up:**

```bash
git push origin --force --all
```

**In order to remove the sensitive file from your tagged releases, you'll also need to force-push against your Git tags:**
```bash
git push origin --force --tags
```

> **Warning:** Tell your collaborators to **rebase, not merge**, any branches they created off of your old (tainted) repository history. 
One merge commit could reintroduce some or all of the tainted history that you just went to the trouble of purging.


References:

 - https://help.github.com/articles/removing-sensitive-data-from-a-repository/
 
<style>
blockquote {
 border:1px solid red;
 padding:10px;
 margin-top:40px;
 margin-bottom:40px;
}
blockquote p {
    font-size: 1.5rem;
    color: black;
}
</style>
