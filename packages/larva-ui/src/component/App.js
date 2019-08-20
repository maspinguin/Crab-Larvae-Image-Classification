import React from 'react';

const cv = require('opencv4nodejs');
const path = require('path');
import image from '../../../larva-electron/image/got.jpg';

import logo from '../../image/logo_v.png';
import image2 from '../../image/got.bmp';
export default class App  extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            imgMat: null
        }
    }

    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.fillRect(0,0,100,100);
    }

    renderImage(img) {
        const { canvas } = this.refs.canvas.getContext('2d');
        const matRGBA = img.channels === 1
            ? img.cvtColor(cv.COLOR_GRAY2RGBA)
            : img.cvtColor(cv.COLOR_BGR2RGBA);

        canvas.height = img.rows;
        canvas.width = img.cols;
        const imgData = new ImageData(
            new Uint8ClampedArray(matRGBA.getData()),
            img.cols,
            img.rows
        );
        const ctx = canvas.getContext('2d');
        ctx.putImageData(imgData, 0, 0)
    }

    componentDidMount() {
        this.updateCanvas();
        cv.imreadAsync('./image/got.jpg').then((mat) => {
            if(mat) {
                mat = mat.resizeToMax(150);
                this.renderImage(mat);
                console.log('we have got a mat');
            }
        }).catch((err) => {
            console.log('error', err);
        })
    }

    render() {
        return(
            <div style={{position: 'fixed', left: '50%'}}>
                Hello app
                <img src={image2}/>
                <br/>
                123
                <br/>
                <canvas ref="canvas" width={300} height={300}></canvas>
                {/*<canvas id={image2}></canvas>*/}
            </div>
        )
    }
}
