window.onload = function() {
    try {
      TagCanvas.Start('skillsCanvas', 'iconSkills', {
        textColour: null, // No text color since we are using icons
        outlineColour: '#000000', // Black outline to highlight the icons
        reverse: true, // Make the cloud rotate in reverse direction
        depth: 0.8, // Controls how "deep" the cloud looks
        maxSpeed: 0.05, // Speed of the cloud rotation
        wheelZoom: false, // Disable zoom with mouse wheel
        imageMode: 'both', // Enables image support
        fadeIn: 1000, // Fade-in effect for smooth transition
        shuffleTags: true, // Randomize icon positions for a dynamic look
        initial: [0.1, -0.1], // Controls the initial spin of the cloud
        stretchX: 1.0, // Stretch horizontally
        stretchY: 1.0 // Stretch vertically
      });
    } catch(e) {
      console.log('Canvas error: ', e);
    }
  };
  