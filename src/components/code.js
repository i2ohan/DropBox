import io from "socket.io-client"; 

export const code =()=>{
    let recieverID;
    const socket = io();

    function generatedID(){
        return `${Math.trunc(Math.random()*999)}-${Math.trunc(Math.random()*999)}-${Math.trunc(Math.random()*999)}`;

    }
    document.querySelector("#sender-start-con-btn").addEventListener("click",function(){
        let joinID = generatedID();
        document.querySelector("#join-id").innerHTML = 
        `<b> ROOM ID</b>
        <span>${joinID}</span>`;

        socket.emit("sender-join",{
            uid : joinID
        });
    });

    socket.on("init",function(uid)
    {
        recieverID = uid;
        document.querySelector(".join-screen").classList.remove("active");
        document.querySelector(".fs-screen").classList.add("active");

    });
    document.querySelector("#file-input").addEventListener("change",function(e){
        let file = e.target.files[0];
        if(!file){
            return;
        }
        let reader = new FileReader();
        reader.onload = function(e){
            let buffer = new Uint8Array(reader.result);
            let e1 = document.createElement("div");
            e1.classList.add("item");
            e1.innerHTML = `
            <div class= "progress">0%</div>
            <div class= "filename">${file.name}</div>
            `;
            document.querySelector(".files-list").appendChild(e1);
            shareFile({
                filename : file.name,
                total_buffer_size : buffer.length,
                buffer_size:1024},buffer,e1.querySelector(".progress"));
        }
        reader.readAsArrayBuffer(file);

        localStorage.setItem("file-t", file);
        console.log(localStorage.getItem("file-t"));
    });
    function shareFile(metadata,buffer,progress_node){
        socket.emit("file-meta",{
            uid: recieverID,
            metadata:metadata
        });
        socket.on("fs-share",function(){
            let chunk= buffer.slice(0,metadata.buffer_size);
            buffer = buffer.slice(metadata.buffer_size,buffer.length);

            progress_node.innerText = Math.trunc((metadata.total_buffer_size - buffer.length) / metadata.total_buffer_size * 100) + "%";
            if(chunk.length !== 0){
                socket.emit("file-raw",{
                    uid: recieverID,
                    buffer:chunk
                });


            }
            localStorage.setItem("file-view", buffer);
            console.log(localStorage.getItem("file-view"));

        });
    }

}