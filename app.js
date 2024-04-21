// Get DOM elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('captureButton');
const saveButton = document.getElementById('saveButton');

// Access the camera and stream the video
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(error => {
    console.error('Error accessing the camera: ', error);
  });

// Capture photo when the capture button is clicked
captureButton.addEventListener('click', () => {
  const context = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Show the canvas and save button
  canvas.style.display = 'block';
  saveButton.style.display = 'block';
});

// Save the photo as PDF when the save button is clicked
saveButton.addEventListener('click', () => {
  const imgData = canvas.toDataURL('image/png');
  // Create a new PDF document
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });

  const imgWidth = pdf.internal.pageSize.getWidth();
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  pdf.addImage(imgData, 'PNG', 180, 20, 90, 60);
  pdf.table(1, 1, generateData(15), headers, { autoSize: true });
  pdf.save('photo.pdf');
});

var generateData = function(amount) {
    var result = [];
    var data = {
      coin: "100",
      game_group: "GameGroup",
      game_name: "XPTO2",
      game_version: "25",
      machine: "20485861",
      vlt: "0"
    };
    for (var i = 0; i < amount; i += 1) {
      data.id = (i + 1).toString();
      result.push(Object.assign({}, data));
    }
    return result;
  };
  
  function createHeaders(keys) {
    var result = [];
    for (var i = 0; i < keys.length; i += 1) {
      result.push({
        id: keys[i],
        name: keys[i],
        prompt: keys[i],
        width: 65,
        align: "center",
        padding: 0
      });
    }
    return result;
  }
  
  var headers = createHeaders([
    "id",
    "coin",
    "game_group",
    "game_name",
    "game_version",
    "machine",
    "vlt"
  ]);

  