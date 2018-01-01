var container = document.getElementById('container');
var box = document.getElementById('container-box');
var arr = box.getElementsByTagName('div');
var radius = calculateRadius(129,20);
var audio = document.getElementById('music');
//给每个div设置背景图      
for (var i = 0; i <arr.length; i++) {
	arr[i].style.background ='url("./img/p'+[i+1]+'.png") no-repeat';
	arr[i].style.WebkitTransform = "rotateY(" + 360 / arr.length * i + 'deg) translatez(' + radius + 'px)';
}

//计算圆半径
function calculateRadius(length, Num) {
	// return Math.round(length / (2 * Math.tan(Math.PI / Num)))-3;
	return Math.round(length / (2 * Math.tan(Math.PI / Num))) - 3;
}
//控制音乐播放和暂停
$('#music-controller').on('tap', function(e) {
	if (audio.paused) {
		audio.play();
		$('#music-controller').text('🎺');
	} else {
		audio.pause();
		$('#music-controller').text('⏸');
	}
})
//旋转
var startX = 0,
	x = 0,
	endX = 0;
var flag = true;
$('#container-box').on('touchstart', function(event) {
	event.preventDefault();

	var touch = event.targetTouches[0];
	startX = touch.pageX - x;
})
$('#container-box').on('touchmove', function(event) {
	if (flag) {
		event.preventDefault();
		var touch = event.targetTouches[0];
		endX = touch.pageX;
		x = endX - startX;
		box.style.transform = 'rotateY(' + x + 'deg)';
	} else {
		return false;
	}

})
$('#container-box').on('touchend', function(event) {
	console.log("over");
});


window.addEventListener('deviceorientation', function(event) {
	var gamma = event.gamma;
	if (Math.abs(gamma) > 1) {
		flag = false;
		box.style.transform = 'rotateY(' + gamma * 3 + 'deg)';
	} else {
		flag = true;
	}
})