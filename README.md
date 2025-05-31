# Материалы к докладу "Обработка видео на фронте"

## Обзор средств

Абстракция над медиаданными:

[MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream) (контейнер) и [MediaStreamTrack](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack)

Откуда взять
- Захват вебкамеры или экрана: [getUserMedia()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) / [getDisplayMedia()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia)
- Захват с canvas.[captureStream()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/captureStream)
- [Получить по WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/RTCRtpReceiver/track)

Что с ними можно делать
- Отобразить в \<video\> через [srcObject](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject) (и скопировать кадр на Canvas2D через [drawImage](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage))
- Записать через [MediaRecorder](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder) или [ImageCapture](https://developer.mozilla.org/en-US/docs/Web/API/ImageCapture)
- [Передать по WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/addTrack)

### Цикл обработки кадров видео

[requestVideoFrameCallback](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement/requestVideoFrameCallback) - вызывается, когда на отображение поступает новый кадр видео

Если требуется работа в фоне, то лучше использовать setTimeout в WebWorker

## Средства для отрисовки в WebWorker

- [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas) - доступ к рисованию вне основного потока
- [Canvas.transferControlToOffscreen](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/transferControlToOffscreen) - прокси canvas, рисуем в WebWorker, отображаем в основном потоке

### Передаваемые между потоками объекты

- [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) - произвольный бинарный буфер, можно читать и писать, обернув в [TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)
- [ImageBitmap](https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap) - несжатое растровое изображение
- [VideoFrame](https://developer.mozilla.org/en-US/docs/Web/API/VideoFrame) - ссылка на кадр во внутренностях браузера

## Инференс

[ONNX Runtime Web](https://onnxruntime.ai/docs/tutorials/web/) - фреймворк для запуска нейронных сетей в браузере

## Дополнительно

Перспективные API с нюансами реализации и не имеющие широкой браузерной поддержки

- [ElementCapture](https://developer.chrome.com/docs/web-platform/element-capture) - Захват видеопотока с любого DOM элемента (работает поверх getDisplayMedia)
  - [BrowserCaptureMediaStreamTrack: restrictTo()](https://developer.mozilla.org/en-US/docs/Web/API/BrowserCaptureMediaStreamTrack/restrictTo) - сузить захват до конкретного DOM элемента
- [InsertableStreamsForMST](https://developer.chrome.com/docs/capabilities/web-apis/mediastreamtrack-insertable-media-processing) - позволяет работать с медиа треками как с [ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) и [WritableStream](https://developer.mozilla.org/en-US/docs/Web/API/WritableStream)
  - [MediaStreamTrackProcessor](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrackProcessor) - получаем стрим VideoFrame'ов из MediaStreamTrack
  - [MediaStreamTrackGenerator](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrackGenerator) или [VideoTrackGenerator](https://developer.mozilla.org/en-US/docs/Web/API/VideoTrackGenerator) - получаем MediaStreamTrack, записывая VideoFrame'ы в стрим
- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer) - разделяемая между потоками область памяти


### Статьи

- [Описание InsertableStreams на chrome4developers](https://developer.chrome.com/docs/capabilities/web-apis/mediastreamtrack-insertable-media-processing)
- [Про обработку кадров видео на WebRTCHacks](https://webrtchacks.com/video-frame-processing-on-the-web-webassembly-webgpu-webgl-webcodecs-webnn-and-webtransport/)

## Демки

### [Демо с наложением логотипа на видео](https://apocalyp0sys.github.io/video-processing-talk-materials/)
Код можно посмотреть в папке [logo](./logo)

### [Volcomix](https://github.com/Volcomix/virtual-background)
Открытое решение задачи виртуального фона. В [демо](https://volcomix.github.io/virtual-background/) можно выбирать разные модели сегментации и способы композиции кадра по маске. 

### TransferControlToOffscreen

- [Описание и пример на web.dev](https://web.dev/articles/offscreen-canvas)
- [Пример с использованием WebGPU](https://webgpu.github.io/webgpu-samples/?sample=worker), рендер в воркере, отображение в основном потоке


## Слайды
[доступны в этом же репозиотрии](./slides_github.pdf)
