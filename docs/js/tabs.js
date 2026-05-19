/*
 * Copyright 2026 University of Illinois
 * Authors: Jon Gunderson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global $ */

'use strict';

window.addEventListener('load', () => {
  const tablists = Array.from(document.querySelectorAll('[role=tablist]'));

  tablists.forEach( (tablist) => {
    const tabs = Array.from(document.querySelectorAll('[role=tab]'));

    const firstTab = tabs[0];
    const lastTab  = tabs[tabs.length-1];

    function setSelectedTab(selectedTab, setFocus=true) {
      tabs.forEach( (tab) => {
        const tabpanel = document.querySelector(`#${tab.getAttribute('aria-controls')}`);
        if (selectedTab === tab) {
          tab.setAttribute('aria-selected', 'true');
          tab.classList.add('active');
          tabpanel.classList.add('active');
          tab.tabIndex = 0;
          if (setFocus) tab.focus();
        }
        else {
          tab.setAttribute('aria-selected', 'false');
          tab.classList.remove('active');
          tabpanel.classList.remove('active');
          tab.tabIndex = -1;
        }
      })
    }

    function setSelectedToPreviousTab(currentTab) {
      if (currentTab === firstTab) {
        setSelectedTab(lastTab);
      } else {
        const index = tabs.indexOf(currentTab);
        setSelectedTab(tabs[index - 1]);
      }
    }

    function setSelectedToNextTab(currentTab) {
      if (currentTab === lastTab) {
        setSelectedTab(firstTab);
      } else {
        const index = tabs.indexOf(currentTab);
        setSelectedTab(tabs[index + 1]);
      }
    }

    tabs.forEach( (tab) => {

      tab.tabIndex = -1;
      tab.addEventListener('click', (event) => {
        setSelectedTab(event.currentTarget);
        event.preventDefault();
        event.stopPropagation();
      });

      tab.addEventListener('keydown', (event) => {

        const tgt = event.currentTarget;
        let flag = false;
        switch (event.key) {
          case 'ArrowLeft':
            setSelectedToPreviousTab(tgt);
            flag = true;
            break;

          case 'ArrowRight':
            setSelectedToNextTab(tgt);
            flag = true;
            break;

          case 'Home':
            setSelectedTab(firstTab);
            flag = true;
            break;

          case 'End':
            setSelectedTab(lastTab);
            flag = true;
            break;

          default:
            break;
        }

        if (flag) {
          event.stopPropagation();
          event.preventDefault();
        }

      });

      setSelectedTab(firstTab, false);
    })


  });
});

// Set aria-current

window.addEventListener('load', () => {
  const links = Array.from(document.querySelectorAll('a[href]'));
  links.forEach( (link) => {
    if (window.location.href.includes(link.href.split('#')[0])) {
      link.setAttribute('aria-current', 'page');
    }
  });
});

