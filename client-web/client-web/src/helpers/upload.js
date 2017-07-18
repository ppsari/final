import { storageRef } from '../config/constants';
import firebase from 'firebase';

export const upload = (idUploader, idFileButton,callback) => {

  let uploader = document.getElementById('uploader')
  let fileButton = document.getElementById('fileButton')
  // console.log(firebase)
  fileButton.addEventListener('change', function(e) {
    //Get file
    let file = e.target.files[0];
    //create a storage ref
    let storageRef = firebase.storage().ref('room360/'+file.name);
    //upload
    let task = storageRef.put(file);
    task.on(
      'state_changed',
      function progress(snapshot) {
        let percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        uploader.value = percentage;
        if(percentage >= 100) {
          callback(snapshot.downloadURL)
        }
      },
      function error(err) {
      },
      function complete() {
      },
  )
  })
}
