
function modfyJoinUsNavLink() {
    const navlinks = document.querySelectorAll('.nav-link');
    if (navlinks.length == 6) {
        const joinus = navlinks[5];
        joinus.classList.add('btn');
        joinus.classList.add('slack-button');
        const slacksvg = document.createElement('img');
        slacksvg.src = "/images/branding/slack-icon.svg";
        slacksvg.alt = "Slack";
        joinus.appendChild(slacksvg);
    }
}

modfyJoinUsNavLink();
