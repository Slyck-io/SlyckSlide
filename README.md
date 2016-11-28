# SlyckSlide

A lightweight/simple plain Vanilla JS slider 

## Installation

`bower install --save slyck-slide; bower install --save fontawesome`

## Usage

Please note. Font Awesome must be included in the project. 

* The only required div is the `slyckSlide` div. Please be sure to include it
#### Html
```
<html>



<head>
    <title>Responsive vanilla javascript slider</title>
    <link rel="stylesheet" href="../dist/slyckSlide.css">
</head>

<body>
    <div class="slyckSlide"></div>
    <script src="https://use.fontawesome.com/e57459b8e8.js"></script>
    <script type="text/javascript" src="../dist/slyckSlide.js"></script>
</body>

</html>
```

#### Basic

You may add this as an additional script tag after `slyckSlide.min.js` or in a seperate js file
```
<script type="text/javascript">
var images = [
    "http://placehold.it/1920x490?text=1",
    "http://placehold.it/1920x490?text=2",
    "http://placehold.it/1920x490?text=3",
    "http://placehold.it/1920x490?text=4"
]

document.addEventListener('DOMContentLoaded', function() {
    slyckSlider.init(images, {
        slideTime: 5000,
        waitTime: 10000
    });
}, false);
</script>
```
