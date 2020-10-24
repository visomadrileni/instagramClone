const ToClipboard = require('./toClipboard');

/**
 * Copies the given text and executes done() when finished copying.
 * @param {Object} options 
 * @param {String} options.text
 * @param {Function} options.done
 */
 export const handyCopy = (options) => {
    let defaults = {
            text: '',
            done: function(){ return; }
         }
    let settings = Object.assign({}, defaults, options);
    let text = settings.text;
    let done = settings.done;

    ToClipboard(text);
    done();
}