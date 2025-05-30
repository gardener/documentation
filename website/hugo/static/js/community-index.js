"use strict";

function showIndexCommunityPage(){
    var currentUrl = window.location.href;
    var pattern1 = /\/community\/(\#[^\/]*)?$/;
    var pattern2 = /\/community(\/review-meetings)\/(\#[^\/]*)?$/;

    if (pattern1.test(currentUrl)) {
        createIndex(1);
    }
    else if (pattern2.test(currentUrl)) {
        createIndex(2);
    }
}

function createIndex(level){
    var bullets = document.querySelectorAll(`.ul-${level} > li > label > a`)
    console.log(bullets)
        if (bullets) {
            var sectionIndex = document.createElement('div');
            sectionIndex.className = 'section-index';

            var hr = document.createElement('hr');
            hr.className = 'panel-line';
            sectionIndex.appendChild(hr);

            bullets.forEach(function(bullet) {
                var entry = document.createElement('div');
                entry.className = 'entry';

                var h5 = document.createElement('h5');
                var a = document.createElement('a');
                a.href = bullet.href;
                a.textContent = bullet.textContent;
                h5.appendChild(a);
                entry.appendChild(h5);

                var p = document.createElement('p');
                p.textContent = '';
                entry.appendChild(p);

                sectionIndex.appendChild(entry);
                console.log(sectionIndex);
            });

            var tdcontent = document.querySelector('.td-content > .td-content');
            if (tdcontent) {
                tdcontent.appendChild(sectionIndex);
            }
        }
}

showIndexCommunityPage();