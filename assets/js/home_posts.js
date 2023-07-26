{       //meathod to subimt to form data for new post using ajax
    let createPost =function(){
        let newPostForm =$('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                method:"POST",
                url:"/posts/create",
                data :newPostForm.serialize(),
                success:function(data){ 
                        // console.log(data);
                        let newPost =newPostDom(data.data.post);
                        $('#posts-list-container>ul').prepend(newPost);
                        deletePost($(' .delete-post-button',newPost))
                },
                error:function(err){
                    console.log(err.responseText);
                }
            });
        });
    }

    //meathod to create a post in DOM

    let newPostDom =function(post){
        return $(`<li id="post-${ post._id}">
        <p>
    
          
    
          <small>
            <a class="delete-post-button" href="/posts/destroy/${ post._id}"> XX </a>
          </small>
    
          
    
          ${ post.content}
          <br>
          <small>
            ${post.user.name}
          </small>
        </p>
    
        <div class="post-comments">
       
               <form action="/comments/create" method="POST">
                <input type="text" name="content" placeholder="Type here to add comments...">
                <input type="hidden" name="post" value="${post._id} ">
                <input type="submit" value="Add Comment">
               </form>
            
            <div class="post-comments-list">
              <ul id="post-comments-${post._id}">
    
              </ul>
            </div>
        </div>
        
      </li>`)
    }




    //meathhod to del a post form DOM 

    let deletePost =function(deleteLink){
        $(deleteLink).click(function(e){
          e.preventDefault();

          $.ajax({
            method:"GET",
            url:$(deleteLink).prop('href'),
            success:function(data){
               $(`#post-${data.data.post_id}`).remove();

            },error :function(err){
         console.log(err.responseText);
            }
          })
        })
    }









    createPost();
}