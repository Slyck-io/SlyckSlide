# SlyckSlide

A lightweight/simple plain Vanilla JS slider 

## Installation

`bower install --save slyck-slide; bower install --save fontawesome`

## Setup

Please note. Font Awesome must be included in the project. 

* The only required div is the `slyckSlide` div. Please be sure to include it
#### Html

```html
<html>

<head>
    <link rel="stylesheet" href="/path/to/slyckSlide.min.css">
</head>

<body>
    <div class="slyckSlide"></div>
    <script src="path/to/font/awesome"></script>
    <script type="text/javascript" src="/path/to/slyckSlide.min.js"></script>
</body>

</html>
```

#### Javascript

You may add this as an additional script tag after `slyckSlide.min.js` or in a seperate js file
```html
<script type="text/javascript">
//List of image srcs
var images = [
    "http://placehold.it/1920x490?text=1",
    "http://placehold.it/1920x490?text=2",
    "http://placehold.it/1920x490?text=3",
    "http://placehold.it/1920x490?text=4"
]

document.addEventListener('DOMContentLoaded', function() {
    slyckSlider.init(images, {
        slideTime: 5000, //Amount of time between auto image transitions
        waitTime: 10000 //How long to wait after a manual click to start autoLoop
    });
}, false);
</script>
```
