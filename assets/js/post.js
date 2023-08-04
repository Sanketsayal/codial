
let Btn=document.getElementsByClassName('comment-btn');
for(i of Btn){
    i.addEventListener('click',function(){
        let postId=this.getAttribute("value")
        let commentBox=document.getElementById(`comment-${postId}`)
        commentBox.classList.toggle('height')
    })
}


