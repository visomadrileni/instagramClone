 import React,{Fragment} from 'react';
 import DeleteConversation from './delete-conversation';
 import UnsendMessages from './unsend-messages';
 import ImageMessage from './image-message';
 import StickerMessage from './sticker-message';
 import ConversationShowMore from './show-more'
 import {func} from 'prop-types';

 const ConversationOptions = ({hideConversation,toggleOptions}) => {
     return (
         <Fragment>
             <ul>
                 <DeleteConversation  toggleOptions={toggleOptions} hideConversation={hideConversation} />
                 <UnsendMessages toggleOptions={toggleOptions} />
                 <ImageMessage   toggleOptions={toggleOptions} />
                 <StickerMessage toggleOptions={toggleOptions} />
                 <ConversationShowMore toggleOptions={toggleOptions} />
             </ul>
         </Fragment>
     )
 }

 ConversationOptions.propTypes = {
     hideConversation: func.isRequired,
     toggleOptions: func.isRequired
 }

 export default ConversationOptions;