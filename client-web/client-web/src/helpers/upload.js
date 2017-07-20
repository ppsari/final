import firebase from 'firebase';

export const upload = (idUploader, idFileButton,callback) => {
  let fileButton = document.getElementById('fileButton')
  // console.log(firebase)
  fileButton.addEventListener('change', function(e) {
    //Get file
    let file = e.target.files[0];
    if (typeof file.name !== 'undefined') {

      //create a storage ref
      let storageRef = firebase.storage().ref('room360/'+file.name);
      //upload
      let task = storageRef.put(file);
      task.on(
        'state_changed',
        function progress(snapshot) {

        },
        function error(err) {
        },
        function () {
          callback(task.snapshot.downloadURL)
        }
      )
    }
  })
}
