/*
 * CSE 154
 * Section 11: Post Example
 */
'use strict';
(function() {
  const API_URL = 'https://courses.cs.washington.edu/courses/cse154/webservices/postmantest/postwithparams.php';

  window.addEventListener('load', init);

  /**
   * setup the sign-in button on initial page load
   */
  function init() {
    qs('form').addEventListener('submit', (e)  => {
      e.preventDefault();
      signIn();
    });
  }

  /**
   * signs the user in based on username and password inputs
   */
  function signIn() {
    let data =  new FormData();
    data.append('user', id('username').value);
    data.append('password', id('password').value);
    fetch(API_URL, {method: 'POST', body: data})
      .then(statusCheck)
      .then(res => res.text())
      .then((res) => id('response').textContent = res)
      .catch(console.error);
  }

  /* ------------------------------ Helper Functions  ------------------------------ */

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} res - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @return {object} DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns the element that has the matches the selector passed.
   * @param {string} selector - selector for element
   * @return {object} DOM object associated with selector.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }
})();