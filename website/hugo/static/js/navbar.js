
function modifyJoinUsNavLink() {
    const navlinks = document.querySelectorAll('.nav-link');
    if (navlinks.length > 0) {
        const joinus = navlinks[navlinks.length - 1];
        joinus.classList.add('btn');
        joinus.classList.add('slack-button');
        const slacksvg = document.createElement('img');
        slacksvg.src = "/images/branding/slack-icon.svg";
        slacksvg.alt = "Slack";
        joinus.appendChild(slacksvg);
    }
}

modifyJoinUsNavLink();
