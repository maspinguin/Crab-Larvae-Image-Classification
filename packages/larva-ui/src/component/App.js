import React from 'react';

const cv = require('opencv4nodejs');
const path = require('path');

export default class App  extends React.Component{

    renderImage(img) {
        const { canvas } = this
        const matRGBA = img.channels === 1
            ? img.cvtColor(cv.COLOR_GRAY2RGBA)
            : img.cvtColor(cv.COLOR_BGR2RGBA)

        canvas.height = img.rows
        canvas.width = img.cols
        const imgData = new ImageData(
            new Uint8ClampedArray(matRGBA.getData()),
            img.cols,
            img.rows
        );
        const ctx = canvas.getContext('2d')
        ctx.putImageData(imgData, 0, 0)
    }

    componentDidMount() {
        console.log(window.location)
        try {
            const mat = cv.imread('./got.jpg');
        } catch (e) {
            console.log(e);
        }


    }

    render() {
        return(
            <div style={{position: 'fixed', left: '50%'}}>
                Hello app
                <canvas id={'inputImage'}></canvas>
            </div>
        )
    }
}
