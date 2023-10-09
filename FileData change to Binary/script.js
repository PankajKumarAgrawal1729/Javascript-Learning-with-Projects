// var fileByteArray = [];
// document.getElementById("myBtn").addEventListener("click", async () => {
//     document.getElementById('file').innerText = new Uint8Array(await uploadFile3());
// })


// function uploadFile1(){
//   var files = myInput.files[0];
//   var reader = new FileReader();
//   reader.onload = processFile(files);
//   reader.readAsText(files); 
// }

// function uploadFile2(){
//   var files = document.querySelector('input').files[0];
//   var reader = new FileReader();
//   reader.onload = processFile(files);
//   reader.readAsDataURL(files); 
// }

// function uploadFile3(){
//   var files = myInput.files[0];
//   var reader = new FileReader();
//   reader.onload = processFile(files);
//   reader.readAsArrayBuffer(files); 
// }


// function processFile(theFile){
//   return function(e) { 
//     var theBytes = e.target.result; //.split('base64,')[1]; // use with uploadFile2
//     fileByteArray.push(theBytes);
//     console.log(fileByteArray);
//     document.getElementById('file').innerText = '';
//     for (var i=0; i<fileByteArray.length; i++) {
//         document.getElementById('file').innerText += fileByteArray[i];
//         // document.getElementById('my_iframe').innerHTML += fileByteArray[i];
//     }
//     // Download(fileByteArray[0]);
//   }
// }

// function Download(url) {
//     document.getElementById('my_iframe').src = url;
// }


const fileInput = document.getElementById('fileInput');

function convertAndDownloadFileBytes() {
  const file = fileInput.files[0];
  if (!file) {
    alert("Please select a file!");
    return;
  }

  const reader = new FileReader();

  reader.onloadend = function() {
    // The file data is an ArrayBuffer. Create a new Uint8Array view on the buffer
    const arrayBuffer = reader.result;
    const byteArray = new Uint8Array(arrayBuffer);

    // Create a blob from the byte array
    const  binaryString = String.fromCharCode.apply(null, byteArray);
    const blob = new Blob([binaryString], {type: "application/octet-stream"});
    console.log(binaryString);
    console.log(arrayBuffer);

    // Create a link element, hide it, direct it towards the blob, and then 'click' it programatically
    let a = document.createElement("a");
    
    a.style = "display: none";
    document.body.appendChild(a);

    // Create a blob URL and point the link element towards it
    let url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = `${file.name}.bytes`;
    a.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    fileInput.value = "";
};

reader.readAsArrayBuffer(file);
}
