export const copyTextToClipboard = (text) => {
   let textArea = document.createElement('textarea');
   let st = textArea.style;
  
    st.position = 'fixed';
    st.top = 0;
    st.left = 0;
    st.width = '2em';
    st.height = '2em';
    st.padding = 0;
    st.border = 'none';
    st.outline = 'none';
    st.boxShadow = 'none';
    st.background = 'transparent';
  
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  
  }