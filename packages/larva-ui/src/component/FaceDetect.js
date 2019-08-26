const {
    cv,
    getDataFilePath,
    drawBlueRect
} = require('./Utils');


import React from 'react';
export default class FaceDetect extends React.Component {
    componentDidMount() {
            const image = cv.imread('./image/got.jpg');
            // const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
            //
            // // detect faces
            // const { objects, numDetections } = classifier.detectMultiScale(image.bgrToGray());
            // console.log('faceRects:', objects);
            // console.log('confidences:', numDetections);
            //
            // if (!objects.length) {
            //     throw new Error('No faces detected!');
            // }
            //
            // // draw detection
            // const numDetectionsTh = 10;
            // objects.forEach((rect, i) => {
            //     const thickness = numDetections[i] < numDetectionsTh ? 1 : 2;
            //     drawBlueRect(image, rect, { thickness });
            // });
            //
            // cv.imshowWait('face detection', image);
    }
    render() {
        return (
            <div>
                <canvas ref="canvas" width={300} height={300}></canvas>
            </div>
        )
    }
}
