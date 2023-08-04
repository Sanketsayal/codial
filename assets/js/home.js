// {

//     let successFlash = function(message){
//         new Noty({
//             theme : 'relax' , 
//             text: message,
//             type: 'success',
//             layout : "topRight",
//             timeout : 1500
            
//             }).show();
//     }

//     let errorFlash = function(message){
//         new Noty({
//             theme : 'relax' , 
//             text: message,
//             type: 'error',
//             layout : "topRight",
//             timeout : 1500
            
//             }).show();
//     }
//     //method to submit the data for new post usig ajax   
//     let createPost=function(){
//         let newPost=$('#new-post-form');
//         newPost.submit(function(e){
//             e.preventDefault();
//             $.ajax({
//                 type:'post',
//                 url:'/posts/create',
//                 data: newPost.serialize(),
//                 success: function(data){
//                     let newPost=postList(data.data.post , data.data.userName);
//                     $('#post-list-container>ul').prepend(newPost);
//                     deletePost($(' .delete-post-button',newPost));
//                     successFlash('Post Created!!')
//                 },
//                 error: function(err){
//                     console.log(err.responseText);
//                     errorFlash(err.responseText);
//                 }
//             })
            
//         }); 
//     }

//     let postList=function(post,userName){
//         return $(`<li id="post-${ post.id }" class="post-container">
//         <div class="post-details">
//             <img src="${post.user.avatar}" alt="">
//             <p> ${userName} </p>
//             <% if(locals.user && (locals.user.id==post.user.id)){ %>
//                 <small>
//                     <a class="delete-post-button" href="/posts/destroy/<%= post.id %>">X</a>
//                 </small>
//             <% } %>
//         </div>
    
//         <p class="content">${post.content}</p>
//         <div class="post-actions">
//             <% if(locals.user){ %>
//                 <a class="toggle-like-button" data-likes="<%= post.likes.length %>" href="/likes/toggle/?id=<%= post._id %>&&type=Post">
//                     <div class="actions">
//                         <i class="fa-regular fa-thumbs-up"></i> &ensp; <%= post.likes.length  %> 
//                     </div>
//                 </a>
                     
//             <% }else{ %>
//                 ${post.likes.length} Likes
//             <% } %>  
            
//             <div class="actions comment-btn"  value="<%= post.id %>">
//                 Comments
//             </div>
    
//             <div class="actions">
//                 Share
//             </div>
//         </div>
        
       
//     </li>
//                  `)
//     }

//     let deletePost=function(deleteLink){
//         $(deleteLink).click(function(e){
//             e.preventDefault();

//             $.ajax({
//                 type:'get',
//                 url:$(deleteLink).prop('href'),
//                 success:function(data){
//                     $(`#post-${data.data.post_id}`).remove();
//                     successFlash('Post Deleted!!')
//                 },
//                 error:function(error){
//                     console.log(error.responseText);
//                 }
//             })
//         })
//     }

//     let delete2=function(deleteLink){
//         $.ajax({
//             type:'get',
//             url:$(deleteLink).prop('href'),
//             success:function(data){
//                 $(`#post-${data.data.post_id}`).remove();

//             },
//             error:function(error){
//                 console.log(error.responseText);
//             }
//         })
//     }

//     let postDeleteBtn=document.getElementsByClassName('delete-post-button');
//     for(let i=0;i<postDeleteBtn;i++){
//         postDeleteBtn[i].addEventListener('click',function(e){
//             e.preventDefault();
//             delete2(postDeleteBtn[i]);
//         })
//     }

//     let createComment=function(){
//         let newComment=$('#comments-form');
//         newComment.submit(function(e){
//             e.preventDefault();
//             $.ajax({
//                 type:'post',
//                 url:'/comments/create',
//                 data: newComment.serialize(),
//                 success: function(data){
//                     console.log(data)
//                     let newcom=commentList(data.data.comment , data.data.User , data.data.post);
//                     $('#comments-list>ul').prepend(newcom);
//                     deleteComment($(' .comment-delete-btn',newcom));
//                     successFlash('Comment Created!!')
//                 },
//                 error: function(err){
//                     console.log(err.responseText);
//                     errorFlash(err.responseText);
//                 }
//             })
            
//         }); 
//     }

//     let commentList=function(comment,user,post){
//         return $(`<li>
//                     <p>
//                         <small>
//                             <a href="/comments/destroy/${ comment._id }">X</a>
//                         </small>
//                         ${ comment.content }
//                         <br>
//                         <small>
//                             ${user}
//                         </small>
//                     </p>
//                 </li>`)
//     }

//     let deleteComment=function(Link){
//         $(Link).click(function(e){
//             e.preventDefault();

//             $.ajax({
//                 type:'get',
//                 url:$(Link).prop('href'),
//                 success:function(data){
//                     $(`#comment-${data.data.comment_id}`).remove();
//                     successFlash('Comment Deleted!!')
//                 },

//                 error:function(error){
//                     console.log(error.responseText);
//                 }
//             })
//         })
//     }
  
//     createPost();
//     createComment();

// }
