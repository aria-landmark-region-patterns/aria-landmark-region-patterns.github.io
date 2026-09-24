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

window.addEventListener('load', () => {

  function countElement(selector) {
    const elems = document.querySelectorAll(`${selector}`);
    return elems.length;
  }

  setTimeout( () => {
    document.querySelector('#nav-count').textContent = countElement('nav, skip-to-content');
    const regionCount = countElement('section[aria-label], section[aria-labelledby');
    const regionNode = document.querySelector('#region-count');
    regionCount > 0 ?
      regionNode.textContent = regionCount :
      regionNode.parentNode.parentNode.setAttribute('hidden', '');

    document.querySelector('#h1-count').textContent = countElement('h1');
    document.querySelector('#h2-count').textContent = countElement('h2');
    const h3Count = countElement('h3');
    const h3Node = document.querySelector('#h3-count');
    h3Count > 0 ?
      h3Node.textContent = countElement('h3') :
      h3Node.parentNode.parentNode.setAttribute('hidden', '');

   }, 200);


});
