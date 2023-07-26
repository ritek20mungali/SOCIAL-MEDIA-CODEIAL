// {       //meathod to subimt to form data for new post using ajax
//     let createComment =function(){
//         let newCommentForm =$('#new-comment-form');

//         newCommentForm.submit(function(e){
//             e.preventDefault();

//             $.ajax({
//                 method:"POST",
//                 url:"/comments/create",
//                 data :newCommentForm.serialize(),
//                 success:function(data){ 
//                         // console.log(data.comment);
//                         let newComment =newCommentDom(data.comment);
//                         $('#post-comments-list>ul').prepend(newComment);
//                        // deletePost($(' .delete-post-button',newComment))
//                 },
//                 error:function(err){
//                     console.log(err.responseText);
//                 }
//             });
//         });
//     }

//     //meathod to create a post in DOM

//     let newCommentDom =function(comment){
//         return $(`
        
//             <li>
//         <p>
    
            
          
    
//             <small>
//               <a href="/comments/destroy/${comment._id } "> XX </a>
//             </small>
    
            
    
//                                 ${comment.comment }
//                                 <small>
//                                   ${comment.user.name}
//                                  </small>
    
//                                </p>
//       </li>`
      
      
//       )
//     }




//     //meathhod to del a post form DOM 

//     // let deletePost =function(deleteLink){
//     //     $(deleteLink).click(function(e){
//     //       e.preventDefault();

//     //       $.ajax({
//     //         method:"GET",
//     //         url:$(deleteLink).prop('href'),
//     //         success:function(data){
//     //            $(`#post-${data.data.post_id}`).remove();

//     //         },error :function(err){
//     //      console.log(err.responseText);
//     //         }
//     //       })
//     //     })
//     // }









//     createComment();
// }