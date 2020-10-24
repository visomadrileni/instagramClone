import {toggle} from '../utils';

 class Dom {
     element = '';

     //Get element as a string
     constructor(element){
         this.element = element;
     }

     //Converts element into a Dom element 
     toDom = () => {
         let element = document.querySelector(this.element);
         return element ? element : null;
     }

     //Returns all DOM elements
     toAll = () =>  document.querySelectorAll(this.element);

    //Perform a function/method on element only if is not null/present
    ifElement = fn => {
      let element = this.toDom();
      return  element ? fn() : null
    } 

    //Focuses the element
    focus = () => {
        this.ifElement(() => this.toDom().focus());
        return this;
    }

    //Blurs the element,blur() method is used to remove focus from an element.
    blur = () => {
        this.ifElement(() => this.toDom().blur());
        return this;
    }

    //Changes the text of element
     text = t => {
         this.ifElement(() => (this.toDom().innerText = t));
         return this;
     }

    //Changes the html of element
    html = body => {
        this.ifElement(() => (this.toDom().innerHTML = body));
        return this;
    }

    //Helper for adding or removing class
    doWhat = (operation,className) => {
        let all = Array.from(document.querySelectorAll(this.element));
        for(let elem of all){ //I use classList API to remove and add classes
            elem.classList[operation](className)
        }        
    }

    //Adds a class to element
    addClass = className => {
        this.ifElement(() => this.doWhat('add',className));
        return this;
    } 

    //Remove a class from the element
    removeClass = className => {
        this.ifElement(() => this.doWhat('remove',className));
        return this;
    }

    //Toggle class of the element
    toggleClass = className => {
        this.ifElement(() => this.toDom().classList.toggle(className));
        return this;
    }
    
    //Returns the attribute of the element
    getAttr = attr => {
        let el = this.toDom();
        return el ? el.getAttribute(attr) : null;
    }

    //Sets/Changes attribute of the element
    setAttr = (name,value) => {
        this.ifElement(() => this.toDom().setAttribute(name,value));
        return this;
    }

    //toggle(hide/show) element
    toggle = () => {
        this.ifElement(() => (this.toDom().style.display = 'none'));
        return this;
    }

    //Hides the element
    hide = () => {
        this.ifElement(() => (this.toDom().style.display = 'none'));
        return this;
    } 

    //Show the element
    show = () => {
        this.ifElement(() => (this.toDom().style.display = 'block'));
        return this;
    } 

    //Applies css to the element
    css = (styleName,styleValue) => {
        this.ifElement(() => (this.toDom().style[styleName] = styleValue));
        return this;
    }

    //Applies multiple css rules to the element
    multipleCss = styles => {
        //assign(target, source) target in our case is element when will put all styles
        this.ifElement(() => Object.assign(this.toDom(),styles));
        return this;
    }

    //Return the value of element
    val = () => {
        let value = this.toDom().value;
        return value;
    }

    //Set the value of element
    setValue = value => {
        this.ifElement(() => (this.toDom().value = value))
        return this
    }

    //Performs an action on the element such as click,change
    on = (actionType,fn) => {
        this.ifElement(() => {
            let element = this.toDom();
            element.addEventListener(actionType,e => fn(e))
        })
        return this;
    }

    //Scrolls to top
    scrollTop = (behavior = 'smooth') => {
        this.ifElement(() => this.toDom().scrollIntoView({ behavior: behavior}));
        return this;
    }

    //Fades(fadeIn/fadeOut => make what is write visible(pop up) o not) the element
    fade = () => {
        this.toggleClass('fade');
        return this;
    }

    //Remove the element
    remove = () => {
        this.ifElement(() => this.toDom().remove());
        return this;
    }

    //Return data of the element from dataset
    data = what => {
        let element = this.toDom();
        return element ? element.dataset[what] : null;
    }
 }
  
  const d = Dom;
  export default d;




















































































































































































