let videoOne: HTMLVideoElement | null = null;
let videoTwo: HTMLVideoElement | null = null;

let videoCanvasCtx: CanvasRenderingContext2D | null = null;
let canvas: HTMLCanvasElement | null = null;

let logo: HTMLImageElement | null = null;

export async function setupLogoCompositor() {

    const mediaStream = await navigator.mediaDevices.getUserMedia({video: true});

    videoOne = document.querySelector("#videoOne");
    videoTwo = document.querySelector("#videoTwo");

    if (!videoOne || !videoTwo) {
        throw new Error("Video tags missing");
    }

    videoOne.autoplay = true;
    videoOne.srcObject = mediaStream;

    videoTwo.autoplay = true;

    logo = document.createElement('img');
    logo.src = 'logo.svg';

    videoOne.addEventListener("canplay", () => {
        videoOne!.requestVideoFrameCallback(() => render());

        canvas = document.createElement('canvas');
        canvas.width = videoOne!.videoWidth;
        canvas.height = videoOne!.videoHeight;
        videoCanvasCtx = canvas.getContext('2d');

        videoTwo!.srcObject = canvas.captureStream(20); // MediaStream
    }, {once: true});


}

function render() {
    if (!videoOne || !videoTwo) {
        throw new Error("Video tags missing");
    }

    if (!canvas || !videoCanvasCtx) {
        throw new Error("Canvas is missing");
    }

    videoCanvasCtx.drawImage(videoOne, 0, 0,
        canvas.width, canvas.height);


    if (logo && logo.naturalWidth) {
        videoCanvasCtx.globalAlpha = 0.5;

        videoCanvasCtx.drawImage(logo,
            canvas.width - logo.naturalWidth - 10,
            10,
            logo.naturalWidth,
            logo.naturalHeight
        );

        videoCanvasCtx.globalAlpha = 1;
    }

    videoOne.requestVideoFrameCallback(() => render());
}

